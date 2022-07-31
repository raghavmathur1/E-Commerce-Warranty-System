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
const consumerSchema = require("../../Models/Consumer/consumer");
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
	@desc: Update a product 
	@access: Private
*/

exports.updateProduct = async (req, res, next) => {
	try {
		console.log("reaching");
		//Fetch the productID
		const productID = req.params.id;
		let fileURL, productInfo, productURL;

		//Fetch the productInfo
		productInfo = req.body;
		if (req.files != null && req.files.file != null) {
			fileURL = await uploadFileToIPFS(req.files.file);
			productInfo["fileURl"] = fileURL;
		}

		//Add product meta data to ipfs
		productURL = await uploadMetadataToIPFS(productInfo);

		//Update the product in the blockchain
		await writeInProductNFT(
			productNFTContract.methods.updateProductDetails(
				productID,
				productURL,
				req.user.email
			)
		);

		return res.status(200).json({
			success: true,
			message: "Product details updated successfully!",
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error in updateProduct function",
			"Error updating product details. Please try again!"
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
		const productDetails = req.body.data;
		for (let i = 0; i < productDetails.length; i++) {
			const { productId, retailerEmail, price } = productDetails[i];
			const consumerEmail = req.user.email;
			console.log(
				productId,
				retailerEmail,
				parseInt(price),
				consumerEmail
			);
			//Issue the warranty of the product first
			await writeInWarrantyNFT(
				productWarrantyContract.methods.issueWarranty(
					productId,
					consumerEmail,
					365
				)
			);
			//Get the warranty ID
			const warranty = await readInWarrantyNFT(
				productWarrantyContract.methods.getWarrantyAgainstProductID(
					productId
				)
			);
			const warrantyID = warranty[0];
			//call the buy function into the product marketplace
			await writeInMarket(
				marketContract.methods.buyProduct(
					productId,
					retailerEmail,
					consumerEmail,
					price,
					price
				)
			);
			const vonage = new Vonage({
				apiKey: process.env.VONAGE_API_KEY,
				apiSecret: process.env.VONAGE_SECRET,
			});
			const from = "Vonage APIs";
			const to = "917903966014";
			const text = `PLEASE DO NOT SHARE THIS!.Your warrany Details are: Warranty Id: ${warranty[0]}, Product Id: ${warranty[1]}, Duration: ${warranty[2]} Days, Retailer Email: ${retailerEmail} Days. The digital version of it is send to you in mail.  You can check it in your dashboard by searching with the warranty Id`;
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
				to: "raghavmath3501@gmail.com",
				subject: "Warranty Mail",
				html: `<div>
				<h1>PLEASE DO NOT SHARE THIS!</h1>
				Your Warranty Details are: 
				<br>
					Warranty Id: ${warranty[0]}<br>
					Product Id: ${warranty[1]}<br>
					Warranty Duration: ${warranty[2]} Days<br>
					Retailer Email: ${retailerEmail}<br>
				</div>
				`,
			};
			smtpProtocol.sendMail(mailoption, function (err, response) {
				if (err) {
					throw err;
					console.log(err);
				}
				console.log("Message Sent" + response.message);
				smtpProtocol.close();
			});
			vonage.message.sendSms(from, to, text, (err, responseData) => {
				if (err) {
					console.log(err);
				} else {
					if (responseData.messages[0]["status"] === "0") {
						console.log("Message sent successfully.");
					} else {
						console.log(
							`Message failed with error: ${responseData.messages[0]["error-text"]}`
						);
					}
				}
			});
		}

		return res.status(200).json({
			success: true,
			message: "Product buying successfull!",
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Error buying a product!");
	}
};
/*
	@desc: Get all products of a user
	@access: Private
*/
exports.getAllUserProducts = async (req, res, next) => {
	try {
		const consumerEmail = req.user.email;
		const consumerProducts = await readInMarket(
			marketContract.methods.getCustomerProduct(consumerEmail)
		);
		const data = [];
		for (let i = 0; i < consumerProducts.length; i++) {
			const productData = await readInProductNFT(
				productNFTContract.methods.getProductDetailsURL(
					consumerProducts[i]
				)
			);

			await new Promise((resolve, reject) => {
				https
					.get(productData.productURL, function (res) {
						var body = "";

						res.on("data", function (chunk) {
							body += chunk;
						});

						res.on("end", async () => {
							var res = JSON.parse(body);
							const retailer = await retailerSchema.findById({
								_id: mongoose.Types.ObjectId(res.retailer),
							});
							data.push({
								data: res,
								productID: consumerProducts[i],
								retailer: retailer,
							});
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
	} catch (error) {
		sendError(res, next, err, "Error", "Error in fetching user product!");
	}
};

/* 
	@desc: Get warranty of a product
	@access: Private
*/
exports.getAllWarranty = async (req, res, next) => {
	try {
		const consumerEmail = req.user.email;
		const consumerProducts = await readInMarket(
			marketContract.methods.getCustomerProduct(consumerEmail)
		);
		const data = [];
		for (let i = 0; i < consumerProducts.length; i++) {
			const productData = await readInProductNFT(
				productNFTContract.methods.getProductDetailsURL(
					consumerProducts[i]
				)
			);
			const warrantyDetails = await readInWarrantyNFT(
				productWarrantyContract.methods.getWarrantyAgainstProductID(
					consumerProducts[i]
				)
			);
			await new Promise((resolve, reject) => {
				https
					.get(productData.productURL, function (res) {
						var body = "";

						res.on("data", function (chunk) {
							body += chunk;
						});

						res.on("end", async () => {
							var res = JSON.parse(body);
							const retailer = await retailerSchema.findById({
								_id: mongoose.Types.ObjectId(res.retailer),
							});
							data.push({
								data: res,
								productID: consumerProducts[i],
								retailer: retailer,
								warranty: warrantyDetails,
							});
							resolve("Success");
						});
					})
					.on("error", function (e) {});
			});
		}
		return res.status(200).json({
			success: true,
			data: data,
		});
	} catch (error) {
		sendError(
			res,
			next,
			err,
			"Error",
			"Error in fetching productWarranty!"
		);
	}
};

/* 
	@desc: Get warranty for a particular ID
	@access: Private
*/
exports.getWarrantyById = async (req, res, next) => {
	try {
		const productID = req.params.id;
		const productData = await readInProductNFT(
			productNFTContract.methods.getProductDetailsURL(productID)
		);

		const warrantyDetails = await readInWarrantyNFT(
			productWarrantyContract.methods.getWarrantyAgainstProductID(
				productID
			)
		);
		console.log(warrantyDetails);
		let data = null;
		await new Promise((resolve, reject) => {
			https
				.get(productData.productURL, function (res) {
					var body = "";

					res.on("data", function (chunk) {
						body += chunk;
					});

					res.on("end", async () => {
						var res = JSON.parse(body);
						const retailer = await retailerSchema.findById({
							_id: mongoose.Types.ObjectId(res.retailer),
						});

						(data = {
							data: res,
							productID: productID,
							retailer: retailer,
							warranty: warrantyDetails,
						}),
							resolve("Success");
					});
				})
				.on("error", function (e) {});
		});
		return res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error",
			"Error in fetching productWarranty!"
		);
	}
};

/* 
	@desc: Transfer a product from one person to another
	@access: Private
*/

exports.transferProduct = async (req, res, next) => {
	try {
		//Fetch the from and to emails
		const fromEmail = req.user.email;
		const toEmail = req.body.toEmail;
		const productID = req.body.productID;
		const consumer = await consumerSchema.findOne({
			email: toEmail,
		});
		if (!consumer) {
			return res.status(400).json({
				success: false,
				message: "Consumer not found!",
			});
		}
		//Fetch warranty ID from productID
		const warranty = await readInWarrantyNFT(
			productWarrantyContract.methods.getWarrantyAgainstProductID(
				productID
			)
		);
		console.log(warranty[0]);
		//Transfer from the market first
		const result = await writeInMarket(
			marketContract.methods.transferProduct(
				fromEmail,
				toEmail,
				productID
			)
		);
		console.log(result);
		if (!result) throw new Error("Execution Reverted");
		//Transfer the warranty NFT
		await writeInWarrantyNFT(
			productWarrantyContract.methods.changeWarrantyOwner(
				warranty[0],
				fromEmail,
				toEmail
			)
		);
		//return response
		return res.status(200).json({
			success: true,
			message: "Product exchanged successfully!",
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Error in transfering warranty!");
	}
};

/* 
	@desc: Get warranty for a productID
	@access: Private
*/
exports.getWarrantyByProductID = async (req, res, next) => {
	try {
		const productID = req.params.id;

		//Fetch the warranty
		const warranty = await readInWarrantyNFT(
			productWarrantyContract.methods.getWarrantyAgainstProductID(
				productID
			)
		);
		if (warranty[3] != req.user.email) {
			return res.status(401).json({
				success: false,
				data: false,
				message: "You don't own this product!",
			});
		}
		//Check if warranty is valid or not
		const isValidWarranty = await readInWarrantyNFT(
			productWarrantyContract.methods.isExpired(warranty[0])
		);

		return res.status(200).json({
			success: true,
			data: isValidWarranty,
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error",
			"Error in fetching productWarranty!"
		);
	}
};
