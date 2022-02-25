const router = require("express").Router();
const { changeAlias, changeToJson } = require("../helpers/string");
const Slider = require("../models/Slider");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");

// @DESC Create new slider
// @ROUTE POST /api/slider/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newSlider = new Slider(changeToJson(req.body));
    const images = req.files;

    if (!newSlider.name || !newSlider.description || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: "Missing necessary information" });
    }

    try {
        const existSlider = await Slider.findOne({ name: newSlider.name });
        if (existSlider) {
            if (images) images.map((item) => RemoveFile(item.filename));
            return res.status(400).json({ success: false, message: "Slider already exist" });
        }
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            newSlider.images = imagesName;
        }
        const savedSlider = await newSlider.save();
        res.json({ success: true, message: "Slider created successfully", slider: savedSlider });
    } catch (error) {
        console.log(error);
        if (images) images.map((item) => RemoveFile(item.filename));
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Update a slider
// @ROUTE PUT /api/slider/:id
// @ACCESS Privates
router.put("/:id", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const images = req.files;
    const updateSlider = changeToJson(req.body);
    updateSlider.images = [];
    try {
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            updateSlider.images = imagesName;
        }

        const oldSlider = await Slider.findById(req.params.id);
        if (oldSlider) {
            // remove old images and update
            updateSlider.oldImages.map((oldImage) => {
                if (updateSlider.remainImages.length > 0) {
                    if (updateSlider.remainImages.includes(oldImage)) updateSlider.images.push(oldImage);
                    else RemoveFile(oldImage);
                } else RemoveFile(oldImage);
            });
            // change slug value if alternative name
            updateSlider.slug = changeAlias(updateSlider.name);
            const updatedSlider = await Slider.findByIdAndUpdate({ _id: req.params.id }, updateSlider, {
                new: true,
            });
            return res.json({ success: true, message: "Update slider successfully", slider: updatedSlider });
        } else {
            return res.status(401).json({ success: false, message: "Slider is invalid" });
        }
    } catch (error) {
        if (images) images.map((item) => RemoveFile(item.filename));
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a slider
// @ROUTE DELETE /api/slider/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedSlider = await Slider.findOneAndDelete({ _id: req.params.id });
        if (!deletedSlider) return res.status(401).json({ success: false, message: "Slider not found" });
        else deletedSlider.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: "Slider has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a slider
// @ROUTE GET /api/slider/find/:id
// @ACCESS Privates
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);
        if (!slider) return res.status(401).json({ success: false, message: "Slider not found" });
        res.json({ success: true, message: "Get slider successfully", slider });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
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
            .exec((err, sliders) => {
                Slider.countDocuments(condition, (err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: "Get sliders successfully",
                        sliders,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        statistics,
                    });
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get slider list
// @ROUTE GET /api/slider
// @ACCESS Public
router.get("/public-sliders", async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ updatedAt: -1 });
        if (sliders)
            res.json({
                success: true,
                message: "Get sliders successfully",
                sliders,
            });
        else res.status(400).json({ success: false, message: "Sliders not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Change slider's status
// @ROUTE PUT /api/slider/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldSlider = await Slider.findById(req.params.id);
        if (oldSlider) {
            await Slider.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({
                success: true,
                message: "Update slider's status successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "Slider is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});
module.exports = router;
