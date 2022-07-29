import React, { useState, useEffect } from "react";
import Card from "../../../../Components/Card";
import classes from "./buy.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../../../Actions/Products";
import { toast } from "wc-toast";
import { getCart, updateCart } from "../../../../Actions/Cart";
import Loader from "react-js-loader";
import Content from "../../../../Components/Content";
function Buy() {
	const [cart, setCart] = useState([]);
	const [item, setItem] = useState(null);
	const [retailerDetails, setRetailerDetails] = useState(null);
	const parameters = useParams();
	const productId = parameters["*"];
	const navigate = useNavigate();
	const [cartText, setCartText] = useState("Add to Cart");

	useEffect(() => {
		getCart().then((res) => {
			setCart(res);
		});
		getProducts(productId).then((res) => {
			setItem(res.data);
			setRetailerDetails(res.retailerDetail);
		});
	}, []);

	const addToCart = async () => {
		console.log(cart);
		if (cart.includes(productId)) {
			let filteredCart = cart.filter((item) => {
				return item !== productId;
			});
			setCart(filteredCart);
			setCartText("Add To Cart");
			toast("Removed From Cart");
		} else {
			setCart([...cart, productId]);
			setCartText("Remove");
			toast("Added To Cart");
		}
	};

	useEffect(() => {
		const update = async () => {
			console.log(JSON.stringify(cart));
			await updateCart(JSON.stringify(cart));
		};
		if (cart.includes(productId)) setCartText("Remove");
		else setCartText("Add To Cart");
		update();
	}, [cart]);

	if (item === null || cart === null || cart === undefined) {
		return (
			<Content>
				<div
					className="loader"
					style={{ width: "100%", height: "100%" }}
				>
					<Loader
						type="spinner-default"
						bgColor={"#000000"}
						color={"#000000"}
						size={50}
					/>
				</div>
			</Content>
		);
	}

	return (
		<div className={classes["buyContainer"]}>
			<div className={classes["left"]}>
				<Card id={classes["photo"]}>
					<div
						className={classes["photo"]}
						style={{
							backgroundImage: `url(${item.fileURl})`,
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
						}}
					></div>
					<div className={classes["buttons"]}>
						{/* <button
							className="button red"
							id={classes["cartButton"]}
							// onClick={buyNow}
						>
							Buy Product
						</button> */}
						<button
							className="button"
							id={classes["cartButton"]}
							onClick={addToCart}
						>
							{cartText}
						</button>
					</div>
				</Card>
			</div>
			<div className={classes["right"]}>
				<Card minHeight="86vh" padding="2vh" id={classes["rightCard"]}>
					<div className={classes["rightHeading"]}>
						{item.productName}
					</div>
					<div className={classes["bottom"]}>
						<div className={classes["price"]}>
							₹{item.price - (item.price * item.discount) / 100}
							<span className={classes["strike"]}>
								{item.price}
							</span>
							<span className={classes["discount"]}>
								{item.discount}%
							</span>
						</div>
					</div>
					<div className={classes["about"]}>About this item</div>
					<div className={classes["description"]}>
						{item.description}
					</div>
					<div className={classes["line"]}></div>
					<div className={classes["seller"]}>
						Seller Name:{" "}
						<span className={classes["sellerText"]}>
							{retailerDetails.firstName}{" "}
							{retailerDetails.lastName}
						</span>
					</div>
					<div className={classes["seller"]}>
						Email:{" "}
						<span className={classes["sellerText"]}>
							{retailerDetails.email}
						</span>
					</div>
				</Card>
			</div>
		</div>
	);
}
export default React.memo(Buy);
