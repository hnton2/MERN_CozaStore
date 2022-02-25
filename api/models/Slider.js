const mongoose = require("mongoose");

var Sliderchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        path: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        images: { type: Array, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);
Sliderchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Slider", Sliderchema);
