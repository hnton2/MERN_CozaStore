const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: Boolean, default: true },
        quantity: { type: Number, required: true },
        desc: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
