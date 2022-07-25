const mongoose = require("mongoose");
const { Schema } = mongoose;
const retailerSchema = new Schema({
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		unique: true,
	},
	phone: {
		type: String,
		required: false,
		unique: false,
	},
	pincode: {
		type: String,
		required: false,
		unique: false,
	},
	city: {
		type: String,
		required: false,
		unique: false,
	},
	gst: {
		type: String,
		required: false,
		unique: false,
	},
	pan: {
		type: String,
		required: false,
		unique: false,
	},
	password: {
		type: String,
		required: false,
		default: "",
	},
	type: {
		type: String,
		required: false,
		default: "retailer",
	},
});
module.exports = mongoose.model("retailer", retailerSchema);
