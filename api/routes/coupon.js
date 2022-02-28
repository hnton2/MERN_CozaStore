const router = require("express").Router();
const util = require("util");

const Coupon = require("../models/Coupon");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "coupon";

// @DESC Create coupon
// @ROUTE POST /api/coupon/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newItem = new Coupon(req.body);
    if (!newItem.name) return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });
    try {
        const existName = await Coupon.findOne({ name: newItem.name });
        if (existName)
            return res.status(400).json({ success: false, message: util.format(Notify.ERROR_EXIST, controller) });
        const existCode = await Coupon.findOne({ code: newItem.code });
        if (existCode)
            return res.status(400).json({ success: false, message: util.format(Notify.ERROR_EXIST, controller) });

        const savedItem = await newItem.save();
        res.json({
            success: true,
            message: util.format(Notify.SUCCESS_CREATE, controller),
            item: savedItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Update coupon
// @ROUTE PUT /api/coupon/:id
// @ACCESS Private
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const updateItem = req.body;
    try {
        const oldItem = await Coupon.findById(req.params.id);
        if (oldItem) {
            const updatedItem = await Coupon.findByIdAndUpdate({ _id: req.params.id }, updateItem, {
                new: true,
            });
            res.json({
                success: true,
                message: util.format(Notify.SUCCESS_UPDATE, controller),
                item: updatedItem,
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

// @DESC Delete coupon
// @ROUTE DELETE /api/coupon/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await Coupon.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Find coupon
// @ROUTE GET /api/coupon/find/:id
// @ACCESS Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await Coupon.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: "Get Coupon successfully", item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get coupons
// @ROUTE GET /api/coupon/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search }, FILTER_STATUS, Coupon, "status");

    try {
        await Coupon.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Coupon.countDocuments(condition, (err, count) => {
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

// @DESC Get public coupons
// @ROUTE GET /api/product/newest/:category
// @ACCESS Public
router.get("/public", async (req, res) => {
    try {
        const items = await Coupon.find({
            status: "active",
            quantity: { $gt: 0 },
            expiredTime: { $gte: Date.now() },
        }).sort({ updatedAt: -1 });
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

// @DESC Change coupon's status
// @ROUTE PUT /api/coupon/change-status/:id
// @ACCESS Private
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await Coupon.findById(req.params.id);
        if (oldItem) {
            await Coupon.updateOne({ _id: req.params.id }, { status: statusValue });
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
