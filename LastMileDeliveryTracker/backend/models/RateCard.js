const mongoose = require("mongoose");

const rateCardSchema = new mongoose.Schema(
    {
        zone: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Zone",
            required: true
        },

        serviceType: {
            type: String,
            enum: ["Standard", "Express"],
            default: "Standard"
        },

        minWeight: {
            type: Number,
            required: true
        },

        maxWeight: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        codCharge: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("RateCard", rateCardSchema);