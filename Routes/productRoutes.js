const express = require("express");
const router = express.Router();
const { all, add, retmy, id } = require("./globalRoutes");

//Import functions from controller
const {
	addProduct,
	getAllProducts,
	retailerProducts,
} = require("../Controllers/product");

//Assigning routes
router.route(add).post(addProduct);
router.route(all).get(getAllProducts);
router.route(retmy + id).get(retailerProducts);

module.exports = router;
