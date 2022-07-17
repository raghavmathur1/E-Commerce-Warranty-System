import React, { useState } from "react";
import Input from "../../Components/Input";
import classes from "./signup.module.css";
import Card from "../../Components/Card";

import { UilEyeSlash } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import Button from "../../Components/Button";
function Signup() {
	const [rePassword, setRePassword] = useState("");
	return (
		<div className={`full ${classes.page}`}>
			<Card
				padding="11vh 4vw 2vh 4vw"
				margin="0 0 0 0px"
				width="50vw"
				blue="true"
				blueText="Signup"
				minWidth="400px"
			>
				<div className={`${classes.signupCard}`}>
					<Input
						heading="First Name"
						type="text"
						placeholder="Enter First Name"
						update={setRePassword}
						width="48%"
					>
						<UilUser />
					</Input>
					<Input
						heading="Last Name"
						type="text"
						placeholder="Enter Last Name"
						update={setRePassword}
						width="48%"
					>
						<UilUser />
					</Input>
					<Input
						heading="Re-enter Password"
						type="password"
						placeholder="Re-enter Password"
						update={setRePassword}
						width="48%"
					>
						<UilEyeSlash />
					</Input>
					<Input
						heading="Re-enter Password"
						type="password"
						placeholder="Re-enter Password"
						update={setRePassword}
						width="48%"
					>
						<UilEyeSlash />
					</Input>
					<Input
						heading="Re-enter Password"
						type="password"
						placeholder="Re-enter Password"
						update={setRePassword}
						width="48%"
					>
						<UilEyeSlash />
					</Input>
					<Input
						heading="Re-enter Password"
						type="password"
						placeholder="Re-enter Password"
						update={setRePassword}
						width="48%"
					>
						<UilEyeSlash />
					</Input>
					<Input
						heading="Re-enter Password"
						type="password"
						placeholder="Re-enter Password"
						update={setRePassword}
						width="100%"
					>
						<UilEyeSlash />
					</Input>
				</div>
				<Button />
			</Card>
		</div>
	);
}

export default Signup;
