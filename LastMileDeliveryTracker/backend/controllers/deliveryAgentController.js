const DeliveryAgent = require("../models/DeliveryAgent");
const Zone = require("../models/Zone");

// Create Delivery Agent
const createAgent = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            vehicleType,
            assignedZone
        } = req.body;

        const zone = await Zone.findById(assignedZone);

        if (!zone) {
            return res.status(404).json({
                success: false,
                message: "Zone not found."
            });
        }

        const agent = await DeliveryAgent.create({

            name,
            email,
            phone,
            vehicleType,
            assignedZone

        });

        res.status(201).json({

            success: true,

            message: "Delivery Agent Created",

            agent

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// Get All Agents
const getAgents = async (req, res) => {

    try {

        const agents = await DeliveryAgent.find().populate("assignedZone");

        res.status(200).json({

            success: true,

            count: agents.length,

            agents

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

    createAgent,

    getAgents

};