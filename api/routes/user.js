const router = require("express").Router();
const cryptoJS = require("crypto-js");

const User = require("../models/User");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({ success: true, message: "Update user successfully", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Delete a user
// @ROUTE DELETE /api/user/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
        if (!deletedUser) return res.status(401).json({ success: false, message: "User not found" });
        res.json({ success: true, message: "User has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(401).json({ success: false, message: "User not found" });
        const { password, ...others } = user._doc;
        res.json({ success: true, message: "Get user successfully", user: others });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get all  user
// @ROUTE GET /api/user/
// @ACCESS Public
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ updatedAt: -1 });
        if (!users) return res.status(401).json({ success: false, message: "Users not found" });
        res.json({ success: true, message: "Get users successfully", user: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Save cart before user logout
// @ROUTE GET /api/user/save-card/:id
// @ACCESS Public
router.post("/save-cart/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { cart: req.body });
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Change user's role
// @ROUTE PUT /api/product/change-role/:id
// @ACCESS Privates
router.put("/change-role/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentRole } = req.body;
    try {
        const oldUser = await User.findById(req.params.id);
        if (oldUser) {
            await User.updateOne({ _id: req.params.id }, { isAdmin: !currentRole });
            res.json({
                success: true,
                message: "Update user's role successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "User is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});
module.exports = router;
