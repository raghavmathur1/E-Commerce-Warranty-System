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
const updateCartRoute = "/updateCart";
const getCartRoute = "/getCart";
//Consumer Routes
const consumer = "/consumer";

//Retailer Routes
const retailer = "/retailer";
const getBalance = "/getBalance";
const getTransactions = "/getTransactions";

//Product Routes
const product = INITIAL_URL + "/products";
const details = "/details";
const add = "/add";
const all = "/all";
const retmy = "/retmy";
const buyProductRoute = "/buyProducts";
const getUserProducts = "/getUserProducts";
const getAllWarrantyRoute = "/getAllWarranty";
const checkWarranty = "/checkWarranty";
const transferProductRoute = "/transferProduct";
const updateProductRoute = "/update";
const getWarrantyRoute = "/getWarranty";
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
	updateCartRoute,
	getCartRoute,
	details,
	buyProductRoute,
	getUserProducts,
	getAllWarrantyRoute,
	checkWarranty,
	transferProductRoute,
	updateProductRoute,
	getBalance,
	getTransactions,
	getWarrantyRoute,
};
