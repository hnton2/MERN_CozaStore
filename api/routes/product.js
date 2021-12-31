const router = require("express").Router();

const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");

// @DESC Create a product
// @ROUTE Post /api/product/
// @ACCESS Public
router.post("/", verifyTokenAndAdmin, UploadFile.array("thumb", 20), async (req, res) => {
    const newProduct = new Product(req.body);
    const thumbs = req.files;

    if (!newProduct.name || !newProduct.slug || !newProduct.description || !newProduct.price || !thumbs) {
        if (thumbs) thumbs.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: "Missing necessary information" });
    }

    try {
        const existProduct = await Product.findOne({ title: newProduct.title });
        if (existProduct) {
            if (thumbs) thumbs.map((item) => RemoveFile(item.filename));
            return res.status(400).json({ success: false, message: "Product already exist" });
        }
        if (thumbs.length > 0) {
            let thumbsName = [];
            thumbs.map((item) => thumbsName.push(item.filename));
            newProduct.thumb = thumbsName;
        }
        console.log(newProduct);
        const savedProduct = await newProduct.save();
        res.json({ success: true, message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.log(error);
        if (thumbs) thumbs.map((item) => RemoveFile(item.filename));
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({ success: true, message: "Update product successfully", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete(req.params.id);
        if (!deletedProduct) return res.status(401).json({ success: false, message: "Product not found" });
        res.json({ success: true, message: "Product has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(401).json({ success: false, message: "Product not found" });
        res.json({ success: true, message: "Get product successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET ALL PRODUCT
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) return res.status(401).json({ success: false, message: "Products not found" });
        res.json({ success: true, message: "Get products successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
module.exports = router;
