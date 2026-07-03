const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    let token;

    // Check Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // Get Token
            token = req.headers.authorization.split(" ")[1];

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get User Details (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {

            console.error(error);

            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });

        }

    }

    if (!token) {

        return res.status(401).json({
            success: false,
            message: "No Token Provided"
        });

    }

};

module.exports = { protect };