import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../../Components/Product";
import classes from "../../../Components/products.module.css";
import Content from "../../../Components/Content";
import Loader from "react-js-loader";
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
		return (
			<Content heading="Buy Products">
				<div
					className="loader"
					style={{ width: "100%", height: "100%" }}
				>
					<Loader
						type="spinner-default"
						bgColor={"#000000"}
						color={"#000000"}
						size={50}
					/>
				</div>
			</Content>
		);
	} else if (products.length === 0) {
		return <Content heading="Buy Products">No Products Found</Content>;
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
