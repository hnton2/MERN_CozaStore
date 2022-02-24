const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { randomString } = require("../helpers/string");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");

// @DESC Create a order
// @ROUTE POST /api/order/
// @ACCESS Public
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order({ ...req.body, code: randomString(10) });
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json({ success: true, message: "Create order successfully", order: savedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get a order
// @ROUTE GET /api/order/find/:code
// @ACCESS Public
router.get("/find/:invoiceCode", verifyToken, async (req, res) => {
    try {
        const order = await Order.findOne({ code: req.params.invoiceCode });
        if (!order) return res.status(401).json({ success: false, message: "Order not found" });
        res.json({ success: true, message: "Get order successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
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
            .exec((err, orders) => {
                Order.countDocuments((err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: "Get orders successfully",
                        orders,
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

// @DESC Change order's status
// @ROUTE PUT /api/order/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { statusChange } = req.body;
    try {
        const oldOrder = await Order.findById(req.params.id);
        if (oldOrder) {
            await Order.updateOne({ _id: req.params.id }, { status: statusChange });
            res.json({
                success: true,
                message: "Update order's status successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "Order is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

module.exports = router;
