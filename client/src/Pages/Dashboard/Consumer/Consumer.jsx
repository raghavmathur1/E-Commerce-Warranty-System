import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import classes from "../dashboard.module.css";
import Profile from "../../../Components/Profile";
import Warranty from "./Warranty";
import MyOrders from "./MyOrders";
import Topbar from "../../../Components/Topbar";
export default function Consumer() {
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
						<Route
							exact
							path="/profile"
							element={<Profile />}
						></Route>
						<Route
							exact
							path="/warranty"
							element={<Warranty />}
						></Route>
						<Route
							exact
							path="/products"
							element={<MyOrders />}
						></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}
