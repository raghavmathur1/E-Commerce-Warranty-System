import React, { useState, useEffect } from "react";
import Content from "../../../../Components/Content";
import WarrantyCard from "./WarrantyCard";
import classes from "./warranty.module.css";
import { getAllWarranty } from "../../../../Actions/Products";
import Load from "../../../../Components/Load";
import Empty from "../../../../Components/Empty";
import Input from "../../../../Components/Input";
import { UilFilesLandscapesAlt } from "@iconscout/react-unicons";
let blue = require("../../../../assets/blue.jpg");
let purple = require("../../../../assets/purple.jpg");
let red = require("../../../../assets/red.jpg");

function Warranty() {
	const [backgrounds, setBackground] = useState([red, blue, purple]);
	const [warrantyDetails, setWarrantyDetails] = useState(null);
	const [warrantySearch, setWarrantySearch] = useState([]);

	const [search, setSearch] = useState("");
	const [offStyle, setOffStyle] = useState({});
	const [onStyle, setOnStyle] = useState({ display: "none" });
	useEffect(() => {
		getAllWarranty().then((res) => {
			setWarrantyDetails(res.data.data);
			console.log(res.data.data);
		});
	}, []);
	useEffect(() => {
		if (search.length > 0) {
			setOffStyle({ display: "none" });
			setOnStyle({});
			const temp = warrantyDetails.filter((item) => {
				console.log(item);
				return item.data.productName
					.toLowerCase()
					.includes(search.toLowerCase());
			});
			setWarrantySearch(temp);
		} else {
			setOffStyle({});
			setOnStyle({ display: "none" });
		}
	}, [search]);
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
			<Input
				heading="Product Name"
				type="text"
				placeholder="Enter Product Name"
				width="100%"
				update={setSearch}
			>
				<UilFilesLandscapesAlt />
			</Input>
			<button
				className="button"
				style={{
					margin: "20px 0",
					fontSize: "13px",
					padding: "10px 35px",
				}}
			>
				View
			</button>
			<div className={classes["warrantyContainer"]} style={onStyle}>
				{warrantySearch.map((item) => {
					return (
						<WarrantyCard
							key={item.productID}
							style={backgroundArr[parseInt(item.productID) % 3]}
							item={item}
						/>
					);
				})}
			</div>
			<div className={classes["warrantyContainer"]} style={offStyle}>
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
