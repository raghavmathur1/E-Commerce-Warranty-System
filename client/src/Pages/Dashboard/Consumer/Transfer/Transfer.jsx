import React from "react";
import Content from "../../../../Components/Content";
import Input from "../../../../Components/Input";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilCreditCardSearch } from "@iconscout/react-unicons";
function Transfer() {
	return (
		<Content heading="Transfer Product">
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					margin: "10px 0",
				}}
			>
				<Input
					heading="Email of Recipient"
					type="text"
					placeholder="Enter Recipient Email"
					width="60%"
				>
					<UilEnvelope />
				</Input>

				<Input
					heading="Warranty Id"
					type="text"
					placeholder="Enter Product Id"
					width="35%"
				>
					<UilCreditCardSearch />
				</Input>
				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
				>
					Transfer Product
				</button>
			</div>
		</Content>
	);
}
export default Transfer;
