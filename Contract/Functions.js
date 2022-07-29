const Web3 = require("web3");
const logger = require("../Logger/logger");
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://ropsten.infura.io/v3/57fc0f558cbd4b8d9d83e2102577e744"
	)
);

exports.callWriteFunction = async (tx, contractAddress) => {
	console.log(process.env.NETWORK_ENTRY);
	try {
		// const gas = await tx.estimateGas({
		// 	from: process.env.FLIPKART_WALLET_ADDRESS,
		// });
		const gas = 500000;
		// const gasPrice = await web3.eth.getGasPrice();
		const gasPrice = 1000000000;
		const data = tx.encodeABI();
		const nonce = await web3.eth.getTransactionCount(
			process.env.FLIPKART_WALLET_ADDRESS
		);
		const networkId = await web3.eth.net.getId();
		const signedTx = await web3.eth.accounts.signTransaction(
			{
				to: contractAddress,
				data,
				gas,
				gasPrice,
				nonce,
				chainId: networkId,
			},
			process.env.FLIPKART_WALLET_PRIVATE_KEY
		);
		const receipt = await web3.eth.sendSignedTransaction(
			signedTx.rawTransaction
		);
		console.log(receipt);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
};

exports.callReadFunction = async (tx) => {
	try {
		const response = await tx.call({
			from: process.env.FLIPKART_WALLET_ADDRESS,
		});
		return response;
	} catch (err) {
		logger.error(err);
		return null;
	}
};
