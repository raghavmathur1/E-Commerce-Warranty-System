const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./Logger/logger");
const dotenv = require("dotenv");
const passport = require("passport");
const localauth = require("./Middlewares/localauth");
const session = require("cookie-session");
const connectDb = require("./Database/database");

/*Module for uploading file */
const fileupload = require("express-fileupload");
/*file upload */
app.use(fileupload());

dotenv.config({
	path: "./utils/config.env",
});

//Enabling Cors and setting origin as localhost
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());

//Connect to mongodb
connectDb();

//Initialize Passport
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());

//Import all route files
const globalRoutes = require("./Routes/globalRoutes");
const consumerRoutes = require("./Routes/Consumer/consumerRoutes");
const retailerRoutes = require("./Routes/Retailer/retailerRoutes");
const productRoutes = require("./Routes/Product/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const signupRoutes = require("./Routes/Auth/signupRoutes");
const loginRoutes = require("./Routes/Auth/loginRoutes");

//Using all the routes
app.use(globalRoutes.signup, signupRoutes);
app.use(globalRoutes.login, loginRoutes);
app.use(globalRoutes.INITIAL_URL + globalRoutes.consumer, consumerRoutes);
app.use(globalRoutes.INITIAL_URL + globalRoutes.retailer, retailerRoutes);
app.use(globalRoutes.user, userRoutes);
app.use(globalRoutes.product, productRoutes);

//Listen to port 8000
app.listen(process.env.PORT || 8000, () => {
	logger.info(`Server connected at porst : ${process.env.PORT}`);
});
