import axios from "axios";
import validator from "validator";

export const login = async (email, password, user) => {
	try {
		//Validate email address
		if (!validator.isEmail(email)) return false;
		const url = process.env.REACT_APP_API_ENDPOINT + "/api/login/" + user;
		const response = await axios({
			method: "POST",
			data: {
				email: email,
				password: password,
			},
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
			url: url,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};
