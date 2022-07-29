const Web3 = require("web3");
const logger = require("../../Logger/logger");
const { callWriteFunction, callReadFunction } = require("../Functions");
const { MARKET_PLACE_ADDRESS, MARKET_PLACE_ABI } = require("./ContractDetails");
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://ropsten.infura.io/v3/57fc0f558cbd4b8d9d83e2102577e744"
	)
);

exports.marketContract = new web3.eth.Contract(
	MARKET_PLACE_ABI,
	MARKET_PLACE_ADDRESS
);

exports.writeInMarket = async (tx) => {
	try {
		console.log("Reaching here");
		const res = await callWriteFunction(tx, MARKET_PLACE_ADDRESS);
		return res;
	} catch (error) {
		console.log("Error in write market");
		console.log(error);
		return false;
	}
};
exports.readInMarket = async (tx) => {
	try {
		const res = await callReadFunction(tx);
		return res;
	} catch (error) {
		logger.error(error);
		return null;
	}
};
