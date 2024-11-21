const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  delFeatureImages
} = require("../../controller/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.post("/delete/:id", delFeatureImages);

module.exports = router;