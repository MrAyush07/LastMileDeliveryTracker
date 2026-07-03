const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customerName: {
        type: String,
        required: true
    },

    customerPhone: {
        type: String,
        required: true
    },

    pickupArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true
    },

    deliveryArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    serviceType: {
        type: String,
        enum: ["Standard", "Express"],
        default: "Standard"
    },

    paymentType: {
        type: String,
        enum: ["Prepaid", "COD"],
        default: "Prepaid"
    },

    deliveryCharge: {
        type: Number,
        default: 0
    },

    trackingId: {
        type: String,
        unique: true
    },

    assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryAgent"
    },

    status: {
    type: String,
    enum: [
        "Pending",
        "Assigned",
        "Picked Up",
        "In Transit",
        "Delivered",
        "Cancelled"
    ],
    default: "Pending"
},

timeline: [
    {
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
]  

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);