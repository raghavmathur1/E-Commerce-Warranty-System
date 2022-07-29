import React, { useState, useContext } from "react";
import Card from "./Card";
import classes from "./sidebar.module.css";
import Sidebarlink from "./Sidebarlink";
import { userObjectContext } from "../Context";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
function Sidebar() {
	const isConsumer = useContext(userObjectContext)[5];
	const userObject = useContext(userObjectContext)[0];
	return (
		<div className={classes["sidebarContainer"]}>
			<Card
				padding="0vh 0vw 0vh 0vw"
				margin="30px 0 2vh 30px"
				width="18vw"
				height="8vh"
				minWidth="225px"
			>
				<div className={classes["name"]}>
					{userObject.firstName} {userObject.lastName}
				</div>
			</Card>
			<Card
				padding="0vh 0vw 0vh 0vw"
				margin="0 0 0 30px"
				width="18vw"
				height="80vh"
				minWidth="225px"
			>
				{isConsumer && (
					<div>
						<Sidebarlink text="Buy Products" link="shop" />
						<Sidebarlink text="My Products" link="products" />
						<Sidebarlink text="Manage Profile" link="profile" />
						<Sidebarlink text="View Warranty" link="warranty" />
						<Sidebarlink text="Request Repair" link="repair" />
						<Sidebarlink text="Transfer" link="transfer" />
						<Sidebarlink text="Cart" link="cart" />
					</div>
				)}
				{!isConsumer && (
					<div>
						<Sidebarlink text="My Products" link="products" />
						<Sidebarlink text="Add Products" link="add" />
						{/* <Sidebarlink text="Manage Products" link="manage" /> */}
						<Sidebarlink text="Manage Profile" link="profile" />
						<Sidebarlink text="Transactions" link="money" />
						<Sidebarlink text="View Warranty" link="warranty" />
					</div>
				)}
				<a href={api_endpoint + "/api/user/logout"}>
					<Sidebarlink
						id={classes["test"]}
						text="Logout"
						link="logout"
						navigation="false"
					/>
				</a>
			</Card>
		</div>
	);
}

export default React.memo(Sidebar);
