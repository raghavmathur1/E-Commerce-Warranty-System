import React, { useEffect, useState } from "react";
import Content from "../../../Components/Content";
import Input from "../../../Components/Input";
import { UilFilesLandscapesAlt } from "@iconscout/react-unicons";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { getWarrantyById } from "../../../Actions/Products";
import QRScan from "qrscan";
import Load from "../../../Components/Load";
import Loader from "react-js-loader";
import WarrantyCard from "../Consumer/Warranty/WarrantyCard";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { UilCameraSlash } from "@iconscout/react-unicons";
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
	const [backendCalling, setbackendCalling] = useState(false);
	const [warrantyID, setWarratyID] = useState(0);
	const [warranty, setWarranty] = useState(null);
	const search = (warranty_ID) => {
		setbackendCalling(true);
		getWarrantyById(warranty_ID).then((res) => {
			if (res === null) {
				setWarranty(null);
			} else setWarranty(res.data.data);
			setbackendCalling(false);
		});
	};
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
		if (value !== "") {
			setScan(false);
			search(value);
		}
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
				update={setWarratyID}
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
				onClick={() => search(warrantyID)}
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
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				<button
					style={{
						margin: "20px 20px 20px 20px",
						fontSize: "13px",
						padding: "10px 35px",
						width: "400px",
						height: "300px",
						background: "#EFF0F6",
						border: "none",
						color: "#6E7191",
						fontWeight: "600",
						fontSize: "18px",
						letterSpacing: "2px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "6px",
					}}
					onClick={() => setScan(!scan)}
				>
					<UilQrcodeScan
						style={{
							marginRight: "10px",
							fill: "#2974F1",
							marginBottom: "20px",
						}}
						size={50}
					/>
					Scan the QR Code
				</button>
				<div
					style={{
						width: "400px",
						height: "300px",
						background: "#EFF0F6",
						margin: "20px",
						borderRadius: "6px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{scan === true ? (
						<BarcodeScannerComponent
							width={300}
							height={300}
							onUpdate={(err, result) => {
								if (result) setData(result.text);
								else setData("");
							}}
						/>
					) : (
						<UilCameraSlash
							size={50}
							style={{
								marginRight: "10px",
								fill: "#2974F1",
								marginBottom: "20px",
							}}
						/>
					)}
				</div>
			</div>
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
			{backendCalling ? (
				<Loader
					type="spinner-default"
					bgColor={"#000000"}
					color={"#000000"}
					size={50}
				/>
			) : (
				<div></div>
			)}
			{!backendCalling && warranty !== null ? (
				<WarrantyCard
					item={warranty}
					style={backgroundArr[parseInt(warranty.productID) % 3]}
				></WarrantyCard>
			) : (
				<div></div>
			)}

			{/* </div> */}
		</Content>
	);
}

export default ViewWarranty;
