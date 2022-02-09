const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        discount: { type: Number, required: true },
        quantity: { type: Number, default: 100 },
        expiredTime: { type: Date, required: true, default: Date.now() },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
