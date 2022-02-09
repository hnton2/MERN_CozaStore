const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const productCategoryRoute = require("./routes/productCategory");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const couponRoute = require("./routes/coupon");

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
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/coupon", couponRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");
});
