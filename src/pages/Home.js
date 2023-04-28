import {
	Container,
	Paper,
	// Button,
	// ButtonGroup,
	Tab,
	Tabs,
	// ToggleButton,
	// ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useContext } from "react";
import "../Home.css";
import styled from "@emotion/styled";
import MovingIcon from "@mui/icons-material/Moving";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";
import { BarChart, BarComparison } from "../components/charts/BarChart";
import { caNumbers, orderNumbers, avgTicketNumbers } from "../data/sample";
import { PeriodContext } from "../App";
import Period from "../components/Period";

// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	width: "30%",
}));

function Home() {
	const [activePeriod, setActivePeriod] = useContext(PeriodContext);
	const [revenue, setRevenue] = useState(null);
	const [order, setOrder] = useState(null);
	const [avgTicket, setAvgTicket] = useState(null);
	const handleChange = (e, newPeriod) => {
		setActivePeriod(newPeriod);
	};
	// const displayRevenue = () => {
	// 	if (activePeriod === "annee") {
	// 		return caNumbers.year;
	// 	} else if (activePeriod === "mois") {
	// 		return caNumbers.month;
	// 	} else {
	// 		return caNumbers.week;
	// 	}
	// };
	useEffect(() => {
		const displayData = () => {
			if (activePeriod === "annee") {
				setRevenue(caNumbers.year);
				setOrder(orderNumbers.year);
				setAvgTicket(avgTicketNumbers.year);
			} else if (activePeriod === "mois") {
				setRevenue(caNumbers.month);
				setOrder(orderNumbers.month);
				setAvgTicket(avgTicketNumbers.month);
			} else {
				setRevenue(caNumbers.week);
				setOrder(orderNumbers.week);
				setAvgTicket(avgTicketNumbers.week);
			}
		};
		displayData();
	}, [activePeriod]);

	// const getData = async () => {
	// 	// const docRef = doc(db, "ventes");
	// 	// const docSnap = await getDoc(docRef);
	// 	// if (docSnap.exists()) {
	// 	// 	console.log("Document data:", docSnap.data());
	// 	// } else {
	// 	// 	// docSnap.data() will be undefined in this case
	// 	// 	console.log("No such document!");
	// 	// }
	// 	const startOfToday = new Date();
	// 	const startDate = new Date("04-01-2023");
	// 	const endDate = new Date("04-30-2023");
	// 	//startOfToday.setUTCHours(0, 0, 0, 0);
	// 	//let time = new Date(2023, 3, 5);
	// 	let time = new Date("04-02-2023");
	// 	//console.log(startOfToday);
	// 	console.log(time);
	// 	//firebase.firestore().collection("cities").where("timestamp", ">", start)

	// 	const q = query(
	// 		collection(db, "ventes")
	// 		//where("date", "==", "Monday 27 March 2023 13")
	// 	);
	// 	const q2 = query(
	// 		collection(db, "ventes"),
	// 		where("timestamp", "<", startOfToday)
	// 	);
	// 	const q3 = query(collection(db, "ventes"), where("timestamp", "==", time));
	// 	const q4 = query(
	// 		collection(db, "ventes"),
	// 		where("timestamp", ">=", startDate),
	// 		where("timestamp", "<=", endDate)
	// 	);

	// 	const querySnapshot = await getDocs(q4);
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// };
	// getData();

	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<div>
					{/* <Box>
				<ToggleButtonGroup
					color="primary"
					value={activePeriod}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					>
					<ToggleButton value="année">Année</ToggleButton>
					<ToggleButton value="mois">Mois</ToggleButton>
					<ToggleButton value="semaine">Semaine</ToggleButton>
					</ToggleButtonGroup>
				</Box> */}
					{/* <Box>
						<Tabs
							value={activePeriod}
							onChange={handleChange}
							aria-label="tableau de periodes"
						>
							<Tab value="annee" label="Année" />
							<Tab value="mois" label="Mois" />
							<Tab value="semaine" label="Semaine" />
						</Tabs>
					</Box> */}
					<Period />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							// m-y: 5,
							marginTop: 10,
							//width: "100%",
						}}
					>
						<Item elevation={1}>
							<p>Chiffres d'affaires hors taxes</p>
							<div>
								<p>$ {revenue}</p>
							</div>
						</Item>
						<Item elevation={1}>
							<p>Nombres de tickets</p>
							<p>{order}</p>
						</Item>
						<Item elevation={1}>
							<p>Ticket moyen</p>
							<p>{avgTicket}</p>
						</Item>
					</Box>
				</div>
				<Box
					sx={{
						display: "flex",
						width: "40%",
						paddingTop: 2,
					}}
				>
					{/* <p>Source CA</p> */}
					<PieChart />
					{activePeriod === "semaine" ? <LineChart /> : null}
					{activePeriod === "annee" ? <BarComparison /> : null}
					{/* <LineChart /> */}
					{/* <BarChart /> */}
					{/* <BarComparison /> */}
				</Box>
			</Container>
		</div>
	);
}

export default Home;
