import React, { useState } from "react";
import Card from "../../../../Components/Card";
import classes from "./warranty.module.css";
import { UilShield } from "@iconscout/react-unicons";
import { UilClock } from "@iconscout/react-unicons";
import { UilHourglass } from "@iconscout/react-unicons";
const correctFormat = (time) => {
	let m = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let d = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	let date = new Date(0);
	date.setUTCSeconds(time);
	return (
		d[date.getDay()] +
		", " +
		date.getDate() +
		" " +
		m[date.getMonth()] +
		" " +
		date.getFullYear()
	);
};

const getExpiry = (days, current) => {
	const timeToAdd = days * 24 * 60 * 60;
	return parseInt(current) + parseInt(timeToAdd);
};

const checkExpired = (expiryTime) => {
	const currentTime = Date.now() / 1000;
	if (currentTime > expiryTime) return true;
	return false;
};

function WarrantyCard(props) {
	const product = props.item.data;
	const productID = props.item.productID;
	const retailer = props.item.retailer;
	const warranty = props.item.warranty;
	const timeString = correctFormat(warranty[4]);
	const expiryTime = getExpiry(warranty[2], warranty[4]);
	const expiryString = correctFormat(expiryTime);
	const expired = checkExpired(expiryTime);
	return (
		<Card width="310px" height="380px" id={classes["warCard"]}>
			<div className={classes["cardBack"]} style={props.style}>
				<div className={classes["warrantyHeading"]}>
					<div className={classes["warrantyHeadingShield"]}>
						Warranty Card <UilShield size={20} />
					</div>
					<div className={classes["warrantyText"]}>
						{product.productName}
					</div>
				</div>
				<div className={classes["warrantyDetails"]}>
					<div className={classes["warrantySmall"]}>
						<UilClock size={15} /> Valid Till:
					</div>
					<div className={classes["warrantyText"]}>
						{expiryString}
					</div>
					<div
						className={classes[("warrantyHeadingShield", "second")]}
					>
						{warranty[0]}
					</div>
				</div>
			</div>
			<div className={classes["productDetails"]}>
				<div className={classes["productHeading"]}>Description</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Product Name: </span>
					{product.productName}
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Product ID:</span> 1234
					{productID}
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Retailer: </span>
					{retailer.firstName}
					{}
					{retailer.lastName}
				</div>
				<div className={classes["productText"]}>
					<span className={classes["bolder"]}>Date Issued:</span>{" "}
					{timeString}
				</div>
				{expired ? (
					<div className={classes["expire"]}>
						<UilHourglass size={15} /> Expired
					</div>
				) : (
					<div className={classes["valid"]}>
						<UilHourglass size={15} /> Valid
					</div>
				)}
			</div>
		</Card>
	);
}

export default WarrantyCard;
