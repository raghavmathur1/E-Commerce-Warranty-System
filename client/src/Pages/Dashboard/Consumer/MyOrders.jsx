import React from "react";
import Content from "../../../Components/Content";
import Order from "./Order";
import classes from "./order.module.css";

function MyOrders() {
	return (
		<Content heading="My Orders">
			<div className={classes["allOrders"]}>
				<Order />
				<Order />
				<Order />
				<Order />
			</div>
		</Content>
	);
}

export default MyOrders;
