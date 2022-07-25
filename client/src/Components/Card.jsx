import React from "react";

function Card(props) {
	return (
		<div
			className="card"
			style={{
				padding: props.padding,
				margin: props.margin,
				width: props.width,
				height: props.height,
				minWidth: props.minWidth,
				minHeight: props.minHeight,
			}}
			id={props.id}
			onClick={props.onClick}
		>
			{props.blue === "true" && (
				<div className="topblue">{props.blueText}</div>
			)}
			{props.children}
		</div>
	);
}

export default React.memo(Card);
