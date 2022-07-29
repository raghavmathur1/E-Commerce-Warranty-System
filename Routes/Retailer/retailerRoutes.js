const express = require("express");
const router = express.Router();
const { update, id, getBalance, getTransactions } = require("../globalRoutes");

//Import functions from controller
const {
	updateRetailerProfile,
	getRetailerBankBalance,
	getRetailerTransaction,
} = require("../../Controllers/Retailer/retailer");
const { checkAuthenticatedRetailer } = require("../../Helper/auth");
//Assigning routes to functions

router
	.route(update + id)
	.put(checkAuthenticatedRetailer, updateRetailerProfile);
router
	.route(getBalance)
	.get(checkAuthenticatedRetailer, getRetailerBankBalance);
router
	.route(getTransactions)
	.get(checkAuthenticatedRetailer, getRetailerTransaction);
module.exports = router;
