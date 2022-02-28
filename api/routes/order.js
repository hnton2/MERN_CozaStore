const router = require("express").Router();
const util = require("util");

const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { randomString } = require("../helpers/string");
const { getParam } = require("../helpers/params");
const EmailHelper = require("../helpers/email");
const Notify = require("../config/notify");

const controller = "order";

// @DESC Create order
// @ROUTE POST /api/order/
// @ACCESS Public
router.post("/", verifyToken, async (req, res) => {
    const newItem = new Order({ ...req.body, code: randomString(10) });
    try {
        const savedItem = await newItem.save();
        if (savedItem) {
            EmailHelper.sendEmail(
                savedItem.user.email,
                "COZA STORE - Thank you for your purchase",
                `Your invoice code is #${savedItem.code}`
            );
            res.status(200).json({
                success: true,
                message: util.format(Notify.SUCCESS_CREATE, controller),
                item: savedItem,
            });
        } else res.status(400).json({ success: false, message: Notify.ERROR_SERVER });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get order
// @ROUTE GET /api/order/find/:code
// @ACCESS Public
router.get("/find/:invoiceCode", verifyToken, async (req, res) => {
    try {
        const item = await Order.findOne({ code: req.params.invoiceCode });
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get orders
// @ROUTE GET /api/order/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    try {
        await Order.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Order.countDocuments(condition, (err, count) => {
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

// @DESC Change order's status
// @ROUTE PUT /api/order/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { statusChange } = req.body;
    try {
        const oldItem = await Order.findById(req.params.id);
        if (oldItem) {
            await Order.updateOne({ _id: req.params.id }, { status: statusChange });
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
