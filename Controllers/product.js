const { json } = require("express");
const Product = require("../models/product");
const { sendError } = require("../Error/error");
/*
	@desc: Add Product 
	@access: Private
*/

exports.addProduct = async (req, res, next) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(200).json({
			success: true,
			message: "Product Added to DB",
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Product Add Error");
	}
};

/*

	@desc: Get Product by Id
	access: Private
*/
exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "All Product get Error");
	}
};

/*

	@desc: Get Products of Retailer
	access: Private
*/

exports.retailerProducts = async (req, res, next) => {
	try {
		console.log(req.params.id);
		const products = await Product.find();
		const result = products.filter(
			(product) =>
				JSON.stringify(product.retailer) ===
				JSON.stringify(req.params.id)
		);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		console.log(err);
		// sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};
