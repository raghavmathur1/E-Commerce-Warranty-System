const Product = require("../../models/Product/product");
const mongoose = require("mongoose");
const { sendError } = require("../../Error/error");
const { uploadMetadataToIPFS, uploadFileToIPFS } = require("../../Helper/ipfs");
const Vonage = require("@vonage/server-sdk");
const mailer = require("nodemailer");
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

const {
	productWarrantyContract,
	writeInWarrantyNFT,
	readInWarrantyNFT,
} = require("../../Contract/ProductWarranty/ProductWarrantyNFT");
const https = require("https");
const cartSchema = require("../../Models/Product/cart");
const retailerSchema = require("../../Models/Retailer/retailer");
const { response } = require("express");
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
		const productID = req.params.id;
		if (productID === null || productID === undefined) {
			return res.status(400).json({
				success: false,
				errMessage: "Product ID is required",
			});
		}
		// return res.status(200).json({});
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
		const retailerDetails = await retailerSchema.findById({
			_id: mongoose.Types.ObjectId(data.retailer),
		});

		return res.status(200).json({
			success: true,
			data: data,
			retailerDetail: retailerDetails,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};

/*
	@desc: Update the cart
	@access: Private
*/
exports.updateCart = async (req, res, next) => {
	try {
		const cartString = req.body.cartString;
		const consumerEmail = req.user.email;
		console.log(cartString);
		// console.log("Asd");
		//Save in the database
		let result = await cartSchema.findOne({ email: consumerEmail });
		if (!result) {
			const newCart = await cartSchema.create({
				email: consumerEmail,
				cartInfo: cartString,
			});
			await newCart.save();
			console.log(newCart);
		} else {
			const newCart = await cartSchema.findOneAndUpdate(
				{ email: consumerEmail },
				{ cartInfo: cartString },
				{
					new: true,
				}
			);
			console.log(newCart);
		}

		return res.status(200).json({
			success: true,
			message: "Cart updated successfully",
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Updating cart error");
	}
};
/*
	@desc: Get the cart string
	@access: Private
*/
exports.getCartInfo = async (req, res, next) => {
	try {
		let cartString = await cartSchema.findOne({ email: req.user.email });
		let finalString = cartString === null ? "[]" : cartString.cartInfo;
		return res.status(200).json({
			success: true,
			message: "Cart string fetched successfully!",
			data: finalString,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Error fetching cart details!");
	}
};
/*
	@desc: Buy a product
	@access: Private
*/

exports.buyProduct = async (req, res, next) => {
	try {
		const { productID, price } = req.body;
		const consumerEmail = req.user.email;
		const retailerEmail = await readInProductNFT(
			productNFTContract.methods.getProductRetailerEmail(productID)
		);
		
		const vonage = new Vonage({
			apiKey: process.env.VONAGE_API_KEY,
			apiSecret: process.env.VONAGE_SECRET,
		});
		const from = "Vonage APIs";
		const to = "917903966014";
		const text =
			"PLEASE DO NOT SHARE THIS!.Your warrany id is 90880. The digital version of it is send to you in mail.  You can check it in your dashboard by searching with the warranty Id";
		let smtpProtocol = mailer.createTransport({
			host: "smtp.sendgrid.net",
			port: 587,
			auth: {
				user: "apikey",
				pass: "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",
			},
		});

		var mailoption = {
			from: "raghav3501@gmail.com",
			to: "aadityapal.info@gmail.com",
			subject: "Test Mail",
			html: "Good Morning!",
		};
		smtpProtocol.sendMail(mailoption, function (err, response) {
			if (err) {
				throw err;
				console.log(err);
			}
			console.log("Message Sent" + response.message);
			smtpProtocol.close();
		});
		// vonage.message.sendSms(from, to, text, (err, responseData) => {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		if (responseData.messages[0]["status"] === "0") {
		// 			console.log("Message sent successfully.");
		// 		} else {
		// 			console.log(
		// 				`Message failed with error: ${responseData.messages[0]["error-text"]}`
		// 			);
		// 		}
		// 	}
		// });

		// //Issue the warranty of the product first
		// await writeInWarrantyNFT(
		// 	productWarrantyContract.methods.issueWarranty(
		// 		productID,
		// 		consumerEmail,
		// 		365
		// 	)
		// );
		// //call the buy function into the product marketplace
		// await writeInMarket(
		// 	marketContract.methods.buyProduct(
		// 		productID,
		// 		retailerEmail,
		// 		consumerEmail,
		// 		price,
		// 		price
		// 	)
		// );
		return res.status(200).json({
			success: true,
			message: "Product buying successfull!",
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Error buying a product!");
	}
};
