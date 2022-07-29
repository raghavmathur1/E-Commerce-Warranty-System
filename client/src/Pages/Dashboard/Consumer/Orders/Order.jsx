import React from "react";
import Card from "../../../../Components/Card";
import classes from "./order.module.css";
import { UilCheckCircle } from "@iconscout/react-unicons";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { UilPlane } from "@iconscout/react-unicons";

function Order(props) {
	console.log(props.items);
	const item = props.items.data;
	const retailer = props.retailer;
	return (
		<Card width="100%" height="150px" margin="20px 0">
			<div className={classes["content"]}>
				<div
					className={classes["image"]}
					style={{
						background: `url(${item.fileURl})`,
						backgroundSize: "contain",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				></div>
				<div className={classes["productDetails"]}>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Product Name:</span>
						{item.productName}
					</div>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Seller: </span>
						{retailer.firstName} {retailer.lastName}
					</div>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Price:</span>{" "}
						{item.price}
					</div>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>Product ID:</span>{" "}
						{props.items.productID}
					</div>
					<div className={classes["productText"]}>
						<span className={classes["bolder"]}>
							Retailer Email:
						</span>{" "}
						{props.items.retailer.email}
					</div>
				</div>
				<div className={classes["status"]}>
					<div className={classes["statusHeading"]}>
						<UilCheckCircle />
						Delivered
					</div>
					<div className={classes["subtext"]}>
						Your Item has been delivered
					</div>
				</div>
			</div>
		</Card>
	);
}
export default Order;
