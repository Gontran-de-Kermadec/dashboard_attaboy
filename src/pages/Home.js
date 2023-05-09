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
import { PeriodContext, RestaurantContext } from "../App";
import Period from "../components/Period";
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	width: "30%",
}));

function Home() {
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [revenue, setRevenue] = useState(null);
	const [order, setOrder] = useState(null);
	const [avgTicket, setAvgTicket] = useState(null);
	// const handleChange = (e, newPeriod) => {
	// 	setActivePeriod(newPeriod);
	// };
	const [allRevenue, setAllRevenue] = useState([]);

	useEffect(() => {
		const displayData = () => {
			if (activePeriod === "annee") {
				//setRevenue(caNumbers.year);
				setOrder(orderNumbers.year);
				setAvgTicket(avgTicketNumbers.year);
			} else if (activePeriod === "mois") {
				//setRevenue(caNumbers.month);
				setOrder(orderNumbers.month);
				setAvgTicket(avgTicketNumbers.month);
			} else {
				//setRevenue(caNumbers.week);
				setOrder(orderNumbers.week);
				setAvgTicket(avgTicketNumbers.week);
			}
		};
		displayData();
	}, [activePeriod]);

	useEffect(() => {
		const date = new Date();
		console.log(date.getDate() - 1);
		let startDate;
		const currentYear = new Date().getFullYear();
		const todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		const year = new Date(date.getFullYear(), 0, 1);
		const days = Math.floor((date - year) / (24 * 60 * 60 * 1000));
		const week = Math.ceil((date.getDay() + 1 + days) / 7);
		console.log(week);

		if (activePeriod === "annee") {
			startDate = new Date(currentYear, 0, 1); //current year
		} else if (activePeriod === "mois") {
			startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month

			//variables to get month before
			// const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			// const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			// const previousMonthFirstDay = (x) => {
			// 	let substractor = x * 1;
			// 	let monthFirstDay = new Date(
			// 		date.getFullYear(),
			// 		date.getMonth() - substractor,
			// 		1
			// 		// date.getDate() - substractor
			// 	);
			// 	return monthFirstDay;
			// };
			// const prevMonthFirstDate = new Date(
			// 	date.getFullYear() - (date.getMonth() > 0 ? 0 : 1),
			// 	(date.getMonth() - 1 + 12) % 12,
			// 	1
			// );
			//console.log(prevMonthFirstDate);
			// console.log(previousMonthFirstDay(2));
			// const previousMonthLastDay = (x) => {
			// 	let substractor = x * 1 - 1;
			// 	let monthLastDay = new Date(
			// 		date.getFullYear(),
			// 		date.getMonth() - substractor,
			// 		0
			// 	);
			// 	return monthLastDay;
			// };
			// console.log(previousMonthLastDay(2));
			// const numberOfMonthBefore = 5;
			// for (let i = 1; i < numberOfMonthBefore; i++) {
			// 	const startMonth = previousMonthFirstDay(i);
			// 	const endMonth = previousMonthLastDay(i);
			// 	console.log(startMonth);
			// 	console.log(endMonth);
			// 	let totalMonthBefore = 0;
			// 	let randomDate;
			// 	const getMonthBefore = query(
			// 		collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			// 		where("timestamp", ">=", startMonth),
			// 		where("timestamp", "<=", endMonth)
			// 	);
			// 	onSnapshot(getMonthBefore, (querySnapshot) => {
			// 		querySnapshot.forEach((doc) => {
			// 			console.log(doc.data().total);
			// 			totalMonthBefore += doc.data().total;
			// 			randomDate = doc.data().date;
			// 		});
			// 		const testObject = {
			// 			date: randomDate,
			// 			total: totalMonthBefore,
			// 		};
			// 		console.log(testObject);
			// 		setRevenueMonthsBefore((prev) => [...prev, testObject]);
			// 	});
			// }
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			//console.log(midnightDate);
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);

			// variables to get weeks before
			// const previousWeekStart = (x) => {
			// 	let substractor = x * 7;
			// 	let weekFirstDay = new Date(
			// 		date.getFullYear(),
			// 		date.getMonth(),
			// 		date.getDate() - substractor
			// 	);
			// 	return weekFirstDay;
			// };
			// const previousWeekEnd = (x) => {
			// 	let substractor = x * 7 - 7 + 1;
			// 	let weekLastDay = new Date(
			// 		date.getFullYear(),
			// 		date.getMonth(),
			// 		date.getDate() - substractor
			// 	);
			// 	return weekLastDay;
			// };
			// const numberOfWeekBefore = 5;
			// for (let i = 1; i < numberOfWeekBefore; i++) {
			// 	const beginningWeek = previousWeekStart(i);
			// 	const weekEnding = previousWeekEnd(i);
			// 	// console.log(beginningWeek);
			// 	// console.log(weekEnding);
			// 	let totalWeekBefore = 0;
			// 	let randomDate;
			// 	const getWeekBefore = query(
			// 		collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			// 		where("timestamp", ">=", beginningWeek),
			// 		where("timestamp", "<=", weekEnding)
			// 	);
			// 	onSnapshot(getWeekBefore, (querySnapshot) => {
			// 		querySnapshot.forEach((doc) => {
			// 			console.log(doc.data().total + " " + doc.data().date);
			// 			totalWeekBefore += doc.data().total;
			// 			randomDate = doc.data().date;
			// 		});
			// 		const testObject = {
			// 			date: randomDate,
			// 			total: totalWeekBefore,
			// 		};

			// 		setRevenueWeeksBefore((prev) => [...prev, testObject]);
			// 	});
			// }
		}
		let total = 0;
		// let uberTotal = 0;
		// let tpvTotal = 0;
		// let argentTotal = 0;
		// let doordashTotal = 0;
		// let restoLocoTotal = 0;
		// let wixTotal = 0;
		const q = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		console.log(todayDate);
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				// uberTotal += doc.data().sourcesOfRevenues.uber;
				// tpvTotal += doc.data().sourcesOfRevenues.tpv;
				// argentTotal += doc.data().sourcesOfRevenues.argent;
				// doordashTotal += doc.data().sourcesOfRevenues.doordash;
				// wixTotal += doc.data().sourcesOfRevenues.wix;
				// restoLocoTotal += doc.data().sourcesOfRevenues.restoloco;
				setAllRevenue((prev) => [...prev]);
			});

			// setUberRevenue(Math.round(uberTotal));
			// setTpvRevenue(Math.round(tpvTotal));
			// setArgentRevenue(Math.round(argentTotal));
			// setDoordashRevenue(Math.round(doordashTotal));
			// setWixRevenue(Math.round(wixTotal));
			// setRestoLocoRevenue(Math.round(restoLocoTotal));
			setRevenue(Math.round(total));
			// setData({
			// 	argent: argentTotal,
			// 	tpv: tpvTotal,
			// 	wix: wixTotal,
			// 	uber: uberTotal,
			// 	doordash: doordashTotal,
			// 	restoLoco: restoLocoTotal,
			// });
		});
	}, [activePeriod, activeRestaurant]);

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
