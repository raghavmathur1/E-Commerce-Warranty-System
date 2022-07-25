const { json } = require("express");
const Product = require("../models/product");
const { sendError } = require("../Error/error");
const ipfsClient = require("ipfs-http-client");
const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;

/*
	@desc: Add Product 
	@access: Private
*/

exports.addProduct = async (req, res, next) => {
	try {
		const auth =
			"Basic " +
			Buffer.from(projectId + ":" + projectSecret).toString("base64");

		const client = ipfsClient.create({
			host: "ipfs.infura.io",
			port: 5001,
			protocol: "https",
			headers: {
				authorization: auth,
			},
		});
		// console.log(req.body);
		client.add(JSON.stringify(req.body)).then((res) => {
			console.log(res);
		});

		const product = new Product(req.body);
		await product.save();
		res.status(200).json({
			success: true,
			message: "Product Added to DB",
		});
	} catch (err) {
		console.log(err);
		// sendError(res, next, err, "Error", "Product Add Error");
	}
};

/*

	@desc: Get all Products
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
		sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};
