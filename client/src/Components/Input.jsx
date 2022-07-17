import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
	return (
		<div
			className={classes["inputParent"]}
			style={{ maxWidth: props.width, minWidth: "240px" }}
		>
			{props.children}
			<div className={classes["inputWidth"]}>
				<div className={classes["inputHeading"]}>{props.heading}</div>
				<input
					className={classes["formInput"]}
					type={props.type}
					placeholder={props.placeholder}
					onChange={(e) => props.update(e.target.value)}
					value={props.value}
				/>
			</div>
		</div>
	);
};

export default React.memo(Input);
