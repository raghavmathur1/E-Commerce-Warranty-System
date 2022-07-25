const { sendError } = require("../Error/error");
const passport = require("passport");

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

/*
	@desc: Login For Retailer
	@access: Private
*/
exports.retailerLogin = async (req, res, next) => {
	console.log(req.body);

	try {
		passport.authenticate("retailer-local", (err, user) => {
			if (err) throw err;
			if (!user) return sendError(res, next, err, "Error in retailerLogin function", "Invalid credentials");
			else {
				req.logIn(user, (err) => {
					if (err) throw err;
					return res.status(200).json({
						success: true,
						message: "Login sucessfull!",
						errMsg: "",
					});
				});
			}
		})(req, res, next);
	} catch (err) {
		sendError(res, next, err, "Error", "Login Error");
	}
};
