const express = require("express");
const router = express.Router();
const { signup, login, update, id } = require("./globalRoutes");

//Import functions from controller
const {
	consumerSignup,
	consumerLogin,
	updateConsumerProfile,
} = require("../Controllers/consumer");

//Assigning routes
router.route(signup).post(consumerSignup);
router.route(login).post(consumerLogin);

router.route(update + id).put(updateConsumerProfile);

module.exports = router;
