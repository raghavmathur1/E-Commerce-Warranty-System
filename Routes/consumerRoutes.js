const express = require("express");
const router = express.Router();
const globalRoutes = require("./globalRoutes");

//Import functions from controller
const { consumerSignup, consumerLogin } = require("../Controllers/consumer");

//Assigning routes
router.route(globalRoutes.signup).post(consumerSignup);
router.route(globalRoutes.login).post(consumerLogin);

module.exports = router;
