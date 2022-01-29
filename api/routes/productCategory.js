const router = require("express").Router();
const { changeAlias } = require("../helpers/string");
const ProductCategory = require("../models/ProductCategory");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// @DESC Create new product category
// @ROUTE POST /api/product-category/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCategory = new ProductCategory(req.body);

    if (!newCategory.name) return res.status(401).json({ success: false, message: "Missing necessary information" });

    try {
        newCategory.slug = changeAlias(newCategory.name);
        const existCategory = await ProductCategory.findOne({
            name: newCategory.name,
        });
        if (existCategory) return res.status(400).json({ success: false, message: "Product category already exist" });
        const savedCategory = await newCategory.save();
        res.json({
            success: true,
            message: "Product category created successfully",
            category: savedCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Update a product
// @ROUTE PUT /api/product-category/:id
// @ACCESS Privates
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const updateCategory = req.body;
    try {
        const oldCategory = await ProductCategory.findById(req.params.id);
        if (oldCategory) {
            updateCategory.slug = changeAlias(updateCategory.name);
            const updatedCategory = await ProductCategory.findByIdAndUpdate({ _id: req.params.id }, updateCategory, {
                new: true,
            });
            res.json({
                success: true,
                message: "Update product category successfully",
                category: updatedCategory,
            });
        } else {
            return res.status(401).json({ success: false, message: "Product Category is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a product
// @ROUTE DELETE /api/product-category/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedCategory = await ProductCategory.findOneAndDelete({ _id: req.params.id });
        if (!deletedCategory) return res.status(401).json({ success: false, message: "Product category not found" });
        res.json({ success: true, message: "Product category has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a product
// @ROUTE GET /api/product-category/find/:id
// @ACCESS Privates
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params.id);
        if (!category) return res.status(401).json({ success: false, message: "Product category not found" });
        res.json({ success: true, message: "Get product category successfully", category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET ALL PRODUCT
// @DESC Get all  product
// @ROUTE GET /api/product-category/
// @ACCESS Public
router.get("/", async (req, res) => {
    try {
        const category = await ProductCategory.find().select("id name status color size tag slug description");
        if (!category) return res.status(401).json({ success: false, message: "Product categories not found" });
        res.json({ success: true, message: "Get product categories successfully", category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
module.exports = router;
