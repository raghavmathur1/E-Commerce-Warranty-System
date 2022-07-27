const Consumer = require("../../Models/Consumer/consumer");
const Retailer = require("../../Models/Retailer/retailer");
const { sendError } = require("../../Error/error");
const { encrypt } = require("../../Helper/auth");
const {
	writeInMarket,
	readInMarket,
	marketContract,
} = require("../../Contract/MarketPlace/MarketPlace");
/*
	@desc: Signup For Consumers
	@access: Private
*/
exports.consumerSignup = async (req, res, next) => {
	try {
		Consumer.findOne(
			{ email: req.body.email },
			async function (err, consumer) {
				if (err) {
					return done(err);
				}
				if (!consumer) {
					req.body.password = await encrypt(req.body.password);
					new Consumer(req.body).save();
					//Save to the blockchain
					//Save to blockchain
					await writeInMarket(
						marketContract.methods.registerCustomer(req.body.email)
					);
					res.status(200).json({
						success: true,
						message: "Added to DB",
					});
				} else {
					res.status(409).send({
						success: false,
						message: "User Already Exists",
					});
				}
			}
		);
	} catch (err) {
		sendError(res, next, err, "Error", "Sign Up Error");
	}
};

/*
	@desc: Signup For Retailers
	@access: Private
*/
exports.retailerSignup = async (req, res, next) => {
	try {
		Retailer.findOne(
			{ email: req.body.email },
			async function (err, consumer) {
				if (err) {
					return done(err);
				}
				if (!consumer) {
					req.body.password = await encrypt(req.body.password);
					new Retailer(req.body).save();

					//Save to blockchain
					await writeInMarket(
						marketContract.methods.registerRetailer(req.body.email)
					);
					res.status(200).json({
						success: true,
						message: "Retailer registered successfully!",
					});
				} else {
					res.status(409).send({
						success: false,
						message: "User Already Exists",
					});
				}
			}
		);
	} catch (err) {
		sendError(res, next, err, "Error", "Sign Up Error");
	}
};
