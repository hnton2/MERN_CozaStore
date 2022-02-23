const mongoose = require("mongoose");

var BlogCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        description: { type: String },
    },
    { timestamps: true }
);
BlogCategorySchema.index({ name: "text", slug: "text" });

module.exports = mongoose.model("BlogCategory", BlogCategorySchema);
