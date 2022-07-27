import React, { useState, useEffect } from "react";
import Card from "../../../../Components/Card";
import classes from "./buy.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function Buy() {
	const parameters = useParams();
	const productId = parameters["*"];
	const navigate = useNavigate();
	const [cartText, setCartText] = useState("Add to Cart");
	const getCart = () => {
		let cart = localStorage.getItem("cart");
		if (cart === null) cart = [];
		else cart = JSON.parse(cart);
		return cart;
	};
	const checkCart = () => {
		let cart = getCart();
		if (cart.find((item) => item === productId)) return true;
		else return false;
	};
	const addToCart = () => {
		let cart = getCart();
		if (checkCart()) {
			cart = cart.filter((item) => item !== productId);
			setCartText("Add to Cart");
		} else {
			cart.push(productId);
			setCartText("Remove");
		}
		localStorage.setItem("cart", JSON.stringify(cart));
	};
	const buyNow = () => {
		let cart = getCart();
		if (!checkCart()) cart.push(productId);
		localStorage.setItem("cart", JSON.stringify(cart));
		navigate("../cart", { replace: true });
	};
	const getData = async () => {
		const res = await axios({
			method: "GET",
			withCredentials: true,
			url: `http://localhost:8000/api/products/${productId}`,
		});
		return res;
	};
	useEffect(() => {
		const res = getData();
		// if (checkCart()) setCartText("Remove");
		// else setCartText("Add to Cart");
	}, []);
	return (
		<div className={classes["buyContainer"]}>
			<div className={classes["left"]}>
				<Card id={classes["photo"]}>
					<div className={classes["photo"]}></div>
					<div className={classes["buttons"]}>
						<button
							className="button red"
							id={classes["cartButton"]}
							onClick={buyNow}
						>
							Buy Product
						</button>
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
					<div className={classes["rightHeading"]}>Apple Macbook</div>
					<div className={classes["bottom"]}>
						<div className={classes["price"]}>
							₹30000
							<span className={classes["strike"]}>₹40000</span>
							<span className={classes["discount"]}>10% off</span>
						</div>
					</div>
					<div className={classes["about"]}>About this item</div>
					<div className={classes["description"]}>
						Apple-designed M1 chip for a giant leap in CPU, GPU, and
						m storage launches apps and opens files in instant.
					</div>
					<div className={classes["line"]}></div>
					<div className={classes["seller"]}>
						Seller Name:{" "}
						<span className={classes["sellerText"]}>
							Aaditya Pal
						</span>
					</div>
					<div className={classes["seller"]}>
						Email:{" "}
						<span className={classes["sellerText"]}>
							aadityapal.info@gmail.com
						</span>
					</div>
				</Card>
			</div>
		</div>
	);
}
export default React.memo(Buy);
