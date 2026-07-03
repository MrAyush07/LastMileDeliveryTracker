const express = require("express");

const router = express.Router();

const {
    createArea,
    getAreas
} = require("../controllers/areaController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    authorize("admin"),
    createArea
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getAreas
);

module.exports = router;