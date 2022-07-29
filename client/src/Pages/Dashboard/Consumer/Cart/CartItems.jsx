import React, { useEffect, useState, useContext } from "react";
import classes from "./cart.module.css";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { updateCart } from "../../../../Actions/Cart";
import { getProducts } from "../../../../Actions/Products";
import { toast } from "wc-toast";
import { userObjectContext } from "../../../../Context";
function CartItems(props) {
	const [product, setProduct] = useState(null);
	const price = useContext(userObjectContext)[6];
	const setPrice = useContext(userObjectContext)[7];
	const cartDetails = useContext(userObjectContext)[8];
	const setCartDetails = useContext(userObjectContext)[9];
	const [retailer, setRetailer] = useState(null);
	useEffect(() => {
		getProducts(props.id).then((res) => {
			setProduct(res.data);
			setRetailer(res.retailerDetail);
		});
	}, []);
	useEffect(() => {
		if (product !== null && retailer !== null) {
			setPrice(
				parseInt(price) +
					parseInt(
						product.price -
							(parseInt(product.price) *
								parseInt(product.discount)) /
								100
					)
			);
			const newArray = cartDetails;
			newArray.push({
				retailerEmail: retailer.email,
				productId: props.id,
				price: product.price - (product.price * product.discount) / 100,
			});
			setCartDetails(newArray);
		}
	}, [product, retailer]);
	// props.setPrice(props.price + product.price);
	const removeFromCart = () => {
		let id = props.id;
		let filteredCart = props.cart.filter((item) => {
			return item !== id;
		});

		props.setCart(filteredCart);
		updateCart(JSON.stringify(filteredCart));
		toast("Removed From Cart");
		setPrice(
			parseInt(price) -
				parseInt(
					product.price -
						(parseInt(product.price) * parseInt(product.discount)) /
							100
				)
		);
		const newArray = cartDetails.filter((item) => {
			return item.productId !== id;
		});
		setCartDetails(newArray);
	};
	if (product === null || product === undefined) {
		return (
			<div
				className={classes["test"]}
				style={{
					backgroundColor: "#f3f4f6",
					margin: "8px auto",
					width: "98%",
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
