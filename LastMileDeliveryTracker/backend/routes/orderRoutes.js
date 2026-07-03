const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    trackOrder,
    updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create Order
router.post(
    "/",
    protect,
    authorize("admin"),
    createOrder
);

// Get All Orders
router.get(
    "/",
    protect,
    authorize("admin"),
    getOrders
);

// Track Order
router.get(
    "/track/:trackingId",
    trackOrder
);
// Get Single Order
router.get(
    "/:id",
    protect,
    authorize("admin"),
    getOrderById
);
// Update Order Status
router.put(
    "/:id/status",
    protect,
    authorize("admin"),
    updateOrderStatus
);

module.exports = router;