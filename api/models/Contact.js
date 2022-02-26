const mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        status: { type: String, default: "inactive" },
        message: { type: String, default: "" },
    },
    { timestamps: true }
);
ContactSchema.index({ email: "text", message: "text" });

module.exports = mongoose.model("Contact", ContactSchema);
