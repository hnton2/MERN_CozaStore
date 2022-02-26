const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const productCategoryRoute = require("./routes/productCategory");
const blogRoute = require("./routes/blog");
const blogCategoryRoute = require("./routes/blogCategory");
const orderRoute = require("./routes/order");
const checkoutRoute = require("./routes/checkout");
const couponRoute = require("./routes/coupon");
const sliderRoute = require("./routes/slider");
const contactRoute = require("./routes/contact");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(console.log("Connected MongoDB"))
    .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/product-category", productCategoryRoute);
app.use("/api/blog", blogRoute);
app.use("/api/blog-category", blogCategoryRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/contact", contactRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");
});
