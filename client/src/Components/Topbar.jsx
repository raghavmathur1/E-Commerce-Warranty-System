import React from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
function Topbar() {
	const navigate = useNavigate();
	return (
		<div
			style={{
				display: "flex",
				margin: "20px 0 0 0",
				width: "50%",
				justifyContent: "space-around",
				right: "0",
			}}
		>
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
