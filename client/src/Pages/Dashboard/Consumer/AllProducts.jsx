import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function AllProducts() {
	const [products, setProducts] = useState([]);
	const getProducts = async () => {
		const res = await axios.get(api_endpoint + "/api/products/all", {
			withCredentials: true,
		});
		setProducts(res.data);
	};
	useEffect(() => {
		getProducts();
	}, []);
	useEffect(() => {
		console.log(products.data);
	}, [products]);
	if (products.length === 0) {
		return <div>AllProducts</div>;
	} else {
		return (
			<div>
				{products.data.map((product) => (
					<Product key={product._id} data={product} />
				))}
			</div>
		);
	}
}

export default AllProducts;
