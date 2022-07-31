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
	console.log(props.user);
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
		if (
			!(
				password &&
				rePassword &&
				phone &&
				firstName &&
				lastName &&
				email &&
				city &&
				pincode
			)
		) {
			console.log("here`");
			toast.error("Please fill all the fields");
			return;
		}

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
			if (!gst || !pan) {
				toast.error("Please fill all the fields");
				return;
			}
			data.gst = gst;
			data.pan = pan;
		}
		if (props.user === "customer") {
			if (!address) {
				toast.error("Please fill all the fields");
				return;
			}
			data.address = address;
		}
		let response;
		toast.promise(
			new Promise(async (resolve, reject) => {
				response = await signup(data, props.user, rePassword);
				if (response.success === true) {
					resolve("Successfully Signed Up");
					navigate("/" + props.user + "/login", { replace: true });
				} else reject("Something went wrong");
			}),
			{
				loading: "Signing Up",
				success: "Signed Up Successfully",
				error: "Could not Signup",
			}
		);
	};

	const goToLogin = () => {
		if (props.user === "consumer") {
			navigate("/consumer/login");
		}
		if (props.user === "retailer") {
			navigate("/retailer/login");
		}
	};
	return (
		<div className={`full ${classes.page}`}>
			<Topbar user={props.user} />
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
						<div className="loader" style={style}></div>
						Register
					</button>
				</div>
				<div className={classes["text"]}>
					Already Have an Account?{" "}
					<span
						className={classes["blueText"]}
						onClick={() => goToLogin()}
					>
						Log in here
					</span>
				</div>
			</Card>
		</div>
	);
}

export default React.memo(Signup);
