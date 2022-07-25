const Product = require("../../models/Product/product");
const { sendError } = require("../../Error/error");
const { uploadMetadataToIPFS, uploadFileToIPFS } = require("../../Helper/ipfs");
/*
	@desc: Add Product 
	@access: Private
*/

exports.addProduct = async (req, res, next) => {
	try {
		const fileURL = await uploadFileToIPFS(req.files.file);
		console.log(fileURL);
		const productInfo = req.body;
		productInfo["fileURl"] = fileURL;

		//Add product meta data to ipfs
		const productURL = await uploadMetadataToIPFS(productInfo);
		console.log(productURL);
		//const product = new Product(req.body);
		//await product.save();
		return res.status(200).json({
			success: true,
			message: "Product details uploaded successfully!",
		});
	} catch (err) {
		sendError(
			res,
			next,
			err,
			"Error in addProduct function",
			"Error uploading product details. Please try again!"
		);
	}
};

/*
	@route: 
	@desc: Get all Products available in the market
	access: Private
*/
exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "All Product get Error");
	}
};

/*
	@route: 
	@desc: Get Products of Retailer
	access: Private
*/

exports.retailerProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		const result = products.filter(
			(product) =>
				JSON.stringify(product.retailer) ===
				JSON.stringify(req.params.id)
		);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		sendError(res, next, err, "Error", "Retailer Product get Error");
	}
};
