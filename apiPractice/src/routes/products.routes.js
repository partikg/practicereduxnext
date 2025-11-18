const express = require("express");
const router = express.Router();
const { getProductsByCategory } = require("../controllers/products.controller");
const { createProduct } = require("../controllers/products.controller");

router.get("/category/:slug", getProductsByCategory);
router.post("/create", createProduct);

module.exports = router;
