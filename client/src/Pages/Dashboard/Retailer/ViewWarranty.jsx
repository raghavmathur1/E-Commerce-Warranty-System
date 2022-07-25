import React from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilFilesLandscapesAlt } from "@iconscout/react-unicons";
function ViewWarranty() {
	return (
		<Content heading="View Warranty">
			<Input
				heading="View Warranty"
				type="text"
				placeholder="Enter Warranty ID"
				width="100%"
			>
				<UilFilesLandscapesAlt />
			</Input>
			<button
				className="button"
				style={{
					margin: "20px 0",
					fontSize: "13px",
					padding: "10px 35px",
				}}
			>
				View
			</button>
		</Content>
	);
}

export default ViewWarranty;
