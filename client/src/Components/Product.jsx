import React from "react";
import Card from "./Card";
import classes from "./products.module.css";
import { UilEdit } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
function Product(props) {
	const navigate = useNavigate();
	const buyPage = () => {
		navigate("./buy/" + props.data._id);
	};
	return (
		<Card
			width="230px"
			height="389px"
			margin="20px 10px"
			id="productCard"
			padding="0 20px"
			onClick={buyPage}
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
						<span className={classes["buy"]}>
							<UilEdit size={15} />
							Manage
						</span>
					</div>
				</div>
			)}

			{props.manage === "true" && (
				<div className={classes["bottom-blue"]}>
					<div className={classes["price"]}>₹ {props.data.price}</div>
					<div>
						<UilEdit size={15} />
						Manage
					</div>
				</div>
			)}
		</Card>
	);
}

export default Product;
