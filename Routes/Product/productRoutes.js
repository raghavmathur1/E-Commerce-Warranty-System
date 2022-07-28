const express = require("express");
const router = express.Router();
const {
	all,
	add,
	retmy,
	id,
	product,
	updateCartRoute,
	getCartRoute,
	details,
	buyProductRoute,
	getUserProducts,
	getAllWarrantyRoute,
} = require("../globalRoutes");
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
	updateCart,
	getCartInfo,
	buyProduct,
	getAllUserProducts,
	getAllWarranty,
} = require("../../Controllers/Product/product");

//Assigning routes
router.route(add).post(checkAuthenticatedRetailer, addProduct);
router.route(all).get(getAllProducts);
router.route(retmy + id).get(checkAuthenticatedRetailer, retailerProducts);
router.route(details + id).get(getProductByID);
router.route(updateCartRoute).post(updateCart);
router.route(getCartRoute).get(getCartInfo);
router.route(buyProductRoute).post(buyProduct);
router.route(getUserProducts).get(getAllUserProducts);
router.route(getAllWarrantyRoute).get(getAllWarranty);

module.exports = router;
