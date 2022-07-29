import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
	let handleFunction = (event) => {
		props.update(event.target.value);
	};

	if (props.type === "file") {
		handleFunction = props.onChange;
	}
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
					onChange={handleFunction}
					value={props.value}
					list={props.list}
					accept={props.accept}
					style={{ color: props.color }}
				/>
			</div>
		</div>
	);
};

export default React.memo(Input);
