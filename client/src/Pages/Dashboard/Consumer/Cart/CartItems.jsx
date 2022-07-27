import React, { useEffect, useState } from "react";
import classes from "./cart.module.css";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { updateCart } from "../../../../Actions/Cart";
import { getProducts } from "../../../../Actions/GetProducts";
import { toast } from "wc-toast";
function CartItems(props) {
	const [product, setProduct] = useState(null);
	useEffect(() => {
		getProducts(props.id).then((res) => {
			console.log(res);
			setProduct(res.data);
		});
	}, []);

	const removeFromCart = () => {
		let id = props.id;
		let filteredCart = props.cart.filter((item) => {
			return item !== id;
		});

		props.setCart(filteredCart);
		updateCart(JSON.stringify(filteredCart));
		toast("Removed From Cart");
	};
	if (product === null || product === undefined) {
		return (
			<div
				className={classes["test"]}
				style={{
					backgroundColor: "#f3f4f6",
					margin: "8px auto",
					width:"98%"
				}}
			></div>
		);
	}
	return (
		<div className={classes["test"]}>
			<div
				style={{
					background: `url(${product.fileURl})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
				}}
				className={classes["photo"]}
			></div>
			<div className={classes["bottom"]}>
				<div className={classes["rightHeading"]}>
					{product.productName}
				</div>
				<div className={classes["price"]}>
					₹{product.price - (product.price * product.discount) / 100}
					<span className={classes["strike"]}>₹{product.price}</span>
					<span className={classes["discount"]}>
						{product.discount}% off
					</span>
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
