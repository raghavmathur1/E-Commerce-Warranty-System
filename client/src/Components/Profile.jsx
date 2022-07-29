import React, { useState, useContext } from "react";
import Content from "./Content";
import Input from "./Input";
import { UilUser } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";
import { UilCompass } from "@iconscout/react-unicons";
import { UilMoneyWithdraw } from "@iconscout/react-unicons";
import { UilGold } from "@iconscout/react-unicons";
import { userObjectContext } from "../Context";
import axios from "axios";
import { toast } from "wc-toast";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function Profile() {
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
	const updateProfile = async () => {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			address: address,
			pincode: pincode,
			city: city,
		};
		if (!isConsumer) {
			data.gst = gst;
			data.pan = pan;
		}
		const link =
			api_endpoint +
			"/api/" +
			userObject.type +
			"/update/" +
			userObject._id;
		const response = await axios({
			method: "put",
			url: link,
			data: data,
			withCredentials: true,
		});
		if (response.data.success) {
			toast.success("Profile Updated Successfully");
			updateUser(response.data.data);
		} else toast.error("Could Not Update Profile");
	};
	return (
		<Content heading={"Manage Profile"}>
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
					color="rgb(171 171 171)"
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
				{isConsumer && (
					<Input
						heading="Address"
						type="text"
						placeholder="Enter Address"
						update={setAddress}
						value={address}
						width="100%"
					>
						<UilLocationPoint />
					</Input>
				)}
				{!isConsumer && (
					<Input
						heading="GSTIN Number"
						type="text"
						placeholder="Enter GST Number"
						update={setGST}
						value={gst}
						width="48%"
					>
						<UilGold />
					</Input>
				)}
				{!isConsumer && (
					<Input
						heading="PAN Number"
						type="text"
						placeholder="Enter PAN Number"
						update={setPAN}
						value={pan}
						width="48%"
					>
						<UilMoneyWithdraw />
					</Input>
				)}
				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
					onClick={updateProfile}
				>
					Update Profile
				</button>
			</div>
		</Content>
	);
}

export default React.memo(Profile);
