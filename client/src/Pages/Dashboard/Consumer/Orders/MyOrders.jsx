import { useState, useEffect, React } from "react";
import Content from "../../../../Components/Content";
import Order from "./Order";
import classes from "./order.module.css";
import { getUserProductDetails } from "../../../../Actions/Products";
function MyOrders() {
	const [products, setProducts] = useState(null);
	useEffect(() => {
		getUserProductDetails().then((res) => {
			setProducts(res.data.data);
		});
	}, []);

	if (products === null) {
		return <div>Not loaded....</div>;
	}
	return (
		<Content heading="My Orders">
			<div className={classes["allOrders"]}>
				{products.map((item) => {
					return <Order items={item} retailer={item.retailer} />;
				})}
			</div>
		</Content>
	);
}

export default MyOrders;
