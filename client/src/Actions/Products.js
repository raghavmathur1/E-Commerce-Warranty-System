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
export const buyProducts = async (productDetails) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + "/api/products/buyProducts";
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: url,
			data: { data: productDetails },
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getUserProductDetails = async () => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			"/api/products/getUserProducts";
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllWarranty = async () => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT + "/api/products/getAllWarranty";
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const getWarrantyById = async (warrantyID) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			`/api/products/getWarranty/${warrantyID}`;
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		// const products = JSON.parse(response.data.data);
		// console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const verifyWarranty = async (productID) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			`/api/products/checkWarranty/${productID}`;
		const response = await axios({
			method: "GET",
			withCredentials: true,
			url: url,
		});
		console.log(response);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const transferProduct = async (toEmail, productID) => {
	try {
		const url =
			process.env.REACT_APP_API_ENDPOINT +
			`/api/products/transferProduct`;
		const response = await axios({
			method: "POST",
			withCredentials: true,
			url: url,
			data: {
				toEmail: toEmail,
				productID: productID,
			},
		});
		console.log(response);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
