const router = require("express").Router();
const { changeAlias, changeToJson } = require("../helpers/string");
const Blog = require("../models/Blog");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { UploadFile, RemoveFile } = require("../helpers/file");
const { getParam } = require("../helpers/params");
const { countStatus } = require("../helpers/utils");
const { FILTER_STATUS } = require("../config/system");

// @DESC Create new blog
// @ROUTE POST /api/blog/
// @ACCESS Private
router.post("/", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const newBlog = new Blog(changeToJson(req.body));
    const images = req.files;

    if (!newBlog.name || !newBlog.description || !images) {
        if (images) images.map((item) => RemoveFile(item.filename));
        return res.status(401).json({ success: false, message: "Missing necessary information" });
    }

    try {
        newBlog.slug = changeAlias(newBlog.name);
        const existBlog = await Blog.findOne({ name: newBlog.name });
        if (existBlog) {
            if (images) images.map((item) => RemoveFile(item.filename));
            return res.status(400).json({ success: false, message: "Blog already exist" });
        }
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            newBlog.images = imagesName;
        }
        const savedBlog = await newBlog.save();
        res.json({ success: true, message: "Blog created successfully", blog: savedBlog });
    } catch (error) {
        console.log(error);
        if (images) images.map((item) => RemoveFile(item.filename));
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Update a blog
// @ROUTE PUT /api/blog/:id
// @ACCESS Privates
router.put("/:id", verifyTokenAndAdmin, UploadFile.array("images", 20), async (req, res) => {
    const images = req.files;
    const updateBlog = changeToJson(req.body);
    updateBlog.images = [];
    try {
        if (images.length > 0) {
            let imagesName = [];
            images.map((item) => imagesName.push(item.filename));
            updateBlog.images = imagesName;
        }

        const oldBlog = await Blog.findById(req.params.id);
        if (oldBlog) {
            // remove old images and update
            updateBlog.oldImages.map((oldImage) => {
                if (updateBlog.remainImages.length > 0) {
                    if (updateBlog.remainImages.includes(oldImage)) updateBlog.images.push(oldImage);
                    else RemoveFile(oldImage);
                } else RemoveFile(oldImage);
            });
            // change slug value if alternative name
            updateBlog.slug = changeAlias(updateBlog.name);
            const updatedBlog = await Blog.findByIdAndUpdate({ _id: req.params.id }, updateBlog, {
                new: true,
            });
            return res.json({ success: true, message: "Update blog successfully", blog: updatedBlog });
        } else {
            return res.status(401).json({ success: false, message: "Blog is invalid" });
        }
    } catch (error) {
        if (images) images.map((item) => RemoveFile(item.filename));
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});

// @DESC Delete a blog
// @ROUTE DELETE /api/blog/:id
// @ACCESS Privates
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedBlog = await Blog.findOneAndDelete({ _id: req.params.id });
        if (!deletedBlog) return res.status(401).json({ success: false, message: "Blog not found" });
        else deletedBlog.images.map((item) => RemoveFile(item));
        res.json({ success: true, message: "Blog has been deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a blog
// @ROUTE GET /api/blog/find/:id
// @ACCESS Privates
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(401).json({ success: false, message: "Blog not found" });
        res.json({ success: true, message: "Get blog successfully", blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Find a blog by slug
// @ROUTE GET /api/blog/find-by-slug/:slug
// @ACCESS Public
router.get("/find-by-slug/:slug", async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(401).json({ success: false, message: "Blog not found" });
        res.json({ success: true, message: "Get blog successfully", blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Get blogs
// @ROUTE GET /api/blog/
// @ACCESS Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    let condition = {};
    const perPage = 5;
    let page = getParam(req.query, "page", 1);
    const category = getParam(req.query, "category", "all");
    const status = getParam(req.query, "status", null);
    const search = getParam(req.query, "search", "");

    if (category !== "all") condition["category.slug"] = category;
    if (search !== "") condition.$text = { $search: search };
    if (status) condition.status = status;

    const statistics = await countStatus({ search, category }, FILTER_STATUS, Blog, "status");

    try {
        await Blog.find(condition)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.countDocuments(condition, (err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: "Get blogs successfully",
                        blogs,
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

// @DESC Get blog list
// @ROUTE GET /api/blog/(:slugCategory)?
// @ACCESS Public
router.get("(/:category)?", async (req, res) => {
    let condition = {};
    const perPage = 5;
    const page = getParam(req.query, "page", 1);
    const category = getParam(req.params, "category", "all");
    if (category !== "all") condition["category.slug"] = category;
    try {
        await Blog.find(condition)
            .select("id name slug images status category tag description reviews")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.countDocuments((err, count) => {
                    if (err) return console.log(err);
                    res.json({
                        success: true,
                        message: "Get blogs successfully",
                        blogs,
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

// @DESC Get public new blogs
// @ROUTE GET /api/blog/find/newest
// @ACCESS Public
router.get("/get/newest", async (req, res) => {
    try {
        const blogs = await Blog.find().limit(3).sort({ updatedAt: -1 });
        if (blogs)
            res.json({
                success: true,
                message: "Get new blogs successfully",
                blogs,
            });
        else res.status(404).json({ success: false, message: "Blogs not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Update comment for blog
// @ROUTE POST /api/blog/comment/:slug
// @ACCESS Public
router.post("/comment/:slug", async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $push: { comment: req.body } },
            {
                new: true,
            }
        );
        if (!blog) return res.status(401).json({ success: false, message: "Blog not found" });
        res.json({ success: true, message: "Update review of blog successfully", blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @DESC Change blog's status
// @ROUTE PUT /api/blog/change-status/:id
// @ACCESS Privates
router.put("/change-status/:id", verifyTokenAndAdmin, async (req, res) => {
    const { currentStatus } = req.body;
    const statusValue = currentStatus === "active" ? "inactive" : "active";
    try {
        const oldBlog = await Blog.findById(req.params.id);
        if (oldBlog) {
            await Blog.updateOne({ _id: req.params.id }, { status: statusValue });
            res.json({
                success: true,
                message: "Update blog's status successfully",
            });
        } else {
            return res.status(401).json({ success: false, message: "Blog is invalid" });
        }
    } catch (error) {
        console.log(error);
        let msg = "Internal server error";
        if (error.code === 11000) msg = "Invalid data";
        res.status(500).json({ success: false, message: msg });
    }
});
module.exports = router;
