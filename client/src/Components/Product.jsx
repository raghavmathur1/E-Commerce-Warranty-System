import React from "react";
import Card from "./Card";
import classes from "./products.module.css";
import { UilEdit } from "@iconscout/react-unicons";
import { UilShoppingCartAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
function Product(props) {
	const navigate = useNavigate();
	const data = props.data.data;
	const productID = props.data.productID;
	let description;
	let name = data.productName.substring(0, 60);
	if (data.productName.length > 60) name += "...";
	if (props.manage === "true") {
		description = data.description.substring(0, 157);
		if (data.description.length > 157) description += "......";
	} else {
		// console.log(data.descriptionn.length);
		description = data.description.substring(0, 130);
		if (data.description.length > 130) description += "......";
	}
	const buyPage = () => {
		navigate("../shop/" + productID);
	};

	const manageProduct = () => {
		navigate("../manage/" + productID);
	};
	return (
		<div className={classes["product"]}>
			<div
				className={classes["productImage"]}
				style={{
					backgroundImage: `url(${data.fileURl})`,
				}}
			></div>
			<div className={classes["productName"]}>{name}</div>
			<div className={classes["productDescription"]}>{description}</div>
			{!(props.manage === "true") && (
				<div className={classes["bottom"]}>
					<div className={classes["price"]}>
						₹{(data.price * (100 - data.discount)) / 100}
						<span className={classes["strike"]}>₹{data.price}</span>
						<span className={classes["discount"]}>
							{data.discount}% off
						</span>
					</div>
				</div>
			)}
			{!(props.manage === "true") && (
				<div className={classes["buy"]} onClick={buyPage}>
					<UilShoppingCartAlt size={15} />
					Buy
				</div>
			)}

			{props.manage === "true" && (
				<div className={classes["bottom-blue"]} onClick={manageProduct}>
					<div className={classes["price"]}>₹ {data.price}</div>
					<div className={classes["align"]}>
						<UilEdit size={15} />
						Manage
					</div>
				</div>
			)}
		</div>
	);
}

export default Product;
