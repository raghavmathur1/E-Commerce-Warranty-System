import React, { useEffect } from "react";
import classes from "./cart.module.css";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { updateCart } from "../../../../Actions/Cart";
import { toast } from "wc-toast";
function CartItems(props) {
	const removeFromCart = () => {
		let id = props.id;
		let filteredCart = props.cart.filter((item) => {
			return item !== id;
		});
		props.setCart(filteredCart);
		updateCart(JSON.stringify(filteredCart));
		toast("Removed From Cart");
	};
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
			<div className={classes["delete"]} onClick={removeFromCart}>
				<UilTrashAlt />
				Delete
			</div>
		</div>
	);
}

export default CartItems;
