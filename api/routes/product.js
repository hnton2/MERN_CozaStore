const router = require("express").Router();
const { changeAlias, changeToJson } = require("../helpers/string");
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");

// @DESC Create new product
// @ROUTE POST /api/product/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newProduct = new Product(changeToJson(req.body));
    const images = req.files;

    if (!newProduct.name || !newProduct.description || !newProduct.price || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: "Missing necessary information" });
    }

    try {
        newProduct.slug = changeAlias(newProduct.name);
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

// @DESC Update a product
// @ROUTE PUT /api/product/:id
// @ACCESS Privates
router.put("/:id", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const images = req.files;
    const updateProduct = changeToJson(req.body);
    updateProduct.images = [];
    try {
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            updateProduct.images = imagesName;
        }

        const oldProduct = await Product.findById(req.params.id);
        if (oldProduct) {
            // remove old images and update
            updateProduct.oldImages.map((oldImage) => {
                if (updateProduct.remainImages.length > 0) {
                    updateProduct.remainImages.map((remainImage) => {
                        if (oldImage === remainImage) updateProduct.images.push(remainImage);
                        else RemoveFile(oldImage);
                    });
                } else RemoveFile(oldImage);
            });
            // change slug value if alternative name
            updateProduct.slug = changeAlias(updateProduct.name);
            const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, updateProduct, {
                new: true,
            });
            return res.json({ success: true, message: "Update product successfully", product: updatedProduct });
        } else {
            return res.status(401).json({ success: false, message: "Product is invalid" });
        }
    } catch (error) {
        if (images) images.map((item) => RemoveFile(item.filename));
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a product
// @ROUTE DELETE /api/product/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
        if (!deletedProduct) return res.status(401).json({ success: false, message: "Product not found" });
        else deletedProduct.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: "Product has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a product
// @ROUTE GET /api/product/find/:id
// @ACCESS Privates
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

// @DESC Find a product by slug
// @ROUTE GET /api/product/find-by-slug/:slug
// @ACCESS Public
router.get("/find-by-slug/:slug", async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) return res.status(401).json({ success: false, message: "Product not found" });
        res.json({ success: true, message: "Get product successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get all  product
// @ROUTE GET /api/product/
// @ACCESS Public
router.get("/", async (req, res) => {
    try {
        const product = await Product.find().select(
            "id name slug images status category tag color size quantity price description"
        );
        if (!product) return res.status(401).json({ success: false, message: "Products not found" });
        res.json({ success: true, message: "Get products successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get products by category
// @ROUTE GET /api/product/:category
// @ACCESS Public
router.get("/:category", async (req, res) => {
    try {
        const product = await Product.find({ "category.slug": req.params.category }).select(
            "id name slug images status category tag color size quantity price description"
        );
        if (!product) return res.status(401).json({ success: false, message: "Products not found" });
        res.json({ success: true, message: "Get products successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
module.exports = router;
