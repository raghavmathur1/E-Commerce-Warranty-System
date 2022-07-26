import React, { useState } from "react";
import Card from "../../../../Components/Card";
import classes from "./warranty.module.css";
import { UilShield } from "@iconscout/react-unicons";
import { UilClock } from "@iconscout/react-unicons";
import { UilHourglass } from "@iconscout/react-unicons";

function WarrantyCard(props) {
	return (
		<Card width="310px" height="380px" id={classes["warCard"]}>
			<div className={classes["cardBack"]} style={props.style}>
				<div className={classes["warrantyHeading"]}>
					<div className={classes["warrantyHeadingShield"]}>
						Warranty Card <UilShield size={20} />
					</div>
					<div className={classes["warrantyText"]}>
						Macbook Pro 14 Inch
					</div>
				</div>
				<div className={classes["warrantyDetails"]}>
					<div className={classes["warrantySmall"]}>
						<UilClock size={15} /> Valid Till:
					</div>
					<div className={classes["warrantyText"]}>
						Monday, 14 July 2023
					</div>
					<div
						className={classes[("warrantyHeadingShield", "second")]}
					>
						0000 0000 0000 0001
					</div>
				</div>
			</div>
			<div className={classes["productDetails"]}>
				<div className={classes["productHeading"]}>Description</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Product Name: </span>
					Macbook Pro 14 Inch
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Product ID:</span> 1234
					5678
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Retailer: </span>
					Aaditya Pal
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Date Issued:</span> 14
					July 2022
				</div>

				<div className={classes["expire"]}>
					<UilHourglass size={15} /> Expired
				</div>
			</div>
		</Card>
	);
}

export default WarrantyCard;
