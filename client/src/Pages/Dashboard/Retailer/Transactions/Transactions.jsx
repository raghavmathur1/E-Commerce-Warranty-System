import { React, useState, useEffect } from "react";
import Content from "../../../../Components/Content";
import Transfer from "./Transfer";
import classes from "./transactions.module.css";
import Card from "../../../../Components/Card";
import Load from "../../../../Components/Load";
import { getBankBalance, getTransactions } from "../../../../Actions/Retailer";
function Transactions() {
	const [balance, setBalance] = useState(-1);
	const [transactions, setTransactions] = useState(null);
	useEffect(() => {
		getTransactions().then((res) => {
			console.log(res);
			setTransactions(res.data);
		});
		getBankBalance().then((res) => {
			console.log(res.data);
			setBalance(res.data);
		});
	}, []);
	if (balance === -1 || transactions === null) {
		return <Load heading="Transaction summary"></Load>;
	}
	return (
		<Content id={classes["offCard"]}>
			<div className={classes["cartContainer"]}>
				<div className={classes["summary"]}>
					<Card minHeight="80vh" id={classes["proCard"]}>
						<div className={classes["blue"]}>
							<span>Transaction Summary</span>
						</div>
						<div className={classes["allitems"]}>
							{transactions.map((item) => {
								return <Transfer receipt={item} />;
							})}
						</div>
					</Card>
				</div>
				<div className={classes["priceDetails"]}>
					<Card width="300px" height="350px">
						<div className={classes["tophead"]}>
							<span>Your Balance</span>
						</div>
						<div className={classes["orderDet"]}>
							<div className={classes["downOrder"]}>
								{/* <UilMoneyStack /> */}
								<span>₹{balance}</span>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Content>
	);
}

export default Transactions;
