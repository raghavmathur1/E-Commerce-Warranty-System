import React from "react";
import Card from "./Card";
import classes from "./products.module.css";
import { UilEdit } from "@iconscout/react-unicons";
import { UilShoppingCartAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
function Product(props) {
	const navigate = useNavigate();
	const buyPage = () => {
		navigate("./buy/" + props.data._id);
	};

	const manageProduct = () => {
		navigate("../manage/" + props.data._id);
	};
	return (
		<Card
			width="230px"
			height="389px"
			margin="20px 10px"
			id="productCard"
			padding="0 20px"
		>
			<div className={classes["productImage"]}></div>
			<div className={classes["productName"]}>
				{props.data.productName}
			</div>
			<div className={classes["productDescription"]}>
				{props.data.description}
			</div>
			{!(props.manage === "true") && (
				<div className={classes["bottom"]}>
					<div className={classes["price"]}>
						₹
						{(props.data.price * (100 - props.data.discount)) / 100}
						<span className={classes["strike"]}>
							₹{props.data.price}
						</span>
						<span className={classes["discount"]}>
							{props.data.discount}% off
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
					<div className={classes["price"]}>₹ {props.data.price}</div>
					<div className={classes["align"]}>
						<UilEdit size={15} />
						Manage
					</div>
				</div>
			)}
		</Card>
	);
}

export default Product;
