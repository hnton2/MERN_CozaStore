const router = require("express").Router();
const util = require("util");

const ProductCategory = require("../models/ProductCategory");
const { changeAlias } = require("../helpers/string");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "category";

// @DESC Create new product category
// @ROUTE POST /api/product-category/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newItem = new ProductCategory(req.body);

    if (!newItem.name) return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });

    try {
        newItem.slug = changeAlias(newItem.name);
        const existItem = await ProductCategory.findOne({ name: newItem.name });
        if (existItem)
            return res.status(400).json({ success: false, message: util.format(Notify.ERROR_EXIST, controller) });
        const savedItem = await newItem.save();
        res.json({
            success: true,
            message: util.format(Notify.SUCCESS_CREATE, controller),
            category: savedItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Update a product
// @ROUTE PUT /api/product-category/:id
// @ACCESS Private
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const updateItem = req.body;
    try {
        const oldItem = await ProductCategory.findById(req.params.id);
        if (oldItem) {
            updateItem.slug = changeAlias(updateItem.name);
            const updatedCategory = await ProductCategory.findByIdAndUpdate({ _id: req.params.id }, updateCategory, {
                new: true,
            });
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_UPDATE, controller),
                category: updatedCategory,
            });
        } else {
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        }
    } catch (error) {
        console.log(error);
        const msg = error.code === 11000 ? "Invalid data" : Notify.ERROR_SERVER;
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a product
// @ROUTE DELETE /api/product-category/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await ProductCategory.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find a product category
// @ROUTE GET /api/product-category/find/:id
// @ACCESS Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await ProductCategory.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
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

    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search }, FILTER_STATUS, ProductCategory, "status");

    try {
        await ProductCategory.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                ProductCategory.countDocuments(condition, (err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: util.format(Notify.SUCCESS_GET, controller),
                        items,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        statistics,
                    });
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Change status
// @ROUTE PUT /api/product-cateogry/change-status/:id
// @ACCESS Private
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await ProductCategory.findById(req.params.id);
        if (oldItem) {
            await ProductCategory.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({ success: true, message: util.format(Notify.SUCCESS_UPDATE, "status") });
        } else {
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        }
    } catch (error) {
        console.log(error);
        const msg = error.code === 11000 ? "Invalid data" : Notify.ERROR_SERVER;
        res.status(500).json({ success: false, message: msg });
    }
});
module.exports = router;
