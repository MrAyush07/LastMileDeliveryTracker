const Area = require("../models/Area");
const Zone = require("../models/Zone");

// Create Area
const createArea = async (req, res) => {

    try {

        const { areaName, zone } = req.body;

        if (!areaName || !zone) {

            return res.status(400).json({
                success: false,
                message: "Area name and Zone are required."
            });

        }

        const zoneExists = await Zone.findById(zone);

        if (!zoneExists) {

            return res.status(404).json({
                success: false,
                message: "Zone not found."
            });

        }

        const area = await Area.create({
            areaName,
            zone
        });

        res.status(201).json({
            success: true,
            message: "Area Created Successfully",
            area
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Areas
const getAreas = async (req, res) => {

    try {

        const areas = await Area.find().populate("zone");

        res.status(200).json({

            success: true,

            count: areas.length,

            areas

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
    createArea,
    getAreas
};