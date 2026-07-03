const Order = require("../models/Order");
const Area = require("../models/Area");
const RateCard = require("../models/RateCard");
const DeliveryAgent = require("../models/DeliveryAgent");

const generateTrackingId = require("../utils/generateTrackingId");

// ==========================================
// Create Order
// ==========================================
const createOrder = async (req, res) => {

    try {

        const {

            customerName,
            customerPhone,
            pickupArea,
            deliveryArea,
            weight,
            serviceType,
            paymentType

        } = req.body;

        // Validate Required Fields
        if (
            !customerName ||
            !customerPhone ||
            !pickupArea ||
            !deliveryArea ||
            !weight
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        // Check Pickup Area
        const pickup = await Area.findById(pickupArea).populate("zone");

        if (!pickup) {

            return res.status(404).json({

                success: false,

                message: "Pickup Area not found."

            });

        }

        // Check Delivery Area
        const delivery = await Area.findById(deliveryArea).populate("zone");

        if (!delivery) {

            return res.status(404).json({

                success: false,

                message: "Delivery Area not found."

            });

        }

        // Find Matching Rate Card
        const rateCard = await RateCard.findOne({

            zone: pickup.zone._id,

            serviceType,

            minWeight: { $lte: weight },

            maxWeight: { $gte: weight }

        });

        if (!rateCard) {

            return res.status(404).json({

                success: false,

                message: "No Rate Card Found."

            });

        }

        // Calculate Delivery Charge
        let deliveryCharge = rateCard.price;

        if (paymentType === "COD") {

            deliveryCharge += rateCard.codCharge;

        }

        // Find Available Delivery Agent
        const agent = await DeliveryAgent.findOne({

            assignedZone: pickup.zone._id,

            isAvailable: true

        });

        if (!agent) {

            return res.status(404).json({

                success: false,

                message: "No Delivery Agent Available."

            });

        }

        // Make Agent Busy
        agent.isAvailable = false;

        await agent.save();

        // Generate Tracking ID
        const trackingId = generateTrackingId();

        // Create Order
        const order = await Order.create({

            customerName,

            customerPhone,

            pickupArea,

            deliveryArea,

            weight,

            serviceType,

            paymentType,

            deliveryCharge,

            trackingId,

            assignedAgent: agent._id,

            status: "Assigned",

            timeline: [
                {
                    status: "Assigned"
                }
            ]

        });

        res.status(201).json({

            success: true,

            message: "Order Created Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};
// ==========================================
// Get All Orders
// ==========================================
const getOrders = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("pickupArea")

            .populate("deliveryArea")

            .populate("assignedAgent");

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ==========================================
// Get Single Order By ID
// ==========================================
const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)

            .populate("pickupArea")

            .populate("deliveryArea")

            .populate("assignedAgent");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ==========================================
// Track Order
// ==========================================
const trackOrder = async (req, res) => {

    try {

        const { trackingId } = req.params;

        const order = await Order.findOne({

            trackingId

        })

        .populate("pickupArea")

        .populate("deliveryArea")

        .populate("assignedAgent");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Tracking ID not found."

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};
// ==========================================
// Update Order Status
// ==========================================
const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found."
            });

        }

        // Allowed Status Flow
        const validTransitions = {

            "Assigned": ["Picked Up"],

            "Picked Up": ["In Transit"],

            "In Transit": ["Delivered"],

            "Delivered": [],

            "Cancelled": []

        };

        if (!validTransitions[order.status]) {

            return res.status(400).json({

                success: false,

                message: "Current status is invalid."

            });

        }

        if (!validTransitions[order.status].includes(status)) {

            return res.status(400).json({

                success: false,

                message: `Cannot change status from "${order.status}" to "${status}".`

            });

        }

        // Update Current Status
        order.status = status;

        // Add Timeline Entry
        order.timeline.push({

            status,

            timestamp: new Date()

        });

        // If Delivered -> Make Agent Available Again
        if (status === "Delivered") {

            const agent = await DeliveryAgent.findById(order.assignedAgent);

            if (agent) {

                agent.isAvailable = true;

                await agent.save();

            }

        }

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order Status Updated Successfully",

            order

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ==========================================
// Module Exports
// ==========================================
module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    trackOrder,
    updateOrderStatus
};