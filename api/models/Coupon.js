const mongoose = require("mongoose");

var CouponSchema = new mongoose.Schema(
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
CouponSchema.index({ name: "text", code: "text", discount: "text", description: "text" });

module.exports = mongoose.model("Coupon", CouponSchema);
