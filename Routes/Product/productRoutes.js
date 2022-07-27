const express = require("express");
const router = express.Router();
const { all, add, retmy, id, product } = require("../globalRoutes");
const passport = require("passport");
const {
	checkAuthenticatedRetailer,
	checkAuthenticated,
	checkAuthenticatedConsumer,
} = require("../../Helper/auth");
//Import functions from controller
const {
	addProduct,
	getAllProducts,
	retailerProducts,
	getProductByID,
} = require("../../Controllers/Product/product");

//Assigning routes
router.route(add).post(checkAuthenticatedRetailer, addProduct);
router.route(all).get(getAllProducts);
router.route(retmy + id).get(checkAuthenticatedRetailer, retailerProducts);
router.route(id).get(getProductByID);

module.exports = router;
