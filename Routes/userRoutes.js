const express = require("express");
const router = express.Router();
const { userData, logout } = require("./globalRoutes");

//Import functions from controller
const { getData, logoutFunc } = require("../Controllers/user");

//Assigning routes
router.route(userData).get(getData);
router.route(logout).get(logoutFunc);

module.exports = router;
