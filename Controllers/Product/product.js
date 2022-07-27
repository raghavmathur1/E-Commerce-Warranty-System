const Product = require("../../models/Product/product");
const { sendError } = require("../../Error/error");
const { uploadMetadataToIPFS, uploadFileToIPFS } = require("../../Helper/ipfs");
const {
	productNFTContract,
	writeInProductNFT,
	readInProductNFT,
} = require("../../Contract/ProductNFT/ProductNFT");
const {
	marketContract,
	writeInMarket,
	readInMarket,
} = require("../../Contract/MarketPlace/MarketPlace");
const https = require("https");
const product = require("../../models/Product/product");
/*
	@desc: Add Product 
	@access: Private
*/

exports.addProduct = async (req, res, next) => {
	try {
		const fileURL = await uploadFileToIPFS(req.files.file);
		const productInfo = req.body;
		productInfo["fileURl"] = fileURL;

		//Add product meta data to ipfs
		const productURL = await uploadMetadataToIPFS(productInfo);
		console.log(productURL);
		//Register the product in the blockchain
		await writeInProductNFT(
			productNFTContract.methods.introduceProduct(
				productURL,
				req.user.email
			)
		);
		//Get the product id
		const productID = await readInProductNFT(
			productNFTContract.methods.getProductID(productURL.toString())
		);
		console.log(productID, req.user.email);
		//Register the product to the retailer and market in blockchain
		await writeInMarket(
			marketContract.methods.addProductToRetailer(
				productID,
				req.user.email
			)
		);

		return res.status(200).json({
			success: true,
			message: "Product details uploaded successfully!",
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error in addProduct function",
			"Error uploading product details. Please try again!"
		);
	}
};

/*
	@route: 
	@desc: Get all Products available in the market
	access: Private
*/
exports.getAllProducts = async (req, res, next) => {
	try {
		const result = await readInMarket(
			marketContract.methods.getMarketProducts()
		);
		//Get all the data from url
		const data = [];
		for (var i = 0; i < result.length; i++) {
			const productData = await readInProductNFT(
				productNFTContract.methods.getProductDetailsURL(result[i])
			);
			await new Promise((resolve, reject) => {
				https
					.get(productData.productURL, function (res) {
						var body = "";

						res.on("data", function (chunk) {
							body += chunk;
						});

						res.on("end", function () {
							var res = JSON.parse(body);
							data.push({ data: res, productID: result[i] });
							resolve("Success");
						});
					})
					.on("error", function (e) {});
			});
		}
		console.log(data);
		return res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "All Product get Error");
	}
};

/*
	@route: 
	@desc: Get Products of Retailer
	access: Private
*/

exports.retailerProducts = async (req, res, next) => {
	try {
		//Read the products from the blockchain
		const result = await readInMarket(
			marketContract.methods.getRetailerProduct(req.user.email)
		);

		//Get all the data from url
		const data = [];
		for (var i = 0; i < result.length; i++) {
			const productData = await readInProductNFT(
				productNFTContract.methods.getProductDetailsURL(result[i])
			);
			await new Promise((resolve, reject) => {
				https
					.get(productData.productURL, function (res) {
						var body = "";

						res.on("data", function (chunk) {
							body += chunk;
						});

						res.on("end", function () {
							var res = JSON.parse(body);
							data.push({ data: res, productID: result[i] });
							resolve("Success");
						});
					})
					.on("error", function (e) {});
			});
		}
		console.log(data);
		res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};

/*
	@desc: Get Product detail using productID
	access: Private
*/

exports.getProductByID = async (req, res, next) => {
	try {
		console.log("Reaching here");
		const productID = req.params.id;
		//Fetch the product details from the blockchain
		const productData = await readInProductNFT(
			productNFTContract.methods.getProductDetailsURL(productID)
		);

		let data;
		await new Promise((resolve, reject) => {
			https
				.get(productData.productURL, function (res) {
					var body = "";

					res.on("data", function (chunk) {
						body += chunk;
					});

					res.on("end", function () {
						var res = JSON.parse(body);
						data = res;
						resolve("Success");
					});
				})
				.on("error", function (e) {
					throw e;
				});
		});
		console.log(data);
		return res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};
