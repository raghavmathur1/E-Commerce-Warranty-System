//Global Routes
const homeRoute = "/";
const mainUserRoutes = "/user";

//Api Routes
const api = "/api";
const id = "/:id";

//User Routes
const user = api + "/user";
const consumer = api + "/consumer";
const retailer = api + "/retailer";
const userData = "/data";
const logout = "/logout";
const signup = "/signup";
const login = "/auth/login";
const update = "update";

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
};
