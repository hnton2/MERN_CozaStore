const router = require("express").Router();
const util = require("util");

const Product = require("../models/Product");
const { changeAlias, changeToJson } = require("../helpers/string");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "product";

// @DESC Create new product
// @ROUTE POST /api/product/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newItem = new Product(changeToJson(req.body));
    const images = req.files;

    if (!newItem.name || !newItem.description || !newItem.price || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });
    }

    try {
        newItem.slug = changeAlias(newItem.name);
        const existItem = await Product.findOne({ name: newItem.name });
        if (existItem) {
            if (images) images.map((item) => RemoveFile(item.filename));
            return res.status(400).json({ success: false, message: util.format(Notify.ERROR_EXIST, controller) });
        }
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            newItem.images = imagesName;
        }
        const savedItem = await newItem.save();
        res.json({ success: true, message: util.format(Notify.SUCCESS_CREATE, controller), item: savedItem });
    } catch (error) {
        console.log(error);
        if (images) images.map((item) => RemoveFile(item.filename));
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Update a product
// @ROUTE PUT /api/product/:id
// @ACCESS Private
router.put("/:id", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const images = req.files;
    const updateItem = changeToJson(req.body);
    updateItem.images = [];
    try {
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            updateItem.images = imagesName;
        }

        const oldItem = await Product.findById(req.params.id);
        if (oldItem) {
            // remove old images and update
            updateItem.oldImages.map((oldImage) => {
                if (updateItem.remainImages.length > 0) {
                    if (updateItem.remainImages.includes(oldImage)) updateItem.images.push(oldImage);
                    else RemoveFile(oldImage);
                } else RemoveFile(oldImage);
            });
            // change slug value if alternative name
            updateItem.slug = changeAlias(updateItem.name);
            const updatedItem = await Product.findByIdAndUpdate({ _id: req.params.id }, updateProduct, {
                new: true,
            });
            return res.json({
                success: true,
                message: util.format(Notify.SUCCESS_UPDATE, controller),
                product: updatedItem,
            });
        } else {
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        }
    } catch (error) {
        if (images) images.map((item) => RemoveFile(item.filename));
        console.log(error);
        const msg = error.code === 11000 ? "Invalid data" : Notify.ERROR_SERVER;
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a product
// @ROUTE DELETE /api/product/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await Product.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        else deletedItem.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find a product
// @ROUTE GET /api/product/find/:id
// @ACCESS Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await Product.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find public one slug
// @ROUTE GET /api/product/public/find/:slug
// @ACCESS Public
router.get("/public/find/:slug", async (req, res) => {
    try {
        const item = await Product.findOne({ slug: req.params.slug });
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get products
// @ROUTE GET /api/product/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const category = getParam(req.query, "category", "all");
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (category !== "all") condition["category.slug"] = category;
    if (status) condition.status = status;
    if (search !== "") condition.$text = { $search: search };

    const statistics = await countStatus({ search, category }, FILTER_STATUS, Product, "status");

    try {
        await Product.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Product.countDocuments(condition, (err, count) => {
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

// @DESC Get public products
// @ROUTE GET /api/product/public
// @ACCESS Public
router.get("/public", async (req, res) => {
    let condition = { status: "active", quantity: { $gt: 0 } };
    let sortObj = { updatedAt: "desc" };
    const perPage = 12;
    let page = getParam(req.query, "page", 1);
    const category = getParam(req.query, "category", "all");
    const search = getParam(req.query, "search", "");
    const sort = getParam(req.query, "sort", "all");
    const price = getParam(req.query, "price", "all");
    const color = getParam(req.query, "color", "all");
    const size = getParam(req.query, "size", "all");
    const tag = getParam(req.query, "tag", "all");

    if (price !== "all") {
        const priceObject = price.split("-");
        condition.price = { $gt: priceObject[0], $lt: priceObject[1] };
    }
    if (category !== "all") condition["category.slug"] = category;
    if (search !== "") condition.$text = { $search: search };
    if (size !== "all") condition["size.value"] = { $in: [size] };
    if (color !== "all") condition["color.value"] = { $in: [color.toLowerCase()] };
    if (tag !== "all") condition["tag.value"] = { $in: [tag.toLowerCase()] };
    if (sort !== "all") {
        const sortObject = sort.split("-");
        sortObj = { [sortObject[0]]: sortObject[1] };
    }

    try {
        await Product.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort(sortObj)
            .exec((err, items) => {
                Product.countDocuments(condition, (err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: util.format(Notify.SUCCESS_GET, controller),
                        items,
                        current: page,
                        pages: Math.ceil(count / perPage),
                    });
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get public new products
// @ROUTE GET /api/product/public/newest/:category
// @ACCESS Public
router.get("/public/newest/:category", async (req, res) => {
    let condition = { status: "active", quantity: { $gt: 0 } };
    const category = getParam(req.params, "category", "all");
    if (category !== "all") condition["category.slug"] = category;

    try {
        const items = await Product.find(condition).limit(8).sort({ updatedAt: -1 });
        if (items)
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_GET, controller),
                items,
            });
        else res.status(404).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get related products
// @ROUTE POST /api/product/public/related/:category
// @ACCESS Public
router.post("/public/related/:category", async (req, res) => {
    let condition = { status: "active", quantity: { $gt: 0 } };
    const category = getParam(req.params, "category", "all");
    const id = getParam(req.body, "id", "");
    if (category !== "all") condition["category.slug"] = category;

    try {
        const items = await Product.find({
            status: "active",
            "category.slug": category,
            _id: { $ne: id },
        }).limit(8);

        if (items)
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_GET, controller),
                items,
            });
        else res.status(404).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Update review for product
// @ROUTE POST /api/product/review/:slug
// @ACCESS Public
router.post("/review/:slug", async (req, res) => {
    try {
        const item = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            { $push: { reviews: req.body } },
            {
                new: true,
            }
        );
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.ERROR_NOTFOUND, "blog's review"), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Change product's status
// @ROUTE PUT /api/product/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await Product.findById(req.params.id);
        if (oldItem) {
            await Product.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_UPDATE, "status"),
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
module.exports = router;
