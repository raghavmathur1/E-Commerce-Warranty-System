import React, { useEffect, useState } from "react";
import Input from "../../Components/Input";
import classes from "./signup.module.css";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";
import { UilUser } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";
import { UilCompass } from "@iconscout/react-unicons";
import { UilKeySkeleton } from "@iconscout/react-unicons";
import { UilMoneyWithdraw } from "@iconscout/react-unicons";
import { UilGold } from "@iconscout/react-unicons";
import { signup } from "../../Actions/Signup";
import Loader from "react-js-loader";
import { Navigate } from "react-router-dom";
import Topbar from "../../Components/Topbar";
import { toast } from "wc-toast";
function Signup(props) {
	const navigate = useNavigate();
	const [style, setStyle] = useState({ display: "none" });
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [pincode, setPincode] = useState("");
	const [address, setAddress] = useState("");
	const [gst, setGST] = useState("");
	const [pan, setPAN] = useState("");
	const submitSignup = async () => {
		setStyle({ display: "flex" });
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			address: address,
			pincode: pincode,
			city: city,
			password: password,
		};
		if (props.user === "retailer") {
			data.gst = gst;
			data.pan = pan;
		}
		const response = await signup(data, props.user, rePassword);
		setStyle({ display: "none" });
		console.log(response.status);
		if (response.success === true) {
			toast.success("Signup Successful");
			navigate("/" + props.user + "/login", { replace: true });
		} else {
			toast.error("Signup unsuccessful");
		}
	};
	return (
		<div className={`full ${classes.page}`}>
			<Topbar />
			<Card
				padding="11vh 4vw 4vh 4vw"
				margin="0 0 0 0px"
				width="40vw"
				blue="true"
				blueText="Signup"
				minWidth="400px"
			>
				<div className={`${classes.signupCard}`}>
					<Input
						heading="First Name"
						type="text"
						placeholder="Enter First Name"
						update={setFirstName}
						width="48%"
					>
						<UilUser />
					</Input>
					<Input
						heading="Last Name"
						type="text"
						placeholder="Enter Last Name"
						update={setLastName}
						width="48%"
					>
						<UilUser />
					</Input>
					<Input
						heading="Phone Number"
						type="number"
						placeholder="Enter Phone Number"
						update={setPhone}
						width="48%"
					>
						<UilPhone />
					</Input>
					<Input
						heading="Email Address"
						type="text"
						placeholder="Enter Email"
						update={setEmail}
						width="48%"
					>
						<UilEnvelope />
					</Input>
					<Input
						heading="City"
						type="text"
						placeholder="Enter City"
						update={setCity}
						width="48%"
					>
						<UilMap />
					</Input>
					<Input
						heading="Pincode"
						type="number"
						placeholder="Enter Pincode"
						update={setPincode}
						width="48%"
					>
						<UilCompass />
					</Input>
					{props.user === "consumer" && (
						<Input
							heading="Address"
							type="text"
							placeholder="Enter Address"
							update={setAddress}
							width="100%"
						>
							<UilLocationPoint />
						</Input>
					)}
					{props.user === "retailer" && (
						<Input
							heading="GSTIN Number"
							type="text"
							placeholder="Enter GST Number"
							update={setGST}
							width="48%"
						>
							<UilGold />
						</Input>
					)}
					{props.user === "retailer" && (
						<Input
							heading="PAN Number"
							type="text"
							placeholder="Enter PAN Number"
							update={setPAN}
							width="48%"
						>
							<UilMoneyWithdraw />
						</Input>
					)}
					<Input
						heading="Password"
						type="password"
						placeholder="Enter Password"
						update={setPassword}
						width="48%"
					>
						<UilKeySkeleton />
					</Input>
					<Input
						heading="Re-Enter Password"
						type="password"
						placeholder="Re-Enter Password"
						update={setRePassword}
						width="48%"
					>
						<UilKeySkeleton />
					</Input>

					<button
						className="button"
						style={{
							margin: "20px auto",
							fontSize: "18px",
							padding: "10px 35px",
						}}
						onClick={submitSignup}
					>
						<div className="loader" style={style}>
							<Loader
								type="spinner-default"
								bgColor={"#FFFFFF"}
								color={"#FFFFFF"}
								size={30}
							/>
						</div>
						Register
					</button>
				</div>
			</Card>
		</div>
	);
}

export default React.memo(Signup);
