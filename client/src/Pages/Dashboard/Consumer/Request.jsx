import React from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilCreditCard } from "@iconscout/react-unicons";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
function Request() {
	return (
		<Content heading="Request Repair">
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				<Input
					heading="Product Id"
					type="text"
					placeholder="Enter Product Id"
					width="100%"
					required={true}
				>
					<UilCreditCard />
				</Input>

				<Input
					heading="Issue"
					type="text"
					placeholder="Enter Issue"
					width="100%"
					required={true}
				>
					<UilExclamationTriangle />
				</Input>

				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
				>
					Request Repair
				</button>
			</div>
		</Content>
	);
}

export default Request;
