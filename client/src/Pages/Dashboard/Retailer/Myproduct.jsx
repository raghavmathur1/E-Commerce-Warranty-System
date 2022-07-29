import React, { useState, useContext, useEffect } from "react";
import Content from "../../../Components/Content";
import { userObjectContext } from "../../../Context";
import axios from "axios";
import Product from "../../../Components/Product";
import classes from "../../../Components/products.module.css";
import Load from "../../../Components/Load";
import Empty from "../../../Components/Empty";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
export default function Myproduct() {
	const [data, setData] = useState(null);
	const userObject = useContext(userObjectContext)[0];
	const getData = async () => {
		let a = userObject._id;
		const response = await axios.get(
			api_endpoint + `/api/products/retmy/${a}`,
			{
				withCredentials: true,
			}
		);
		setData(response.data.data);
	};

	useEffect(() => {
		getData();
	}, []);
	if (data === null) {
		return <Load heading="My Products" />;
	}
	if (data.length === 0) {
		return <Empty heading="My Products" message="No Products Added Yet" />;
	}
	return (
		<Content heading="My Products" id={classes["productCard"]}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{data.map((product) => (
					<Product key={product._id} data={product} manage="true" />
				))}
			</div>
		</Content>
	);
}
