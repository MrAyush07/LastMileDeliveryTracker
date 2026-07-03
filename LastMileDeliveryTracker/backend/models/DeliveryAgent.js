const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true
        },

        vehicleType: {
            type: String,
            enum: ["Bike", "Scooter", "Car", "Van"],
            required: true
        },

        assignedZone: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Zone",
            required: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);