const express = require("express");
const router = express.Router();
const { all, add, retmy, id } = require("./globalRoutes");
const passport = require("passport");
const {
	checkAuthenticatedRetailer,
	checkAuthenticated,
} = require("../helpers/helper");
//Import functions from controller
const {
	addProduct,
	getAllProducts,
	retailerProducts,
} = require("../Controllers/product");

//Assigning routes
router.route(add).post(checkAuthenticatedRetailer, addProduct);
router.route(all).get(getAllProducts);
router.route(retmy + id).get(checkAuthenticatedRetailer, retailerProducts);

module.exports = router;
