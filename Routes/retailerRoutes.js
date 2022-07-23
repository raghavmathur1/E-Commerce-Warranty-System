const express = require("express");
const router = express.Router();
const { signup, login } = require("./globalRoutes");

//Import functions from controller
const { retailerSignup, retailerLogin } = require("../Controllers/retailer");

//Assigning routes
router.route(signup).post(retailerSignup);
router.route(login).post(retailerLogin);

module.exports = router;
