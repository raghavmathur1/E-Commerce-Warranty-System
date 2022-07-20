import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userObjectContext = createContext({});

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const Context = (props) => {
	const [userObject, setUserObject] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [isConsumer, setIsConsumer] = useState(null);
	const updateContext = () => {
		axios
			.get(api_endpoint + "/user/data", {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data) {
					console.log(response.data);
					setUserObject(response.data);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			});
	};
	useEffect(() => {
		updateContext();
	}, []);

	useEffect(() => {
		if (userObject.type === "consumer") {
			setIsConsumer(true);
		} else if (userObject.type === "retailer") {
			setIsConsumer(false);
		} else setIsConsumer(null);
	}, [userObject]);
	return (
		<userObjectContext.Provider
			value={[
				userObject,
				isAuthenticated,
				setUserObject,
				setIsConsumer,
				updateContext,
				isConsumer,
			]}
		>
			{props.children}
		</userObjectContext.Provider>
	);
};

export default Context;
