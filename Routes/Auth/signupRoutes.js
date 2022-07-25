const express = require("express");
const router = express.Router();
const { consumer, retailer } = require("../globalRoutes");

const { retailerSignup, consumerSignup } = require("../../Controllers/Auth/signup");

router.route(retailer).post(retailerSignup);
router.route(consumer).post(consumerSignup);

module.exports = router;
