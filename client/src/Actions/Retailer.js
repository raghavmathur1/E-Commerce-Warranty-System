import axios from "axios";

export const getTransactions = async (productId) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			`/api/retailer/getTransactions`;
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return {};
	}
};
export const getBankBalance = async () => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + `/api/retailer/getBalance`;
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return {};
	}
};
