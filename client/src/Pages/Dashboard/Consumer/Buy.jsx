import React from "react";
import Card from "../../../Components/Card";
import classes from "./buy.module.css";
function Buy() {
	return (
		<div className={classes["buyContainer"]}>
			<div className={classes["left"]}>
				<Card
					height="45vh"
					width="36vh"
					padding="2vh"
					id={classes["photo"]}
				>
					<div className={classes["photo"]}></div>
					<div className={classes["buttons"]}>
						<button
							className="button"
							style={{
								margin: "0px 0",
								fontSize: "15px",
								padding: "10px 25px",
							}}
						>
							Buy Product
						</button>
						<button
							className="button"
							style={{
								margin: "0px 0",
								fontSize: "15px",
								padding: "10px 25px",
							}}
						>
							Add To Cart
						</button>
					</div>
				</Card>
			</div>
			<div className={classes["right"]}>
				<Card height="60vh" width="25vw"></Card>
			</div>
		</div>
	);
}
export default Buy;
