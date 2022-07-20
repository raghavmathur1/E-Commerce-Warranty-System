const express = require("express");
const router = express.Router();
const globalRoutes = require("./globalRoutes");

//Import functions from controller
const { retailerSignup, retailerLogin } = require("../Controllers/retailer");

//Assigning routes
router.route(globalRoutes.signup).post(retailerSignup);
router.route(globalRoutes.login).post(retailerLogin);

module.exports = router;
