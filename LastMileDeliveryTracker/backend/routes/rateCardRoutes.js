const express = require("express");

const router = express.Router();

const {
    createRateCard,
    getRateCards
} = require("../controllers/rateCardController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    authorize("admin"),
    createRateCard
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getRateCards
);

module.exports = router;