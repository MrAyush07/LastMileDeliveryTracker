const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Authentication Route Working"
    });
});
router.get("/profile", protect, (req, res) => {

    res.status(200).json({

        success: true,

        message: "Protected Route Accessed",

        user: req.user

    });

});
// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;