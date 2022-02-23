const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        images: { type: Array, required: true },
        description: { type: String, required: true },
        category: {
            slug: String,
            name: String,
        },
        tag: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, default: 100 },
        sold: { type: Number, default: 0 },
        reviews: [
            {
                name: { type: String, required: true },
                email: { type: String, required: true },
                createdTime: { type: Date, default: Date.now() },
                rating: { type: Number, default: 5 },
                content: String,
            },
        ],
        favorite: { type: Number, default: 0 },
    },
    { timestamps: true }
);
ProductSchema.index({ name: "text", "category.name": "text", "tag.label": "text", price: "text" });

module.exports = mongoose.model("Product", ProductSchema);
