const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

// Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDNINARY_CNAME,
  api_key: process.env.CLOUDNINARY_SKEY,
  api_secret: process.env.CLOUDNINARY_SCODE, // Click 'View API Keys' above to copy your API secret
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
