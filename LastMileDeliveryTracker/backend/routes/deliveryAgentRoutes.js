const express = require("express");

const router = express.Router();

const {
    createAgent,
    getAgents
} = require("../controllers/deliveryAgentController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    authorize("admin"),
    createAgent
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getAgents
);

module.exports = router;