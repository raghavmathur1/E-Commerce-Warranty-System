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
		console.log(response.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		return {};
	}
};
