import React from "react";
import Content from "./Content";
import Loader from "react-js-loader";
// import { Uil0Plus } from "@iconscout/react-unicons";
import { UilFolderMedical } from "@iconscout/react-unicons";
import { UilFolderQuestion } from "@iconscout/react-unicons";
function Empty(props) {
	return (
		<Content heading={props.heading}>
			<div
				className="loader"
				style={{
					width: "100%",
					height: "100%",
					marginLeft: "-30px",
					marginTop: "-50px",
					fontSize: "20px",
					color: "#c4c4c4",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<UilFolderQuestion
					style={{ margin: "10px auto" }}
					fill="#c4c4c4"
					size={40}
				/>
				{props.message}
			</div>
		</Content>
	);
}

export default Empty;
