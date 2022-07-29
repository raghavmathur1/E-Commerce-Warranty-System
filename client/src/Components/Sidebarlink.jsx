import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UilStore } from "@iconscout/react-unicons";
import classes from "./sidebar.module.css";
import { UilFilesLandscapesAlt } from "@iconscout/react-unicons";
import { UilUserCircle } from "@iconscout/react-unicons";
import { UilWrench } from "@iconscout/react-unicons";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { UilSignout } from "@iconscout/react-unicons";
import { UilPlusCircle } from "@iconscout/react-unicons";
import { UilMoneyWithdraw } from "@iconscout/react-unicons";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { UilShoppingCartAlt } from "@iconscout/react-unicons";
import { UilExchange } from "@iconscout/react-unicons";
function Sidebarlink(props) {
	let a = useParams();
	const link = a["*"];
	let color = "#999797";
	let weight = "400";
	if (link === props.link) {
		color = "#2974F1";
		weight = "600";
	}
	const style = { color: color, fontWeight: weight };
	const navigate = useNavigate();
	let icon;
	if (props.link === "products")
		icon = <UilStore color={color} className={classes["blueicon"]} />;
	if (props.link === "transfer")
		icon = <UilExchange color={color} className={classes["blueicon"]} />;
	if (props.link === "profile")
		icon = <UilUserCircle color={color} className={classes["blueicon"]} />;
	if (props.link === "repair")
		icon = <UilWrench color={color} className={classes["blueicon"]} />;
	if (props.link === "shop")
		icon = <UilShoppingBag color={color} className={classes["blueicon"]} />;
	if (props.link === "cart")
		icon = (
			<UilShoppingCartAlt color={color} className={classes["blueicon"]} />
		);
	if (props.link === "warranty")
		icon = (
			<UilFilesLandscapesAlt
				color={color}
				className={classes["blueicon"]}
			/>
		);
	if (props.link === "manage")
		icon = (
			<UilFilesLandscapesAlt
				color={color}
				className={classes["blueicon"]}
			/>
		);
	if (props.link === "money")
		icon = (
			<UilMoneyWithdraw color={color} className={classes["blueicon"]} />
		);
	if (props.link === "add")
		icon = <UilPlusCircle color={color} className={classes["blueicon"]} />;
	if (props.link === "logout") {
		color = "#FB7878";
		icon = <UilSignout color={color} />;
	}

	const navigationLink = () => {
		if (props.navigation === "false") return;
		navigate("./" + props.link, { replace: true });
	};
	return (
		<div>
			<div
				className={classes["top"]}
				style={style}
				onClick={navigationLink}
				id={props.id}
			>
				<div className={classes["sideLink"]}>
					<div className={classes["icon"]}>{icon}</div>
					<div className={classes["sideText"]}>{props.text}</div>
				</div>
				{link === props.link && (
					<UilAngleRightB className={classes["rightCaret"]} />
				)}
			</div>
		</div>
	);
}

export default React.memo(Sidebarlink);
