const Zone = require("../models/Zone");

// ==========================
// Create Zone
// ==========================
const createZone = async (req, res) => {

    try {

        const { zoneName } = req.body;

        if (!zoneName) {
            return res.status(400).json({
                success: false,
                message: "Zone name is required."
            });
        }

        // Check duplicate
        const existingZone = await Zone.findOne({ zoneName });

        if (existingZone) {
            return res.status(400).json({
                success: false,
                message: "Zone already exists."
            });
        }

        const zone = await Zone.create({
            zoneName
        });

        res.status(201).json({
            success: true,
            message: "Zone Created Successfully",
            zone
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Get All Zones
// ==========================
const getZones = async (req, res) => {

    try {

        const zones = await Zone.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: zones.length,
            zones
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
// ==========================
// Update Zone
// ==========================
const updateZone = async (req, res) => {

    try {

        const { id } = req.params;
        const { zoneName } = req.body;

        const zone = await Zone.findById(id);

        if (!zone) {
            return res.status(404).json({
                success: false,
                message: "Zone not found."
            });
        }

        zone.zoneName = zoneName || zone.zoneName;

        await zone.save();

        res.status(200).json({
            success: true,
            message: "Zone Updated Successfully",
            zone
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Delete Zone
// ==========================
const deleteZone = async (req, res) => {

    try {

        const { id } = req.params;

        const zone = await Zone.findById(id);

        if (!zone) {

            return res.status(404).json({
                success: false,
                message: "Zone not found."
            });

        }

        await Zone.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Zone Deleted Successfully"
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
    createZone,
    getZones,
    updateZone,
    deleteZone
};