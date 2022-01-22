const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: String, default: true },
        description: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
