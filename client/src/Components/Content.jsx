import React from "react";
import Card from "./Card";
function Content(props) {
	let style = {
		fontWeight: 700,
		fontSize: "25px",
		letterSpacing: "1px",
		marginTop: "20px",
		paddingTop: "20px",
	};
	return (
		<Card
			margin="30px 0 30px 0"
			padding="0px 30px 2vh 30px"
			minHeight="88vh"
			id={props.id}
		>
			<div style={style}>{props.heading}</div>
			{props.children}
		</Card>
	);
}

export default React.memo(Content);
