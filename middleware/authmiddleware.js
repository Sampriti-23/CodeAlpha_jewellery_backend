const jwt = require("jsonwebtoken");

// 🔐 Protect routes
exports.protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 👇 match your model (isAdmin instead of role)
            req.user = {
                id: decoded.id,
                isAdmin: decoded.isAdmin || false
            };

            return next();

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token invalid or expired"
            });
        }
    }

    return res.status(401).json({
        success: false,
        message: "No token, authorization denied"
    });
};



// 🛑 Admin only
exports.adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    // 👇 use isAdmin
    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Admin access only"
        });
    }

    next();
};