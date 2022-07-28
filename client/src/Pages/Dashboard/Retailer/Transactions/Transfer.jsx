import React from "react";
import classes from "./transactions.module.css";
function Transfer() {
	return (
		<div className={classes["test"]}>
			<div
				style={{
					// background: `url(${product.fileURl})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
				}}
				className={classes["photo"]}
			></div>
			<div className={classes["bottom"]}>
				<div className={classes["rightHeading"]}>
					Product Name: <span>Macbook Pro</span>
				</div>
				<div className={classes["rightHeading"]}>
					Product Id: <span>0000006</span>
				</div>
			</div>
			<div className={classes["price"]}>
				₹50000 <span>From Flipkart</span>
			</div>
		</div>
	);
}

export default Transfer;
