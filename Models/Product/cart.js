const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	cartInfo: {
		type: String,
		default: "[]",
	},
});
module.exports = mongoose.model("cart", cartSchema);
