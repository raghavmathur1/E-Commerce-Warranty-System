import React from "react";
import Content from "./Content";
import Loader from "react-js-loader";
function Load(props) {
	return (
		<Content heading={props.heading}>
			<div
				className="loader"
				style={{
					width: "100%",
					height: "100%",
					marginLeft: "-30px",
					marginTop: "-50px",
				}}
			>
				<Loader
					type="spinner-default"
					bgColor={"#000000"}
					color={"#000000"}
					size={50}
				/>
			</div>
		</Content>
	);
}

export default Load;
