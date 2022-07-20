const { sendError } = require("../Error/error");
/*
	@desc: Get Data of user Logged In
	@access: Private
*/
exports.getData = async (req, res, next) => {
	try {
		res.status(200).send(req.user);
	} catch (err) {
		sendError(res, next, err, "Error", "Login Error");
	}
};

/*
	@desc: Logout from application
	@access: Private
*/
exports.logout = async (req, res, next) => {
	try {
		req.logout();
		res.redirect(host + "/");
	} catch (err) {
		res.json(err);
	}
};
