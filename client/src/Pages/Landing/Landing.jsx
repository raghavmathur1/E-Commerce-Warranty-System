import React, { useContext } from "react";
import { userObjectContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import AllProducts from "../Dashboard/Consumer/AllProducts";
function Landing() {
	const userObject = useContext(userObjectContext)[0];
	const navigate = useNavigate();
	if (userObject.type === "consumer") {
		return <AllProducts />;
	} else if (userObject.type === "retailer") {
		navigate("/dashboard", { replace: true });
	} else {
		return <div>Login Please</div>;
	}
}
export default Landing;
