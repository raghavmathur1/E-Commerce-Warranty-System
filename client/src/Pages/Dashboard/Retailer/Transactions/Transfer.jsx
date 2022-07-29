import React from "react";
import classes from "./transactions.module.css";
function Transfer(props) {
	const product = props.receipt.productDetails;
	const price = props.receipt.amount;
	const id = props.receipt.productID;
	return (
		<div className={classes["test"]}>
			<div
				style={{
					background: `url(${product.fileURl})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
				className={classes["photo"]}
			></div>
			<div className={classes["bottom"]}>
				<div className={classes["rightHeading"]}>
					Product Name: <span>{product.productName}</span>
				</div>
				<div className={classes["rightHeading"]}>
					Product Id: <span>{id}</span>
				</div>
			</div>
			<div className={classes["price"]}>
				₹{price} <span>From Flipkart</span>
			</div>
		</div>
	);
}

export default Transfer;
