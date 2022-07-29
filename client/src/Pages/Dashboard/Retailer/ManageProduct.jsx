import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilPostcard } from "@iconscout/react-unicons";
import { UilDialpad } from "@iconscout/react-unicons";
import { UilPercentage } from "@iconscout/react-unicons";
import { UilImageUpload } from "@iconscout/react-unicons";
import { UilInvoice } from "@iconscout/react-unicons";
import { UilPackage } from "@iconscout/react-unicons";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import { UilCalendarAlt } from "@iconscout/react-unicons";

import { toast } from "wc-toast";
import axios from "axios";
import { getProducts } from "../../../Actions/Products";
import { userObjectContext } from "../../../Context";
import Load from "../../../Components/Load";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function ManageProducts() {
	const parameters = useParams();
	const productId = parameters["*"];

	const userObject = useContext(userObjectContext)[0];
	const [productName, setProductName] = useState("");
	const [expiry, setExpiryTime] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [discount, setDiscount] = useState();
	const [file, setFile] = useState();
	const [data, setData] = useState(null);
	const saveFile = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
		getProducts(productId).then((res) => {
			setProductName(res.data.productName);
			setDescription(res.data.description);
			setPrice(res.data.price);
			setDiscount(res.data.discount);
			setExpiryTime(res.data.expiryTime);
			setData(res.data);
		});
	}, []);

	const updateProduct = async () => {
		const link = api_endpoint + `/api/products/update/${productId}`;
		const formData = new FormData();
		formData.append("productName", productName);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("expiryTime", expiry);
		formData.append("discount", discount);
		formData.append("retailer", userObject._id);
		if (!(productName && description && price && discount && expiry)) {
			toast.error("Please fill all the fields");
			return;
		}

		if (discount > 100 || discount < 0) {
			toast.error("Discount should be between 0 and 100");
			return;
		}

		if (expiry < 1) {
			toast.error("Expiry time should be greater than 1");
			return;
		}
		if (file === undefined) formData.append("fileURl", data.fileURl);
		else formData.append("file", file);

		toast.promise(
			new Promise(async (resolve, reject) => {
				const response = await axios({
					method: "PUT",
					data: formData,
					withCredentials: true,
					url: link,
				});
				if (response.data.success === true)
					resolve("Successfully Updated Product");
				else reject("Something went wrong");
			}),
			{
				loading: "Updating Product",
				success: "Product Updated Successfully!",
				error: "Could not Update Product",
			}
		);
	};

	if (productName === "") {
		return <Load heading="Manage Product" />;
	}
	return (
		<Content heading={"Manage Product"}>
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
					value={productName}
					width="48%"
					required={true}
				>
					<UilPackage />
				</Input>
				<Input
					heading="Upload Product Image(Otherwise it will be same)"
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
					value={description}
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
					value={price}
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
					value={discount}
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
					value={expiry}
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
					onClick={updateProduct}
				>
					Update Product
				</button>
			</div>
		</Content>
	);
}

export default React.memo(ManageProducts);
