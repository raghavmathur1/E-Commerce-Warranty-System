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
import { toast } from "wc-toast";
import { UilCalendarAlt } from "@iconscout/react-unicons";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function Products() {
	const userObject = useContext(userObjectContext)[0];
	const [productName, setProductName] = useState(null);
	const [description, setDescription] = useState(null);
	const [price, setPrice] = useState();
	const [discount, setDiscount] = useState(null);
	const [file, setFile] = useState("");
	const saveFile = (e) => {
		setFile(e.target.files[0]);
	};
	const addProduct = async () => {
		const link = api_endpoint + "/api/products/add";
		const formData = new FormData();
		formData.append("productName", productName);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("discount", discount);
		formData.append("retailer", userObject._id);
		formData.append("file", file);
		console.log(productName, description, price, discount, file);
		if (!(productName && description && price && discount && file)) {
			toast.error("Please fill all the fields");
			return;
		}

		if (discount > 100 || discount < 0) {
			toast.error("Discount should be between 0 and 100");
			return;
		}

		if (file === undefined) {
			toast.error("Please upload a file");
			return;
		}

		toast.promise(
			new Promise(async (resolve, reject) => {
				const response = await axios({
					method: "POST",
					data: formData,
					withCredentials: true,
					url: link,
				});
				if (response.data.success === true) {
					resolve("Successfully Added Product");
				} else reject("Something went wrong");
			}),
			{
				loading: "Adding Product",
				success: "Product Added Successfully",
				error: "Could not Add Product",
			}
		);
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
					required={true}
				>
					<UilPackage />
				</Input>
				<Input
					heading="Upload Product Image"
					type="file"
					placeholder="Upload"
					onChange={(e) => saveFile(e)}
					width="48%"
					accept="image/*"
					required={true}
				>
					<UilImageUpload />
				</Input>

				<Input
					heading="Description"
					type="text"
					placeholder="Enter Description"
					update={setDescription}
					width="100%"
					required={true}
				>
					<UilFileInfoAlt />
				</Input>
				<Input
					heading="Price"
					type="number"
					placeholder="Enter Price"
					update={setPrice}
					width="48%"
					required={true}
				>
					<UilInvoice />
				</Input>
				<Input
					heading="Discount"
					type="number"
					placeholder="Enter Discount Percentage"
					update={setDiscount}
					required={true}
					width="48%"
				>
					<UilPercentage />
				</Input>
				{/* <Input
					heading="Warranty Expiry Time (in Days)"
					type="number"
					placeholder="Enter Days"
					update={setExpiryTime}
					width="30%"
					required={true}
				>
					<UilCalendarAlt />
				</Input> */}

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
