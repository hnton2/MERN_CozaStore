const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        avatar: { type: String },
        cart: {
            products: { type: Array, default: [] },
            quantity: { type: Number, default: 0 },
            coupon: { type: Object, default: {} },
            total: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
