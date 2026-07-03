const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
    {
        areaName: {
            type: String,
            required: true,
            trim: true
        },

        zone: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Zone",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Area", areaSchema);