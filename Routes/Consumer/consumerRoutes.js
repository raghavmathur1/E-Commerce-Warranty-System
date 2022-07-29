const express = require("express");
const router = express.Router();

const { update, id } = require("../globalRoutes");

//Import functions from controller
const { updateConsumerProfile } = require("../../Controllers/Consumer/consumer");

//Assigning routes

router.route(update + id).put(updateConsumerProfile);

module.exports = router;
