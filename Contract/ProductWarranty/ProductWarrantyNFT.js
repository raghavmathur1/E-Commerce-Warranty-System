const Web3 = require("web3");
const logger = require("../../Logger/logger");
const { callWriteFunction, callReadFunction } = require("../Functions");
const {
	PRODUCT_WARRANTY_ADDRESS,
	PRODUCT_WARRANTY_ABI,
} = require("./ContractDetails");
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://ropsten.infura.io/v3/57fc0f558cbd4b8d9d83e2102577e744"
	)
);

exports.productWarrantyContract = new web3.eth.Contract(
	PRODUCT_WARRANTY_ABI,
	PRODUCT_WARRANTY_ADDRESS
);

exports.writeInWarrantyNFT = async (tx) => {
	try {
		const res = await callWriteFunction(tx, PRODUCT_WARRANTY_ADDRESS);
		return res;
	} catch (error) {
		logger.error(error);
		return false;
	}
};
exports.readInWarrantyNFT = async (tx) => {
	try {
		const res = await callReadFunction(tx);
		return res;
	} catch (error) {
		logger.error(error);
		return null;
	}
};
