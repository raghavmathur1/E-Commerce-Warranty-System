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

//Initialize Passport
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());

//Connect to mongodb atlas
const url = process.env.MONGO;
mongoose.connect(url).then(() => console.log("Connected to DB"));

//Import all route files
const globalRoutes = require("./Routes/globalRoutes");

const consumerRoutes = require("./Routes/consumerRoutes");
const retailerRoutes = require("./Routes/retailerRoutes");
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const signupRoutes = require("./Routes/signupRoutes");
const loginRoutes = require("./Routes/loginRoutes");
//Using all the routes
app.use(globalRoutes.signup, signupRoutes);
app.use(globalRoutes.login, loginRoutes);
app.use(globalRoutes.api + globalRoutes.consumer, consumerRoutes);
app.use(globalRoutes.api + globalRoutes.retailer, retailerRoutes);
app.use(globalRoutes.user, userRoutes);
app.use(globalRoutes.product, productRoutes);

app.listen(process.env.PORT || 8000, () => {
	console.log(process.env.PORT);
	console.log(`Server running at port 8000`);
});
