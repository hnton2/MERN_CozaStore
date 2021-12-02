const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ success: false, message: "Missing username and/or email and/or password" });

    const newUser = new User({
        username: username,
        email: email,
        password: cryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    try {
        // check for existing username
        const existName = await User.findOne({ username });
        existName && res.status(400).json({ success: false, message: "Username already exist" });

        // check for existing email
        const existEmail = await User.findOne({ email });
        existEmail && res.status(400).json({ success: false, message: "Email already exist" });

        newUser.save();
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// LOGIN
router.post("login", async (req, res) => {
    const { username, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Missing email and/or password" });

    try {
        const user = await User.findOne({ username: username });
        !user && res.status(400).json({ success: false, message: "Incorrect username" });

        const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
        originalPassword !== req.body.password &&
            res.status(400).json({ success: false, message: "Incorrect password" });

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
