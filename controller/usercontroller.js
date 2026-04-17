const User = require('../model/User');
// Create a new user
exports.createuser = async(req,res)=>{
    try{
        const user = await User.create(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all users
exports.getalluser = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get a user by ID 
exports.getuserbyid = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

// Update a user by ID
exports.updateuser = async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

// Delete a user by ID
exports.deleteuser = async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

