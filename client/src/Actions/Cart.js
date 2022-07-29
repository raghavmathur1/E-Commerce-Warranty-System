import axios from "axios";

export const getCart = async () => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + "/api/products/getCart";
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		const cart = JSON.parse(response.data.data);
		return cart;
	} catch (error) {
		console.log(error);
	}
};

export const updateCart = async (cart) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + "/api/products/updateCart";
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: url,
			data: { cartString: cart },
		});
		return true;
	} catch (error) {
		console.log(error);
	}
};
