const passport = require("passport");
const Consumer = require("../Models/consumer");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Retailer = require("../Models/retailer");

passport.use(
	"consumer-local",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		(email, password, done) => {
			Consumer.findOne({ email: email }, (err, consumer) => {
				if (err) throw err;
				if (!consumer) return done(null, false);
				bcrypt.compare(password, consumer.password, (err, result) => {
					if (err) throw err;
					if (result === true) {
						return done(null, consumer);
					} else {
						return done(null, false);
					}
				});
			});
		}
	)
);
passport.use(
	"retailer-local",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		(email, password, done) => {
			Retailer.findOne({ email: email }, (err, consumer) => {
				if (err) throw err;
				if (!consumer) return done(null, false);
				bcrypt.compare(password, consumer.password, (err, result) => {
					if (err) throw err;
					if (result === true) {
						return done(null, consumer);
					} else {
						return done(null, false);
					}
				});
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	if (user.type === "consumer") {
		Consumer.findById(user._id, (err, consumer) => {
			done(err, consumer);
		});
	} else if (user.type === "retailer") {
		Retailer.findById(user._id, (err, retailer) => {
			done(err, retailer);
		});
	}
});
