import axios from "axios";
import validator from "validator";

export const login = async (email, password, user) => {
	try {
		//Validate email address
		if (!validator.isEmail(email)) return false;
		const url = process.env.REACT_APP_API_ENDPOINT + "/api/login/" + user;
		const config = {
			headers: {
				"Content-Type": "application/json",
				withCredentials: true,
			},
		};
		const response = await axios.post(
			url,
			{
				email: email,
				password: password,
			},
			config
		);
        console.log(response.data["success"]);

        return response.data["success"];

	} catch (error) {
		console.log(error);
		return false;
	}
};
