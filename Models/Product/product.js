const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
	productID: {
		type: Number,
		required: true,
	},
});
module.exports = mongoose.model("product", productSchema);
