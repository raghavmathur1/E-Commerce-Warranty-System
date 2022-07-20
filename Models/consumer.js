const mongoose = require("mongoose");
const { Schema } = mongoose;
const consumerSchema = new Schema({
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
	address: {
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
	password: {
		type: String,
		required: false,
		default: "",
	},
	type: {
		type: String,
		required: false,
		default: "consumer",
	},
});
module.exports = mongoose.model("consumer", consumerSchema);
