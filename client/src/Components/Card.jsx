import React from "react";

function Card(props) {
	return (
		<div
			className="card"
			style={{
				padding: props.padding,
				margin: props.margin,
				width: props.width,
				minWidth: props.minWidth,
			}}
		>
			{props.blue === "true" && (
				<div className="topblue">{props.blueText}</div>
			)}
			{props.children}
		</div>
	);
}

export default React.memo(Card);
