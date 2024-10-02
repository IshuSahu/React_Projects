const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

// Configuration

cloudinary.config({
  cloud_name: "dmydqnu8p",
  api_key: "187843464941464",
  api_secret: 'XH2Pvki30eT34je32nxBqqhuz_g' // Click 'View API Keys' above to copy your API secret
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
