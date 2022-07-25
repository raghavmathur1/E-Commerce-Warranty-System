import React, { useState } from "react";
import Content from "../../../Components/Content";
import WarrantyCard from "./WarrantyCard";
import classes from "./warranty.module.css";
let blue = require("../../../assets/blue.jpg");
let purple = require("../../../assets/purple.jpg");
let red = require("../../../assets/red.jpg");
function Warranty() {
	const [backgrounds, setBackground] = useState([red, blue, purple]);
	const backgroundStyle1 = {
		background: `url(${backgrounds[[1]]})`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
	};
	const backgroundStyle2 = {
		background: `url(${backgrounds[[0]]})`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
	};
	const backgroundStyle3 = {
		background: `url(${backgrounds[[2]]})`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
	};
	return (
		<Content heading="View Warranty">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					marginTop: "15px",
				}}
			>
				<WarrantyCard style={backgroundStyle1} />
				<WarrantyCard style={backgroundStyle2} />
				<WarrantyCard style={backgroundStyle3} />
			</div>
		</Content>
	);
}

export default Warranty;
