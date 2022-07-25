const mongoose = require("mongoose");
const logger = require("../Logger/logger");
//Connect to the database using the mongoDb url
const connectDb = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		logger.info(`MongoDb connected : ${connection.connection.host}`);
	} catch (error) {
		console.log(error);
		logger.error(new Error("Error connecting to the database.."), {
			error: error,
		});
	}
};

module.exports = connectDb;
