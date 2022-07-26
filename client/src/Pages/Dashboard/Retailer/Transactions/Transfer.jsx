import React from "react";
import classes from "./transactions.module.css";
import { UilCheckCircle } from "@iconscout/react-unicons";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { UilPlane } from "@iconscout/react-unicons";
import Card from "../../../../Components/Card";
function Transfer() {
	return (
		<Card width="100%" height="120px" margin="20px 0">
			<div className={classes["content"]}>
				<div className={classes["productDetails"]}>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Product Name:</span>
						Macbook Pro 14 Inch
					</div>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Seller: </span>
						Raghav Mathur
					</div>
				</div>
				<div className={classes["status"]}>
					<div className={classes["statusHeading"]}>₹1000</div>
				</div>
			</div>
		</Card>
	);
}

export default Transfer;
