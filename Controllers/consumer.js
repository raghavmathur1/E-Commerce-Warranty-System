const Consumer = require("../Models/consumer");
const { sendError } = require("../Error/error");
const { encrypt } = require("../Helpers/helper");
const passport = require("passport");

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
exports.consumerLogin = async (req, res, next) => {
	try {
		passport.authenticate("consumer-local", (err, user, info) => {
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
