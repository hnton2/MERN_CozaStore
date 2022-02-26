const mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        user: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: {
                country: { type: String, required: true },
                province: { type: String, required: true },
                district: { type: String, required: true },
                ward: { type: String, required: true },
                street: { type: String, required: true },
            },
            message: String,
        },
        status: { type: String, default: "accepted" },
        products: [
            {
                name: { type: String, required: true },
                slug: { type: String, required: true },
                images: { type: Array, required: true },
                category: {
                    slug: { type: String, required: true },
                    name: { type: String, required: true },
                },
                size: { type: String, required: true },
                color: { type: String, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, default: 0 },
                quantity: { type: Number, default: 1 },
            },
        ],
        coupon: {
            _id: { type: String },
            name: { type: String },
            code: { type: String },
            discount: { type: Number },
        },
        total: { type: Number, required: true },
        checkPayment: { type: Boolean, default: true },
    },
    { timestamps: true }
);
OrderSchema.index({ code: "text", "user.name": "text", "products.name": "text", "coupon.name": "text" });

module.exports = mongoose.model("Order", OrderSchema);
