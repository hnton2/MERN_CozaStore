const router = require("express").Router();
const util = require("util");

const Blog = require("../models/Blog");
const { changeAlias, changeToJson } = require("../helpers/string");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "blog";

// @DESC Create blog
// @ROUTE POST /api/blog/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newItem = new Blog(changeToJson(req.body));
    const images = req.files;

    if (!newItem.name || !newItem.description || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });
    }

    try {
        newItem.slug = changeAlias(newItem.name);
        const existItem = await Blog.findOne({ name: newItem.name });
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

// @DESC Update blog
// @ROUTE PUT /api/blog/:id
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

        const oldItem = await Blog.findById(req.params.id);
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
            const updatedItem = await Blog.findByIdAndUpdate({ _id: req.params.id }, updateItem, {
                new: true,
            });
            return res.json({
                success: true,
                message: util.format(Notify.SUCCESS_UPDATE, controller),
                item: updatedItem,
            });
        } else {
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        }
    } catch (error) {
        console.log(error);
        if (images) images.map((item) => RemoveFile(item.filename));
        const msg = error.code === 11000 ? "Invalid data" : Notify.ERROR_SERVER;
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete blog
// @ROUTE DELETE /api/blog/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await Blog.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        else deletedItem.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find blog
// @ROUTE GET /api/blog/find/:id
// @ACCESS Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await Blog.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find public blog
// @ROUTE GET /api/blog/public/find/:slug
// @ACCESS Public
router.get("/public/find/:slug", async (req, res) => {
    try {
        const item = await Blog.findOne({ slug: req.params.slug });
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get blogs
// @ROUTE GET /api/blog/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const category = getParam(req.query, "category", "all");
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (category !== "all") condition["category.slug"] = category;
    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search, category }, FILTER_STATUS, Blog, "status");

    try {
        await Blog.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Blog.countDocuments(condition, (err, count) => {
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

// @DESC Get public blogs
// @ROUTE GET /api/blog/public
// @ACCESS Public
router.get("/public", async (req, res) => {
    let condition = { status: "active" };
    const perPage = 5;
    const page = getParam(req.query, "page", 1);
    const search = getParam(req.query, "search", "");
    const category = getParam(req.query, "category", "all");

    if (search !== "") condition.$text = { $search: search };
    if (category !== "all") condition["category.slug"] = category;

    try {
        await Blog.find(condition)
            .select("id name slug images status category tag description reviews")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ updatedAt: "desc" })
            .exec((err, items) => {
                Blog.countDocuments((err, count) => {
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

// @DESC Get public new blogs
// @ROUTE GET /api/blog/public/newest
// @ACCESS Public
router.get("/public/newest", async (req, res) => {
    try {
        const items = await Blog.find().limit(3).sort({ updatedAt: -1 });
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

// @DESC Add comment
// @ROUTE POST /api/blog/comment/:slug
// @ACCESS Public
router.post("/comment/:slug", async (req, res) => {
    try {
        const item = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $push: { comment: req.body } },
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

// @DESC Change blog's status
// @ROUTE PUT /api/blog/change-status/:id
// @ACCESS Private
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await Blog.findById(req.params.id);
        if (oldItem) {
            await Blog.updateOne({ _id: req.params.id }, { status: statusValue });
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
