const express = require("express");
const router = express.Router();
const globalRoutes = require("./globalRoutes");

//Import functions from controller
const { data } = require("../Controllers/userController");

//Assigning routes
router.route(globalRoutes.homeRoute).get(data);

module.exports = router;
