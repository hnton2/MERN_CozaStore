const mongoose = require("mongoose");

var ProductCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        tag: { type: Array },
        size: { type: Array },
        color: { type: Array },
        description: { type: String },
    },
    { timestamps: true }
);
ProductCategorySchema.index({ name: "text" });

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
