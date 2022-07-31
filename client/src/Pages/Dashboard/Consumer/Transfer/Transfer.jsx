import { React, setState, useState } from "react";
import Content from "../../../../Components/Content";
import Input from "../../../../Components/Input";
import { UilEnvelope } from "@iconscout/react-unicons";
import { UilCreditCardSearch } from "@iconscout/react-unicons";
import { transferProduct } from "../../../../Actions/Products";
import { toast } from "wc-toast";
function Transfer() {
	const [toEmail, setToEmail] = useState("");
	const [productID, setProductID] = useState(0);
	const onSubmit = async () => {
		console.log(toEmail, productID);
		toast.promise(
			new Promise(async (resolve, reject) => {
				const response = await transferProduct(toEmail, productID);
				console.log(response);
				if (response === true) resolve();
				else reject();
			}),
			{
				loading: "Transfering Product",
				success: "Transfered Successfully",
				error: "Could not Transfer",
			}
		);
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
			<div className="disclaimer">
				<div>Disclaimer:</div>
				<div className="message">
					The email of the recipent should already be registered on
					the website for a warranty transfer to take place.
					<br />
					<br />
					<b>
						Please ensure that the recipient has registered on the
						platform.
					</b>
				</div>
			</div>
		</Content>
	);
}
export default Transfer;
