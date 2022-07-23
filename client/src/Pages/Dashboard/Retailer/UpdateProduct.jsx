import React, { useState } from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilUser } from "@iconscout/react-unicons";
function UpdateProduct() {
	const [productName, setProductName] = useState("");
	return (
		<Content heading={"Add Products"}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					marginTop: "10px",
				}}
			>
				<Input
					heading="Product Name"
					type="text"
					placeholder="Enter Product Name"
					update={setProductName}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="100%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="48%"
				>
					<UilUser />
				</Input>
				<Input
					heading="First Name"
					type="text"
					placeholder="Enter First Name"
					// update={}
					width="48%"
				>
					<UilUser />
				</Input>
				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
					// onClick={submitSignup}
				>
					Update Product
				</button>
			</div>
		</Content>
	);
}

export default React.memo(UpdateProduct);
