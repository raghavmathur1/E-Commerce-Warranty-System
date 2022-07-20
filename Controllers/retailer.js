const Retailer = require("../Models/retailer");
const { sendError } = require("../Error/error");
const { encrypt } = require("../Helpers/helper");
const passport = require("passport");

/*
	@desc: Signup For Consumers
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
	@desc: Login For Consumers
	@access: Private
*/
exports.retailerLogin = async (req, res, next) => {
	try {
		// console.log(req.body);
		passport.authenticate("retailer-local", (err, user, info) => {
			// console.log(err, user, info);
			if (err) {
				throw err;
			}
			if (!user) res.send(false);
			else {
				req.logIn(user, (err) => {
					if (err) throw err;
					res.send(true);
				});
			}
		})(req, res, next);
	} catch (err) {
		sendError(res, next, err, "Error", "Login Error");
	}
};
