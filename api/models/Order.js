const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        user: {
            name: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            phone: { type: String, required: true, unique: true },
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
                name: { type: String, required: true, unique: true },
                slug: { type: String, required: true, unique: true },
                images: { type: Array, required: true },
                category: {
                    slug: { type: String, required: true, unique: true },
                    name: { type: String, required: true, unique: true },
                },
                size: { type: String, required: true },
                color: { type: String, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, default: 0 },
                quantity: { type: Number, default: 1 },
            },
        ],
        coupon: {
            _id: { type: String, required: true, unique: true },
            name: { type: String, required: true, unique: true },
            code: { type: String, required: true, unique: true },
            discount: { type: Number, required: true },
        },
        total: { type: Number, required: true },
        checkPayment: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
