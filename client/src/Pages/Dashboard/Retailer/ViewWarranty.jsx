import React, { useEffect, useState } from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilFilesLandscapesAlt } from "@iconscout/react-unicons";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import QRScan from "qrscan";
import Load from "../../../Components/Load";
import Loader from "react-js-loader";
import WarrantyCard from "../Consumer/Warranty/WarrantyCard";
let blue = require("../../../assets/blue.jpg");
let purple = require("../../../assets/purple.jpg");
let red = require("../../../assets/red.jpg");
const test = {
	data: {
		productName: "Test",
		serialNo: "",
		description: "This is a Test Product",
		price: "50000",
		discount: "25",
		warranty: "",
		retailer: "62e14e57b20d3d4e7b8ddb9d",
		fileURl:
			"https://ipfs.infura.io/ipfs/QmVJ9bAxRqHaKcjm5vnobHoQcs9mqx6iA5Lu2b7Fn6zn8v",
	},
	productID: "7",
	retailer: {
		_id: "62e14e57b20d3d4e7b8ddb9d",
		firstName: "R",
		lastName: "M",
		email: "raghav@gmail.com",
		phone: "123",
		pincode: "21",
		city: "Delhl",
		gst: "123123",
		pan: "123123",
		password:
			"$2b$10$jk5UbOe3nzyaHUGxTK7Js.Ui9TOnKsKrLwnUAkSoKOg0akVWGYHx6",
		type: "retailer",
		__v: 0,
	},
	warranty: ["5", "7", "365", "raghav3501@gmail.com", "1659013524"],
};

function ViewWarranty() {
	const [backgrounds, setBackground] = useState([red, blue, purple]);
	const [value, setValue] = useState("");
	const [scan, setScan] = useState(false);
	const [data, setData] = useState("");

	const onFind = (info) => {
		setValue(info);
		setScan(false);
	};

	useEffect(() => {
		if (!(data === "")) {
			setValue(data);
			setScan(false);
		}
	}, [data]);

	useEffect(() => {
		console.log(value);
	}, [value]);

	const backgroundArr = [
		{
			background: `url(${backgrounds[[1]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
		{
			background: `url(${backgrounds[[0]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
		{
			background: `url(${backgrounds[[2]]})`,
			backgroundSize: "cover",
			backgroundPosition: "center center",
		},
	];
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

			<div
				style={{
					margin: "0 auto",
					textAlign: "center",
					fontWeight: "500",
				}}
			>
				OR
			</div>

			<button
				className="button"
				style={{
					margin: "20px 0",
					fontSize: "13px",
					padding: "10px 35px",
				}}
				onClick={() => setScan(!scan)}
			>
				Open/Close Scanner
			</button>
			{scan === true && (
				<BarcodeScannerComponent
					width={300}
					height={300}
					onUpdate={(err, result) => {
						if (result) setData(result.text);
						else setData("");
					}}
				/>
			)}

			{/* <div
				style={{
					// width: "100%",
					// height: "300px",
					padding: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					border: "0.5px solid #c4c4c4",
					borderRadius: "6px",
				}}
			> */}
			{/* <Loader
				type="spinner-default"
				bgColor={"#000000"}
				color={"#000000"}
				size={50}
			/> */}
			<WarrantyCard
				item={test}
				style={backgroundArr[parseInt(test.productID) % 3]}
			></WarrantyCard>
			{/* </div> */}
		</Content>
	);
}

export default ViewWarranty;
