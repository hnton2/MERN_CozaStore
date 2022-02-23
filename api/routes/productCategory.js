const router = require("express").Router();
const { changeAlias } = require("../helpers/string");
const ProductCategory = require("../models/ProductCategory");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getParam } = require("../helpers/params");

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

// @DESC Find a product category
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

// @DESC Get product category
// @ROUTE GET /api/product-category/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (status || search !== "") page = 1;
    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    try {
        await ProductCategory.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, categories) => {
                ProductCategory.countDocuments((err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: "Get categories successfully",
                        categories,
                        current: page,
                        pages: Math.ceil(count / perPage),
                    });
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Change product-category's status
// @ROUTE PUT /api/product-cateogry/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldCategory = await ProductCategory.findById(req.params.id);
        if (oldCategory) {
            await ProductCategory.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({
                success: true,
                message: "Update product-category's status successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "Product category is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});
module.exports = router;
