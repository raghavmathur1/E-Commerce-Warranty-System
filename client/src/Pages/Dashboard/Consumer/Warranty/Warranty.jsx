import React, { useState, useEffect } from "react";
import Content from "../../../../Components/Content";
import WarrantyCard from "./WarrantyCard";
import classes from "./warranty.module.css";
import { getAllWarranty } from "../../../../Actions/Products";
import Load from "../../../../Components/Load";
import Empty from "../../../../Components/Empty";
let blue = require("../../../../assets/blue.jpg");
let purple = require("../../../../assets/purple.jpg");
let red = require("../../../../assets/red.jpg");

function Warranty() {
	const [backgrounds, setBackground] = useState([red, blue, purple]);
	const [warrantyDetails, setWarrantyDetails] = useState(null);
	useEffect(() => {
		getAllWarranty().then((res) => {
			setWarrantyDetails(res.data.data);
			console.log(res.data.data);
		});
	}, []);
	const backgroundArr = [
		{
			background: `url(${backgrounds[[1]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
		{
			background: `url(${backgrounds[[0]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
		{
			background: `url(${backgrounds[[2]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
	];

	if (warrantyDetails == null) {
		return <Load heading="View Warranty" />;
	}
	if (warrantyDetails.length === 0) {
		return (
			<Empty
				heading="View Warranty"
				message="No Warranties for Products"
			/>
		);
	}
	return (
		<Content heading="View Warranty">
			<div className={classes["warrantyContainer"]}>
				{warrantyDetails.map((item) => {
					return (
						<WarrantyCard
							key={item.productID}
							style={backgroundArr[parseInt(item.productID) % 3]}
							item={item}
						/>
					);
				})}
			</div>
		</Content>
	);
}

export default Warranty;
