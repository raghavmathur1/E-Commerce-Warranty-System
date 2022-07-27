import React, { useEffect, useState } from "react";
import Card from "../../../../Components/Card";
import Content from "../../../../Components/Content";
import classes from "./cart.module.css";
import CartItems from "./CartItems";
import { getCart, updateCart } from "../../../../Actions/Cart";
function Cart() {
	const [cart, setCart] = useState([]);
	useEffect(() => {
		getCart().then((res) => {
			setCart(res);
		});
	}, []);

	if (cart === null || cart === undefined) {
		return <div>Loading...</div>;
	}
	return (
		<Content id={classes["offCard"]}>
			<div className={classes["cartContainer"]}>
				<div className={classes["summary"]}>
					<Card minHeight="80vh" id={classes["proCard"]}>
						<div className={classes["blue"]}>
							<span>Order Summary</span>
						</div>
						<div className={classes["allitems"]}>
							{cart.map((item) => (
								<CartItems
									key={item}
									id={item}
									setCart={setCart}
									cart={cart}
								/>
							))}
						</div>
					</Card>
				</div>
				<div className={classes["priceDetails"]}>
					<Card width="300px" height="350px">
						<div className={classes["tophead"]}>
							<span>Price Details</span>
						</div>
						<div className={classes["orderDet"]}>
							<div className={classes["priceOrder"]}>
								<span>Price</span>
								<span>50000</span>
							</div>
							<div className={classes["priceOrder"]}>
								<span>Delivery Charge</span>
								<span>50000</span>
							</div>
						</div>
						<div className={classes["down"]}>
							<div className={classes["downOrder"]}>
								<span>Total Price: </span>
								<span>50000</span>
							</div>
						</div>
					</Card>
					<button className={classes["submit"]}>Checkout</button>
				</div>
			</div>
		</Content>
	);
}

export default Cart;
