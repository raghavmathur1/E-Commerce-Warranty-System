import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import Products from "./AddProduct";
import classes from "../dashboard.module.css";
import Profile from "../../../Components/Profile";
import Myproduct from "./Myproduct";
import ViewWarranty from "./ViewWarranty";
import ManageProduct from "./ManageProduct";
import Topbar from "../../../Components/Topbar";
import Transactions from "./Transactions/Transactions";
export default function Retailer() {
	return (
		<div>
			<div className={classes["dashboard"]}>
				<div className={classes["left"]}>
					<Sidebar />
				</div>
				<div className={classes["right"]}>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="./products" />}
						/>
						<Route path="/products" element={<Myproduct />}></Route>
						<Route path="/add" element={<Products />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/money" element={<Transactions />}></Route>
						<Route
							path="/manage/*"
							element={<ManageProduct />}
						></Route>
						<Route
							path="/warranty"
							element={<ViewWarranty />}
						></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}
