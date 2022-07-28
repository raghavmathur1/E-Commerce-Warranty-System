import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import classes from "../dashboard.module.css";
import Profile from "../../../Components/Profile";
import Warranty from "./Warranty/Warranty";
import MyOrders from "./Orders/MyOrders";
import Buy from "./Buy/Buy";
import AllProducts from "./AllProducts";
import Cart from "./Cart/Cart";
import Transfer from "./Transfer/Transfer";
import Request from "./Request";
export default function Consumer() {
	return (
		<div>
			<div className={classes["dashboard"]}>
				<div className={classes["left"]}>
					<Sidebar />
				</div>
				<div className={classes["right"]}>
					<Routes>
						<Route path="/" element={<Navigate to="./shop" />} />
						<Route path="/shop/*" element={<Buy />}></Route>
						<Route
							exact
							path="/shop"
							element={<AllProducts />}
						></Route>
						<Route
							exact
							path="/repair"
							element={<Request />}
						></Route>
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
						<Route
							exact
							path="/transfer"
							element={<Transfer />}
						></Route>
						<Route exact path="/cart" element={<Cart />}></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}
