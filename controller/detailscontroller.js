const Details = require('../model/Details');

// CREATE details (with user from token)
exports.createdetails = async (req, res) => {
    try {
        const details = await Details.create({
            ...req.body,
            user: req.user.id   // 👈 attach logged-in user
        });

        res.status(201).json({
            success: true,
            data: details
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET all details (only logged-in user's data)
exports.getalldetails = async (req, res) => {
    try {
        const details = await Details.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: details.length,
            data: details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET single details (with ownership check)
exports.getdetailsbyid = async (req, res) => {
    try {
        const details = await Details.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!details) {
            return res.status(404).json({
                success: false,
                message: "Details not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            data: details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE details (secure)
exports.updatedetails = async (req, res) => {
    try {
        const details = await Details.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!details) {
            return res.status(404).json({
                success: false,
                message: "Details not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            data: details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE details (secure)
exports.deletedetails = async (req, res) => {
    try {
        const details = await Details.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!details) {
            return res.status(404).json({
                success: false,
                message: "Details not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Details deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAdminAllDetails = async (req, res) => {
    try {
        const details = await Details.find(); // Fetches EVERY detail in the database
        res.status(200).json({ success: true, data: details });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};