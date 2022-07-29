const { sendError } = require("../../Error/error");
const passport = require("passport");
const Retailer = require("../../Models/Retailer/retailer");
const https = require("https");
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
/*
	@route: 
	@desc: Update Retailer Profile
	@access: Private
*/

exports.updateRetailerProfile = async (req, res, next) => {
	try {
		const retailer = await Retailer.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: retailer,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Update Profile Error");
	}
};
/*
	@route:
	@desc: get retailer bank balance
*/
exports.getRetailerBankBalance = async (req, res, next) => {
	try {
		const retailerEmail = req.user.email;

		//Fetch the balance
		const balance = await readInMarket(
			marketContract.methods.getRetailerBankBalance(retailerEmail)
		);

		return res.status(200).json({
			success: true,
			data: balance,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Error fetching bank balance");
	}
};

/*
	@route:
	@desc: get retailer transactions
*/
exports.getRetailerTransaction = async (req, res, next) => {
	try {
		const retailerEmail = req.user.email;

		//Fetch the transactions from retailer
		const transactions = await readInMarket(
			marketContract.methods.getRetailerTransactions(retailerEmail)
		);
		const data = [];
		for (var i = 0; i < transactions.length; i++) {
			//Fetch the product detail from http
			const productData = await readInProductNFT(
				productNFTContract.methods.getProductDetailsURL(
					transactions[i].productID
				)
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
							data.push({
								productID: transactions[i].productID,
								productDetails: res,
								amount: transactions[i].amount,
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
	} catch (err) {
		sendError(res, next, err, "Error", "Error fetching trasaction!");
	}
};
