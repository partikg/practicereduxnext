const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

router.post("/placeorder", ordersController.placeorder);
router.post("/confirmorder", ordersController.confirmorder);

module.exports = router;
