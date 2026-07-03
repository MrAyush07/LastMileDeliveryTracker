const Order = require("../models/Order");
const DeliveryAgent = require("../models/DeliveryAgent");

const getDashboardStats = async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        const deliveredOrders = await Order.countDocuments({
            status: "Delivered"
        });

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const assignedOrders = await Order.countDocuments({
            status: "Assigned"
        });

        const inTransitOrders = await Order.countDocuments({
            status: "In Transit"
        });

        const cancelledOrders = await Order.countDocuments({
            status: "Cancelled"
        });

        const totalAgents = await DeliveryAgent.countDocuments();

        const delivered = await Order.find({
            status: "Delivered"
        });

        let revenue = 0;

        delivered.forEach(order => {
            revenue += order.deliveryCharge;
        });

        res.status(200).json({

            success: true,

            dashboard: {

                totalOrders,

                deliveredOrders,

                pendingOrders,

                assignedOrders,

                inTransitOrders,

                cancelledOrders,

                totalAgents,

                revenue

            }

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
    getDashboardStats
};