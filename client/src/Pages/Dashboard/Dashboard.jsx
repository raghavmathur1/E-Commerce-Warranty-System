import React, { useContext } from "react";
import { userObjectContext } from "../../Context";
import Consumer from "./Consumer/Consumer";
import Retailer from "./Retailer/Retailer";
export default function Home() {
	const isConsumer = useContext(userObjectContext)[5];
	if (isConsumer === true) {
		return <Consumer />;
	} else if (isConsumer === false) {
		return <Retailer />;
	} else {
		return <div>Login Please</div>;
	}
}
