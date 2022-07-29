import React, { useState, useEffect } from "react";
import Input from "../../Components/Input";
import classes from "./login.module.css";
import Card from "../../Components/Card";
import { login } from "../../Actions/Login";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilKeySkeleton } from "@iconscout/react-unicons";
import Topbar from "../../Components/Topbar";
import { toast } from "wc-toast";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localAuth, setLocalAuth] = useState(null);
	const navigate = useNavigate();
	const submitLogin = async () => {
		toast.promise(
			new Promise(async (resolve, reject) => {
				const isLoginSuccess = await login(email, password, props.user);
				if (isLoginSuccess === false) {
					reject("Login Failed");
				} else {
					setLocalAuth(isLoginSuccess);
					resolve("Login Successful");
				}
			}),
			{
				loading: "Authenticating...",
				success: "Authentication success!",
				error: "Authentication failed!",
			}
		);
		// const isLoginSuccess = await login(email, password, props.user);
		// setLocalAuth(isLoginSuccess);
	};

	const goToSignup = () => {
		if (props.user === "consumer") {
			navigate("/consumer/signup");
		}
		if (props.user === "retailer") {
			navigate("/retailer/signup");
		}
	};
	useEffect(() => {
		if (localAuth === true) {
			window.open("/", "_self");
		} else if (localAuth === false) {
			setPassword("");
		} else {
		}
	}, [localAuth]);

	return (
		<div className={`full ${classes.page}`}>
			<Topbar user={props.user} />
			<div className={classes["left"]}>
				<div className={classes["black"]}></div>
				{props.user === "consumer" && (
					<div className={classes["conPhoto"]}></div>
				)}

				{props.user === "retailer" && (
					<div className={classes["retPhoto"]}></div>
				)}
			</div>
			<div className={classes["right"]}>
				<Card
					padding="11vh 3vw 4vh 3vw"
					margin="0 0 0 0px"
					blue="true"
					blueText="Login"
					minWidth="250px"
					id={classes["loginCard"]}
				>
					<div className={`${classes.signupCard}`}>
						<Input
							heading="Email Address"
							type="text"
							placeholder="Enter Email"
							update={setEmail}
							width="100%"
						>
							<UilEnvelope />
						</Input>

						<Input
							heading="Password"
							type="password"
							placeholder="Enter Password"
							update={setPassword}
							width="100%"
						>
							<UilKeySkeleton />
						</Input>
						<button
							className="button"
							style={{
								margin: "20px auto 0 auto",
								fontSize: "16px",
								padding: "10px 45px",
							}}
							onClick={submitLogin}
						>
							Login
						</button>
					</div>
					<div className={classes["text"]}>
						Don’t have an account?{" "}
						<span
							className={classes["blueText"]}
							onClick={() => goToSignup()}
						>
							Sign up here
						</span>
					</div>
					{/* <div className={classes["blueTextLight"]}>
						Forgot Password
					</div> */}
				</Card>
			</div>
		</div>
	);
}

export default React.memo(Login);
