import React, { useState, useContext } from "react";
import Content from "../../../Components/Content";
import { UilUser } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";
import { UilCompass } from "@iconscout/react-unicons";
import { UilMoneyWithdraw } from "@iconscout/react-unicons";
import { UilGold } from "@iconscout/react-unicons";
import { userObjectContext } from "../../../Context";
import Input from "../../../Components/Input";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function Repair() {
	const isConsumer = useContext(userObjectContext)[5];
	const userObject = useContext(userObjectContext)[0];
	const updateUser = useContext(userObjectContext)[2];
	const [phone, setPhone] = useState(userObject.phone);
	const [firstName, setFirstName] = useState(userObject.firstName);
	const [lastName, setLastName] = useState(userObject.lastName);
	const [email, setEmail] = useState(userObject.email);
	const [city, setCity] = useState(userObject.city);
	const [pincode, setPincode] = useState(userObject.pincode);
	const [address, setAddress] = useState(userObject.address);
	const [gst, setGST] = useState(userObject.gst);
	const [pan, setPAN] = useState(userObject.pan);
	return (
		<Content heading="Request Repair">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					marginTop: "10px",
				}}
			>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					update={setFirstName}
					value={firstName}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="Last Name"
					type="text"
					placeholder="Enter Last Name"
					update={setLastName}
					value={lastName}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="Phone Number"
					type="number"
					placeholder="Enter Phone Number"
					update={setPhone}
					value={phone}
					width="48%"
				>
					<UilPhone />
				</Input>
				<Input
					heading="Email Address"
					type="text"
					placeholder="Enter Email"
					value={email}
					width="48%"
				>
					<UilEnvelope />
				</Input>
				<Input
					heading="City"
					type="text"
					placeholder="Enter City"
					update={setCity}
					value={city}
					width="48%"
				>
					<UilMap />
				</Input>
				<Input
					heading="Pincode"
					type="number"
					placeholder="Enter Pincode"
					update={setPincode}
					value={pincode}
					width="48%"
				>
					<UilCompass />
				</Input>
				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
				>
					Request Repair
				</button>
			</div>
		</Content>
	);
}

export default Repair;
