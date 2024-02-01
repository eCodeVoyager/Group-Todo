const { v2 } = require(cloudinary);
const fs = require(fs);
require("dotenv").config();
const cloudinaryConfig = require("../configs/cloudinary.config");

cloudinary.config(cloudinaryConfig);
//Upload to Cloudinary
const uploadToCloudinary = async (LocalFilePath) => {
  try {
    if (!fs.existsSync(LocalFilePath)) {
      console.log("File does not exist.");
      return;
    }
    const result = await cloudinary.v2.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });
    console.log("Upload Done to Cloudinary", result.url);
    return result.url;
  } catch (error) {
    fs.unlinkSync(LocalFilePath); //Delete Temp file from server if upload to cloudinary fails
    console.log(error);
    return (error = "Something went wrong while uploading to cloudinary");
  }
};

module.exports = uploadToCloudinary;
