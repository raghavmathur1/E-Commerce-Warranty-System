const express = require("express");
const router = express.Router();
const { update, id } = require("../globalRoutes");

//Import functions from controller
const { updateRetailerProfile } = require("../../Controllers/Retailer/retailer");
const { checkAuthenticatedRetailer } = require("../../Helper/auth");
//Assigning routes to functions

router
	.route(update + id)
	.put(checkAuthenticatedRetailer, updateRetailerProfile);
module.exports = router;
