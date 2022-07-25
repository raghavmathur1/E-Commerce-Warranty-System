//Global Routes
const homeRoute = "/";
const mainUserRoutes = "/user";

//Api Routes
const INITIAL_URL = "/api";
const id = "/:id";

//Signup Routes
const signup = INITIAL_URL + "/signup";

//Login Routes
const login = INITIAL_URL + "/login";

//User Routes
const user = INITIAL_URL + "/user";
const userData = "/data";
const logout = "/logout";
const update = "/update";

//Consumer Routes
const consumer = "/consumer";

//Retailer Routes
const retailer = "/retailer";

//Product Routes
const product = INITIAL_URL + "/products";
const add = "/add";
const all = "/all";
const retmy = "/retmy";
//Export Statement
module.exports = {
	mainUserRoutes,
	consumer,
	signup,
	login,
	homeRoute,
	userData,
	logout,
	retailer,
	user,
	product,
	add,
	all,
	retmy,
	id,
	update,
	INITIAL_URL,
};
