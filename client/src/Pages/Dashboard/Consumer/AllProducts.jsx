import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../../Components/Product";
import classes from "../../../Components/products.module.css";
import Content from "../../../Components/Content";
import Load from "../../../Components/Load";
import Empty from "../../../Components/Empty";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function AllProducts() {
	const [products, setProducts] = useState(null);
	const getProducts = async () => {
		const res = await axios.get(api_endpoint + "/api/products/all", {
			withCredentials: true,
		});
		setProducts(res.data);
	};
	useEffect(() => {
		getProducts();
	}, []);
	if (products === null) {
		return <Load heading="Buy Products" />;
	} else if (products.data.length === 0) {
		console.log(products);
		return <Empty heading="Buy Products" message="No Products Found" />;
	} else {
		return (
			<Content heading="Buy Products" id={classes["productCard"]}>
				<div className={classes["productContainer"]}>
					{products.data.map((product) => (
						<Product key={product._id} data={product} />
					))}
				</div>
			</Content>
		);
	}
}

export default AllProducts;
