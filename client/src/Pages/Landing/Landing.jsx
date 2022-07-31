import React, { useContext } from "react";
import { userObjectContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import AllProducts from "../Dashboard/Consumer/AllProducts";
import classes from "./landing.module.css";
function Landing() {
	const userObject = useContext(userObjectContext)[0];
	const navigate = useNavigate();
	if (userObject.type === "consumer") {
		return navigate("/dashboard", { replace: true });
	} else if (userObject.type === "retailer") {
		navigate("/dashboard", { replace: true });
	} else {
		return (
			<div className={classes["landingContainer"]}>
				<div className={classes["links"]}>
					<div
						className={classes["circCont"]}
						onClick={() =>
							navigate("./consumer/login", { replace: true })
						}
					>
						<div className={classes["circle"]}></div>
						<div className={classes["user"]}>Consumer</div>
					</div>

					<div className={classes["line"]}></div>
					<div
						className={classes["circCont"]}
						onClick={() =>
							navigate("./retailer/login", { replace: true })
						}
					>
						<div className={classes["circle2"]}></div>
						<div className={classes["user"]}>Retailer</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Landing;
