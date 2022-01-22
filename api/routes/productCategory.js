const router = require("express").Router();
const { changeAlias } = require("../helpers/string");
const ProductCategory = require("../models/ProductCategory");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// @DESC Create a product category
// @ROUTE Post /api/product-category/
// @ACCESS Public
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new ProductCategory(req.body);

  if (!newCategory.name) {
    return res.status(401).json({ success: false, message: "Missing necessary information" });
  }

  try {
    newCategory.slug = changeAlias(newCategory.name);
    const existCategory = await ProductCategory.findOne({
      name: newCategory.name,
    });
    if (existCategory) {
      return res.status(400).json({ success: false, message: "Product category already exist" });
    }
    const savedCategory = await newCategory.save();
    res.json({
      success: true,
      message: "Product created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json({
      success: true,
      message: "Update product category successfully",
      category: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCategory = await ProductCategory.findOneAndDelete(req.params.id);
    if (!deletedCategory) return res.status(401).json({ success: false, message: "Product category not found" });
    res.json({ success: true, message: "Product category has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) return res.status(401).json({ success: false, message: "Product category not found" });
    res.json({ success: true, message: "Get product category successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET ALL PRODUCT
router.get("/", async (req, res) => {
  try {
    const category = await ProductCategory.find({ status: "active" }).select("id name slug description");
    if (!category) return res.status(401).json({ success: false, message: "Product categories not found" });
    res.json({ success: true, message: "Get product categories successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
