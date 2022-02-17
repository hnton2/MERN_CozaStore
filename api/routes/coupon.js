const router = require("express").Router();
const { changeAlias } = require("../helpers/string");
const Coupon = require("../models/Coupon");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// @DESC Create new coupon
// @ROUTE POST /api/coupon/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCoupon = new Coupon(req.body);
    if (!newCoupon.name) return res.status(401).json({ success: false, message: "Missing necessary information" });
    try {
        const existName = await Coupon.findOne({ name: newCoupon.name });
        if (existName) return res.status(400).json({ success: false, message: "Coupon name already exist" });
        const existCode = await Coupon.findOne({ code: newCoupon.code });
        if (existCode) return res.status(400).json({ success: false, message: "Coupon code already exist" });

        const savedCoupon = await newCoupon.save();
        res.json({
            success: true,
            message: "Coupon created successfully",
            coupon: savedCoupon,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Update a coupon
// @ROUTE PUT /api/coupon/:id
// @ACCESS Privates
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const updateCoupon = req.body;
    try {
        const oldCoupon = await Coupon.findById(req.params.id);
        if (oldCoupon) {
            const updatedCoupon = await Coupon.findByIdAndUpdate({ _id: req.params.id }, updateCoupon, {
                new: true,
            });
            res.json({
                success: true,
                message: "Update Coupon successfully",
                coupon: updatedCoupon,
            });
        } else {
            return res.status(401).json({ success: false, message: "Coupon is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a coupon
// @ROUTE DELETE /api/coupon/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedCoupon = await Coupon.findOneAndDelete({ _id: req.params.id });
        if (!deletedCoupon) return res.status(401).json({ success: false, message: "Coupon not found" });
        res.json({ success: true, message: "Coupon has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a coupon
// @ROUTE GET /api/coupon/find/:id
// @ACCESS Privates
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(401).json({ success: false, message: "Coupon not found" });
        res.json({ success: true, message: "Get Coupon successfully", coupon });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET ALL PRODUCT
// @DESC Get all  coupon
// @ROUTE GET /api/coupon/
// @ACCESS Public
router.get("/", async (req, res) => {
    try {
        const coupon = await Coupon.find().select("id name code status discount quantity expiredTime description");
        if (!coupon) return res.status(401).json({ success: false, message: "Coupons not found" });
        res.json({ success: true, message: "Get product categories successfully", coupon });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Change coupon's status
// @ROUTE PUT /api/coupon/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldCoupon = await Coupon.findById(req.params.id);
        if (oldCoupon) {
            await Coupon.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({
                success: true,
                message: "Update coupon's status successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "Coupon is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

module.exports = router;
