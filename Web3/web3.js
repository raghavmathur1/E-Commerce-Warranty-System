const Web3 = require("web3");
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		process.env.NETWORK_ENTRY + process.env.INFURA_API_KEY
	)
);


module.export = web3;
