const bcrypt = require("bcrypt");

const encrypt = async (text) => {
	const salt = await bcrypt.genSalt(10);
	const hashedText = await bcrypt.hash(text, salt);
	return hashedText;
};

const checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
};6

const checkAuthenticatedConsumer = (req, res, next) => {
	if (req.isAuthenticated() && req.user.type === "consumer") {
		return next();
	}
};

const checkAuthenticatedRetailer = (req, res, next) => {
	if (req.isAuthenticated() && req.user.type === "retailer") {
		return next();
	}
};

module.exports = {
	encrypt,
	checkAuthenticatedConsumer,
	checkAuthenticatedRetailer,
	checkAuthenticated,
};
