const router = require("express").Router();
const cryptoJS = require("crypto-js");
const util = require("util");

const User = require("../models/User");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { USER_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "user";

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({ success: true, message: util.format(Notify.SUCCESS_UPDATE, controller), user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Delete a user
// @ROUTE DELETE /api/user/:id
// @ACCESS Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedItem = await User.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        res.json({ success: true, message: util.format(Notify.SUCCESS_DELETE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const item = await User.findById(req.params.id);
        if (!item)
            return res.status(401).json({ success: false, message: util.format(Notify.ERROR_NOTFOUND, controller) });
        const { password, ...others } = item._doc;
        res.json({ success: true, message: util.format(Notify.SUCCESS_GET, controller), item: others });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get users
// @ROUTE GET /api/user/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const isAdmin = getParam(req.query, "isAdmin", null);
    const search = getParam(req.query, "search", "");

    if (search !== "") condition.$text = { $search: search };
    if (isAdmin) condition.isAdmin = isAdmin;

    const statistics = await countStatus({ search }, USER_STATUS, User, "isAdmin");

    try {
        await User.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                User.countDocuments(condition, (err, count) => {
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

// @DESC Save cart before user logout
// @ROUTE POST /api/user/save-card/:id
// @ACCESS Public
router.post("/save-cart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { cart: req.body });
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Clean cart from db after user checkout
// @ROUTE POST /api/user/clean-card/:id
// @ACCESS Public
router.post("/clean-cart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { cart: {} });
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Change user's role
// @ROUTE PUT /api/product/change-role/:id
// @ACCESS Private
router.put("/change-role/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentRole } = req.body;
    try {
        const oldItem = await User.findById(req.params.id);
        if (oldItem) {
            await User.updateOne({ _id: req.params.id }, { isAdmin: !currentRole });
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
