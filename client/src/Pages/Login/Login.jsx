import React, { useState, useEffect } from "react";
import Input from "../../Components/Input";
import classes from "./login.module.css";
import Card from "../../Components/Card";
import { login } from "../../Actions/Login";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilKeySkeleton } from "@iconscout/react-unicons";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localAuth, setLocalAuth] = useState(null);
	const submitLogin = async () => {
		const isLoginSuccess = await login(email, password, props.user);
		setLocalAuth(isLoginSuccess);
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
			<div className={classes["left"]}></div>
			<div className={classes["right"]}>
				<Card
					padding="11vh 3vw 4vh 3vw"
					margin="0 0 0 0px"
					width="25vw"
					blue="true"
					blueText="Login"
					minWidth="200px"
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
						<span className={classes["blueText"]}>
							Sign up here
						</span>
					</div>
					<div className={classes["blueTextLight"]}>
						Forgot Password
					</div>
				</Card>
			</div>
		</div>
	);
}

export default React.memo(Login);
