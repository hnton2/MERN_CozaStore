const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const randomstring = require("randomstring");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SEC,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "CozaStore",
        format: async (req, file) => ("jpg", "png"),
        public_id: (req, file) => new Date().toISOString().replace(/:/g, "-") + randomstring.generate(10),
    },
});

const UploadFile = multer({ storage });
const RemoveFile = (oldPublicId) =>
    cloudinary.uploader.destroy(oldPublicId, (err) => {
        console.log(oldPublicId, " has been deleted");
    });

module.exports = {
    UploadFile,
    RemoveFile,
};
