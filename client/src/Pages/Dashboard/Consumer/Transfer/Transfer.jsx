import { React, setState, useState } from "react";
import Content from "../../../../Components/Content";
import Input from "../../../../Components/Input";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilCreditCardSearch } from "@iconscout/react-unicons";
import { transferProduct } from "../../../../Actions/Products";
function Transfer() {
	const [toEmail, setToEmail] = useState("");
	const [productID, setProductID] = useState(0);
	const onSubmit = () => {
		console.log(toEmail, productID);
		transferProduct(toEmail, productID).then((res) => {});
	};
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
					update={setToEmail}
				>
					<UilEnvelope />
				</Input>

				<Input
					heading="Product Id"
					type="text"
					placeholder="Enter Product Id"
					width="35%"
					update={setProductID}
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
					onClick={onSubmit}
				>
					Transfer Product
				</button>
			</div>
		</Content>
	);
}
export default Transfer;
