const express = require("express");

const { searchProducts } = require("../../controller/shop-contoller/search-controller");

const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;