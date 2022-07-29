const logger = require("../Logger/logger");
//Custom module for handling errors
exports.sendError = async (res, next, err, consoleMsg, errMsg) => {
	logger.error(new Error(err));
	logger.error(consoleMsg);
	return res.status(400).json({
		success: false,
		message: "",
		errMsg: errMsg
	});
};
