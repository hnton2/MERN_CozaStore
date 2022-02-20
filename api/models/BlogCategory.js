const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        status: { type: String, default: "active" },
        description: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", BlogCategorySchema);
