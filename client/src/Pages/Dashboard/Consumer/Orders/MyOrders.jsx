import { useState, useEffect, React } from "react";
import Content from "../../../../Components/Content";
import Order from "./Order";
import classes from "./order.module.css";
import { getUserProductDetails } from "../../../../Actions/Products";
import Load from "../../../../Components/Load";
import Empty from "../../../../Components/Empty";
function MyOrders() {
	const [products, setProducts] = useState(null);
	useEffect(() => {
		getUserProductDetails().then((res) => {
			setProducts(res.data.data);
		});
	}, []);

	if (products === null) {
		return <Load heading="My Orders" />;
	}
	if (products.length === 0) {
		return <Empty heading="My Orders" message="No Orders Found" />;
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
