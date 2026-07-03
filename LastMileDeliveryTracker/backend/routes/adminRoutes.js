const express = require("express");

const router = express.Router();
const {
    createZone,
    getZones,
    updateZone,
    deleteZone
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create Zone
router.post(
    "/zone",
    protect,
    authorize("admin"),
    createZone
);

// Get All Zones
router.get(
    "/zones",
    protect,
    authorize("admin"),
    getZones
);
// Update Zone
router.put(
    "/zone/:id",
    protect,
    authorize("admin"),
    updateZone
);

// Delete Zone
router.delete(
    "/zone/:id",
    protect,
    authorize("admin"),
    deleteZone
);

module.exports = router;