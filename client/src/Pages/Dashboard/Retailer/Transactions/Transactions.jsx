import React from "react";
import Content from "../../../../Components/Content";
import Transfer from "./Transfer";
import classes from "./transactions.module.css";
import Card from "../../../../Components/Card";
import { UilMoneyStack } from "@iconscout/react-unicons";
function Transactions() {
	return (
		<Content id={classes["offCard"]}>
			<div className={classes["cartContainer"]}>
				<div className={classes["summary"]}>
					<Card minHeight="80vh" id={classes["proCard"]}>
						<div className={classes["blue"]}>
							<span>Transaction Summary</span>
						</div>
						<div className={classes["allitems"]}>
							{/* {cart.map((item) => (
								<CartItems
									key={item}
									id={item}
									setCart={setCart}
									cart={cart}
								/>
							))} */}

							<Transfer />
						</div>
					</Card>
				</div>
				<div className={classes["priceDetails"]}>
					<Card width="300px" height="350px">
						<div className={classes["tophead"]}>
							<span>Your Balance</span>
						</div>
						<div className={classes["orderDet"]}>
							<div className={classes["downOrder"]}>
								{/* <UilMoneyStack /> */}
								<span>₹10000</span>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Content>
	);
}

export default Transactions;
