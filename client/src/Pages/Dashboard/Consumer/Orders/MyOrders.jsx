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
			// console.log(res.);
		});
	}, []);

	if (products === null) {
		return <Load heading="My Products" />;
	}
	if (products.length === 0) {
		return <Empty heading="My Products" message="No Products Found" />;
	}
	return (
		<Content heading="My Products">
			<div className={classes["allOrders"]}>
				{products.map((item) => {
					return (
						<Order
							key={item.productID}
							items={item}
							retailer={item.retailer}
						/>
					);
				})}
			</div>
		</Content>
	);
}

export default MyOrders;
