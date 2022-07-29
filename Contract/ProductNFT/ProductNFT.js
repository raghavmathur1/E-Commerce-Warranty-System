const Web3 = require("web3");
const logger = require("../../Logger/logger");
const { callWriteFunction, callReadFunction } = require("../Functions");
const {
	PRODUCTNFT_CONTRACT_ADDRESS,
	PRODUCTNFT_CONTRACT_ABI,
} = require("./ContractDetails");
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://ropsten.infura.io/v3/57fc0f558cbd4b8d9d83e2102577e744"
	)
);

exports.productNFTContract = new web3.eth.Contract(
	PRODUCTNFT_CONTRACT_ABI,
	PRODUCTNFT_CONTRACT_ADDRESS
);

exports.writeInProductNFT = async (tx) => {
	try {
		const res = await callWriteFunction(tx, PRODUCTNFT_CONTRACT_ADDRESS);
		return res;
	} catch (error) {
		logger.error(error);
		return false;
	}
};
exports.readInProductNFT = async (tx) => {
	try {
		const res = await callReadFunction(tx);
		return res;
	} catch (error) {
		logger.error(error);
		return null;
	}
};
