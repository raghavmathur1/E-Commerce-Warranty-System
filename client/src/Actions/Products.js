import axios from "axios";

export const getProducts = async (productId) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			`/api/products/details/${productId}`;
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return {};
	}
};
export const buyProducts = async (productId,price) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + "/api/products/buyProducts";
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: url,
			data: {
				productId,
				price,
			},
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
