const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { randomString } = require("../helpers/string");

const router = require("express").Router();

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

// @DESC Get all order
// @ROUTE GET /api/order/
// @ACCESS Public
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) return res.status(401).json({ success: false, message: "Orders not found" });
        res.status(200).json({ success: true, message: "Get orders successfully", orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
