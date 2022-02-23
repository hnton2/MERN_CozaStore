const mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema(
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
        comment: [
            {
                name: { type: String, required: true },
                email: { type: String, required: true },
                createdTime: { type: Date, default: Date.now() },
                content: String,
            },
        ],
        favorite: { type: Number, default: 0 },
    },
    { timestamps: true }
);
BlogSchema.index({ name: "text", "categore.name": "text" });

module.exports = mongoose.model("Blog", BlogSchema);
