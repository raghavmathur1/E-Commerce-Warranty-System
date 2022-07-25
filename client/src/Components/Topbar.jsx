import React from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import classes from "./topbar.module.css";
function Topbar() {
	const navigate = useNavigate();
	return (
		<div className={classes["topbar"]}>
			<div className="link" onClick={() => navigate("/")}>
				Home
			</div>
			<div className="link" onClick={() => navigate("/consumer/login")}>
				Consumer Login
			</div>
			<div className="link" onClick={() => navigate("/consumer/signup")}>
				Consumer Signup{" "}
			</div>
			<div className="link" onClick={() => navigate("/retailer/login")}>
				Retailer Login{" "}
			</div>
			<div className="link" onClick={() => navigate("/retailer/signup")}>
				Retailer Signup{" "}
			</div>
			<div className="link" onClick={() => navigate("/dashboard")}>
				Dashboard{" "}
			</div>
		</div>
	);
}

export default Topbar;
