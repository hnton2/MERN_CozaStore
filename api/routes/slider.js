const router = require("express").Router();
const util = require("util");

const Slider = require("../models/Slider");
const { changeAlias, changeToJson } = require("../helpers/string");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "slider";

// @DESC Create slider
// @ROUTE POST /api/slider/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newItem = new Slider(changeToJson(req.body));
    const images = req.files;

    if (!newItem.name || !newItem.description || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });
    }

    try {
        const existItem = await Slider.findOne({ name: newItem.name });
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

// @DESC Update slider
// @ROUTE PUT /api/slider/:id
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

        const oldItem = await Slider.findById(req.params.id);
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
            const updatedItem = await Slider.findByIdAndUpdate({ _id: req.params.id }, updateSlider, {
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
        if (images) images.map((item) => RemoveFile(item.filename));
        console.log(error);
        const msg = error.code === 11000 ? "Invalid data" : Notify.ERROR_SERVER;
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete slider
// @ROUTE DELETE /api/slider/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await Slider.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        else deletedItem.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find slider
// @ROUTE GET /api/slider/find/:id
// @ACCESS Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await Slider.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get sliders
// @ROUTE GET /api/slider/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search }, FILTER_STATUS, Slider, "status");

    try {
        await Slider.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Slider.countDocuments(condition, (err, count) => {
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

// @DESC Get slider list
// @ROUTE GET /api/slider
// @ACCESS Public
router.get("/public", async (req, res) => {
    try {
        const items = await Slider.find().sort({ updatedAt: -1 });
        if (items)
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_GET, controller),
                items,
            });
        else res.status(400).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Change slider's status
// @ROUTE PUT /api/slider/change-status/:id
// @ACCESS Private
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await Slider.findById(req.params.id);
        if (oldItem) {
            await Slider.updateOne({ _id: req.params.id }, { status: statusValue });
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
