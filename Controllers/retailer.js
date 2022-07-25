const { sendError } = require("../Error/error");
const passport = require("passport");
const Retailer = require("../Models/retailer");
/*
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
