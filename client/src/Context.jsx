import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userObjectContext = createContext({});

const Context = (props) => {
	const [userObject, setUserObject] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	return (
		<userObjectContext.Provider
			value={[userObject, isAuthenticated, setUserObject]}
		>
			{props.children}
		</userObjectContext.Provider>
	);
};

export default Context;
