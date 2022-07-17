const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config({
	path: "./utils/config.env",
});
app.use(cors());

//Import all route files
const globalRoutes = require("./Routes/globalRoutes");
const userRoutes = require("./Routes/userRoutes");

//Using all the routes
app.use(globalRoutes.homeRoute, userRoutes);

app.listen(process.env.PORT || 8000, () => {
	console.log(process.env.PORT);
	console.log(`Server running at port 8000`);
});
