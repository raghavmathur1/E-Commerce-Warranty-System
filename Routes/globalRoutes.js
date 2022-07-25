//Global Routes
const homeRoute = "/";
const mainUserRoutes = "/user";

//Api Routes
const api = "/api";
const id = "/:id";

//Signup Routes
const signup = api + "/signup";

//Login Routes
const login = api + "/login";

//User Routes
const user = api + "/user";
const userData = "/data";
const logout = "/logout";
const update = "/update";

//Consumer Routes
const consumer = "/consumer";

//Retailer Routes
const retailer = "/retailer";

//Product Routes
const product = api + "/products";
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
	api,
};
