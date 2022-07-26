import React from "react";
import classes from "./cart.module.css";
function CartItems(props) {
	return (
		<div className={classes["test"]}>
			<div className={classes["photo"]}></div>
			<div className={classes["bottom"]}>
				<div className={classes["rightHeading"]}>Apple Macbook</div>
				<div className={classes["price"]}>
					₹30000
					<span className={classes["strike"]}>₹40000</span>
					<span className={classes["discount"]}>10% off</span>
				</div>
			</div>
		</div>
	);
}

export default CartItems;
