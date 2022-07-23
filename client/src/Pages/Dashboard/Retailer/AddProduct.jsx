import React, { useState, useContext } from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilPostcard } from "@iconscout/react-unicons";
import { UilDialpad } from "@iconscout/react-unicons";
import { UilPercentage } from "@iconscout/react-unicons";
import { UilImageUpload } from "@iconscout/react-unicons";
import { UilInvoice } from "@iconscout/react-unicons";
import { UilPackage } from "@iconscout/react-unicons";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import axios from "axios";
import { userObjectContext } from "../../../Context";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function Products() {
	const userObject = useContext(userObjectContext)[0];
	const [productName, setProductName] = useState("");
	const [serialNo, setSerialNo] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [warranty, setWarranty] = useState("");
	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState("");
	const saveFile = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};
	const addProduct = () => {
		console.log(file);
		const productDetails = {
			productName: productName,
			serialNo: serialNo,
			description: description,
			price: price,
			discount: discount,
			warranty: warranty,
			file: file,
			fileName: fileName,
			retailer: userObject._id,
		};
		axios
			.post(api_endpoint + "/api/products/add", productDetails)
			.then((response) => console.log(response.data));
	};
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
					<UilPackage />
				</Input>
				<Input
					heading="Product Serial Number"
					type="text"
					placeholder="Enter Serial Number"
					update={setSerialNo}
					width="48%"
				>
					<UilDialpad />
				</Input>
				<Input
					heading="Description"
					type="text"
					placeholder="Enter Description"
					update={setDescription}
					width="100%"
				>
					<UilFileInfoAlt />
				</Input>
				<Input
					heading="Price"
					type="text"
					placeholder="Enter Price"
					update={setPrice}
					width="48%"
				>
					<UilInvoice />
				</Input>
				<Input
					heading="Discount"
					type="text"
					placeholder="Enter Discount Percentage"
					update={setDiscount}
					width="48%"
				>
					<UilPercentage />
				</Input>
				<Input
					heading="Digital Warranty Included"
					type="text"
					placeholder="Yes/No"
					update={setWarranty}
					list="options"
					width="48%"
				>
					<datalist id="options">
						<option>Yes</option>
						<option>No</option>
					</datalist>
					<UilPostcard />
				</Input>
				<Input
					heading="Photo"
					type="file"
					placeholder="Upload"
					update={setFile}
					width="48%"
				>
					<UilImageUpload />
				</Input>
				<button
					className="button"
					style={{
						margin: "20px 0",
						fontSize: "18px",
						padding: "10px 35px",
					}}
					onClick={addProduct}
				>
					Add Product
				</button>
			</div>
		</Content>
	);
}

export default React.memo(Products);
