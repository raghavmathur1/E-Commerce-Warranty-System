const express = require("express");
const router = express.Router();
const { consumer, retailer } = require("../globalRoutes");

const { consumerLogin, retailerLogin } = require("../../Controllers/Auth/login");

router.route(consumer).post(consumerLogin);
router.route(retailer).post(retailerLogin);

module.exports = router;
