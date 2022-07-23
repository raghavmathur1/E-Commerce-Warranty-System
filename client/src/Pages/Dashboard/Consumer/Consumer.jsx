import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import classes from "../dashboard.module.css";
import Profile from "../../../Components/Profile";
export default function Consumer() {
	return (
		<div className={classes["dashboard"]}>
			<div className={classes["left"]}>
				<Sidebar />
			</div>
			<Routes>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</div>
	);
}
