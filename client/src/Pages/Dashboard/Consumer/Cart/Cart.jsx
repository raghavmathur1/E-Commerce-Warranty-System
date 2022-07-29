import React, { useContext, useEffect, useState } from "react";
import Card from "../../../../Components/Card";
import Content from "../../../../Components/Content";
import classes from "./cart.module.css";
import CartItems from "./CartItems";
import { buyProducts } from "../../../../Actions/Products";
import { getCart, updateCart } from "../../../../Actions/Cart";
import { userObjectContext } from "../../../../Context";
import Load from "../../../../Components/Load";
import { toast } from "wc-toast";
import Empty from "../../../../Components/Empty";
function Cart() {
	const [cart, setCart] = useState([]);
	const price = useContext(userObjectContext)[6];
	const setPrice = useContext(userObjectContext)[7];
	const retailerDetails = useContext(userObjectContext)[8];
	const setRetailerDetails = useContext(userObjectContext)[9];
	useEffect(() => {
		getCart().then((res) => {
			setCart(res);
		});
		setPrice(0);
		setRetailerDetails([]);
	}, []);
	const callBuyProduct = async () => {
		toast.promise(
			new Promise(async (resolve, reject) => {
				const response = await buyProducts(retailerDetails);
				if (response === true) {
					resolve("Successfully Purchased");
					setCart([]);
					updateCart(JSON.stringify([]));
					setPrice(0);
				} else reject("Something went wrong");
			}),
			{
				loading: "Purchase Pending...",
				success: "Products Bought",
				error: "Could not complete Purchase",
			}
		);
	};
	if (cart === null || cart === undefined) {
		return <Load heading="Cart" />;
	}

	if (cart.length === 0) {
		return <Empty heading="Cart Items" message={"Cart is Empty"} />;
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
								<span>{price}</span>
							</div>
							<div className={classes["priceOrder"]}>
								<span>Delivery Charge</span>
								<span>0</span>
							</div>
						</div>
						<div className={classes["down"]}>
							<div className={classes["downOrder"]}>
								<span>Total Price: </span>
								<span>{price}</span>
							</div>
						</div>
					</Card>
					<button
						className={classes["submit"]}
						onClick={callBuyProduct}
					>
						Proceed to pay: {price}
					</button>
				</div>
			</div>
		</Content>
	);
}

export default Cart;
