import React, { useContext } from "react";
import { userObjectContext } from "../../Context";
import Consumer from "./Consumer/Consumer";
import Retailer from "./Retailer/Retailer";
function Home() {
	const isConsumer = useContext(userObjectContext)[5];
	const userObject = useContext(userObjectContext)[0];
	if (userObject.size === 0) {
		return <div>Login Please</div>;
	} else {
		if (userObject.type === "consumer") {
			return <Consumer />;
		} else if (isConsumer === false) {
			return <Retailer />;
		} else {
			return <div>Login Please</div>;
		}
	}
}

export default React.memo(Home);
