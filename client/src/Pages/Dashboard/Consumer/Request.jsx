import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilCreditCard } from "@iconscout/react-unicons";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { verifyWarranty } from "../../../Actions/Products";
import { toast } from "wc-toast";
function Request() {
	const [productID, setProductID] = useState(0);
	const navigate = useNavigate();
	const onSubmit = () => {
		if (productID === 0 || isNaN(productID)) {
			toast.error("Please enter a valid product ID");
			return;
		}
		verifyWarranty(productID).then((res) => {
			if (res === false) {
				toast.error(
					"<center>You do not own this product<br>or<br>Warranty is expired</center>"
				);
			} else {
				toast.success(
					"Warranty Successfully Verified. <br> One of our executive will get in touch with you"
				);
			}
			console.log(res);
		});
	};
	return (
		<Content heading="Request Repair">
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				<Input
					heading="Product Id"
					type="text"
					placeholder="Enter Product Id"
					width="100%"
					required={true}
					update={setProductID}
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
					onClick={onSubmit}
				>
					Request Repair
				</button>
			</div>
		</Content>
	);
}

export default Request;
