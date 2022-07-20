const express = require("express");
const router = express.Router();
const globalRoutes = require("./globalRoutes");

//Import functions from controller
const { getData, logout } = require("../Controllers/user");

//Assigning routes
router.route(globalRoutes.userData).get(getData);
router.route(globalRoutes.logout).get(logout);

module.exports = router;
