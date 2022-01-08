const router = require("express").Router();
const { changeAlias } = require("../helpers/string");
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");

// @DESC Create a product
// @ROUTE Post /api/product/
// @ACCESS Public
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newProduct = new Product({
        ...req.body,
        name: JSON.parse(req.body.name),
        description: JSON.parse(req.body.description),
        size: JSON.parse(req.body.size),
        color: JSON.parse(req.body.color),
        tag: JSON.parse(req.body.tag),
    });
    const images = req.files;
    newProduct.slug = changeAlias(newProduct.name);

    if (!newProduct.name || !newProduct.description || !newProduct.price || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: "Missing necessary information" });
    }

    try {
        const existProduct = await Product.findOne({ name: newProduct.name });
        if (existProduct) {
            if (images) images.map((item) => RemoveFile(item.filename));
            return res.status(400).json({ success: false, message: "Product already exist" });
        }
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            newProduct.images = imagesName;
        }
        const savedProduct = await newProduct.save();
        res.json({ success: true, message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.log(error);
        if (images) images.map((item) => RemoveFile(item.filename));
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
