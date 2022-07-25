const Consumer = require("../../Models/Consumer/consumer");
const { sendError } = require("../../Error/error");
const { encrypt } = require("../../Helper/auth");
const passport = require("passport");

/*
	@desc: Update Consumer Profile
	@access: Private
*/

exports.updateConsumerProfile = async (req, res, next) => {
	try {
		const consumer = await Consumer.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: consumer,
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error in updateConsumerProfile",
			"Update Profile Error"
		);
	}
};
