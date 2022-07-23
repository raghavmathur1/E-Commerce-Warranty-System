import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import Products from "./AddProduct";
import classes from "../dashboard.module.css";
import Profile from "../../../Components/Profile";
import Myproduct from "./Myproduct";
export default function Retailer() {
	return (
		<div className={classes["dashboard"]}>
			<div className={classes["left"]}>
				<Sidebar />
			</div>
			<div className={classes["right"]}>
				<Routes>
					<Route path="/products" element={<Myproduct />}></Route>
					<Route path="/add" element={<Products />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Routes>
			</div>
		</div>
	);
}
