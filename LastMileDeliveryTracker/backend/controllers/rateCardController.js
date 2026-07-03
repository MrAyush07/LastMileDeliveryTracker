const RateCard = require("../models/RateCard");
const Zone = require("../models/Zone");

// Create Rate Card
const createRateCard = async (req, res) => {

    try {

        const {
            zone,
            serviceType,
            minWeight,
            maxWeight,
            price,
            codCharge
        } = req.body;

        const zoneExists = await Zone.findById(zone);

        if (!zoneExists) {

            return res.status(404).json({
                success: false,
                message: "Zone not found."
            });

        }

        const rateCard = await RateCard.create({

            zone,

            serviceType,

            minWeight,

            maxWeight,

            price,

            codCharge

        });

        res.status(201).json({

            success: true,

            message: "Rate Card Created Successfully",

            rateCard

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// Get All Rate Cards
const getRateCards = async (req, res) => {

    try {

        const rateCards = await RateCard.find().populate("zone");

        res.status(200).json({

            success: true,

            count: rateCards.length,

            rateCards

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    createRateCard,

    getRateCards

};