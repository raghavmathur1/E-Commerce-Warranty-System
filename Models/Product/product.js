const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
	productName: {
		type: String,
		required: false,
	},
	serialNo: {
		type: String,
		required: false,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: false,
	},
	discount: {
		type: Number,
		required: false,
	},
	warranty: {
		type: String,
		required: false,
	},
	file: {
		type: String,
		required: false,
		unique: false,
	},
	fileName: {
		type: String,
		required: false,
		unique: false,
	},
	retailer: {
		type: Schema.Types.ObjectId,
		ref: "Retailer",
		required: false,
	},
});
module.exports = mongoose.model("product", productSchema);
