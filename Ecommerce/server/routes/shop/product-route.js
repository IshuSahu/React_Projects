const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controller/shop-contoller/product-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
    
module.exports = router;
