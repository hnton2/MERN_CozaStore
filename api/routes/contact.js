const router = require("express").Router();
const util = require("util");

const Contact = require("../models/Contact");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { CONTACT_STATUS } = require("../config/system");
const Notify = require("../config/notify");

const controller = "contact";

// @DESC Create contact
// @ROUTE POST /api/contact/
// @ACCESS Public
router.post("/", async (req, res) => {
    const item = new Contact(req.body);

    if (!item.email) return res.status(401).json({ success: false, message: Notify.ERROR_MISSING });

    try {
        const existItem = await Contact.findOne({ email: item.email });
        if (existItem)
            return res.status(400).json({ success: false, message: util.format(Notify.ERROR_EXIST, controller) });
        const savedItem = await item.save();
        res.json({ success: true, message: util.format(Notify.SUCCESS_CREATE, controller) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: Notify.ERROR_SERVER });
    }
});

// @DESC Get contact list
// @ROUTE GET /api/contact/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search }, CONTACT_STATUS, Contact, "status");
    try {
        await Contact.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, items) => {
                Contact.countDocuments(condition, (err, count) => {
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

// @DESC Change status
// @ROUTE PUT /api/contact/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldItem = await Contact.findById(req.params.id);
        if (oldItem) {
            await Contact.updateOne({ _id: req.params.id }, { status: statusValue });
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
