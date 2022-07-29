const { sendError } = require("../../Error/error");
const passport = require("passport");

/*	
	@route: Public
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
	@route: Public
	@desc: Login For Retailer
	@access: Private
*/
exports.retailerLogin = async (req, res, next) => {
	try {
		passport.authenticate("retailer-local", (err, user, info) => {
			if (err) throw err;
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
