const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
    loginAdmin,
    SignupUser
} = require("../Controllers/UserCtrl");
const  uploadSingleImageToCloudinary = require('../Middewares/singleImgUpload')
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", upload.single('image'), uploadSingleImageToCloudinary, SignupUser);

module.exports = router;
