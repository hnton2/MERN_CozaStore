const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
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

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");
});
