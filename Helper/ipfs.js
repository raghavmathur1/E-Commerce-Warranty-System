const logger = require("../Logger/logger");

const ipfsClient = require("ipfs-http-client");

//IPFS authorization
const auth =
	"Basic " +
	Buffer.from(
		process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_PROJECT_SECRET
	).toString("base64");

//IPFS Client
const IPFSClient = ipfsClient.create({
	host: process.env.IPFS_HOST,
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

//Function to upload data
exports.uploadMetadataToIPFS = async (jsonData) => {
	try {
		//Add the data
		const response = await IPFSClient.add(JSON.stringify(jsonData));
		return process.env.IPFS_URL + response.path;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

//Function to upload file
exports.uploadFileToIPFS = async (file) => {
	try {
		//Add the data
		const response = await IPFSClient.add(file.data);
		return process.env.IPFS_URL + response.path;
	} catch (error) {
		logger.error(error);
		return null;
	}
};
