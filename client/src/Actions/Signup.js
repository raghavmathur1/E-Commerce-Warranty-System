import axios from "axios";
import validator from "validator";

export const signup = async (data, user, rePassword) => {
	try {
		//Validate email address
		if (!validator.isEmail(data.email)) {
			console.log("Asd");
			return false;
		}
		console.log(data.password, rePassword);
		if (data.password === rePassword && data.password !== "") {
			const url =
				process.env.REACT_APP_API_ENDPOINT + "/api/signup/" + user;
			const response = await axios({
				method: "POST",
				data: data,
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
				url: url,
			});
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};
