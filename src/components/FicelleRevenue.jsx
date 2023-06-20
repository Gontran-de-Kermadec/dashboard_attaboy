import React, { useEffect, useState, useContext } from "react";
import {
	PeriodContext,
	RestaurantContext,
	ThemeContext,
	StartEndDateContext,
} from "../App";
import styled from "@emotion/styled";
import {
	collection,
	query,
	where,
	//getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Paper, Typography, Box, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import PieChart from "./charts/PieChart";
import { FicelleBarRevenue } from "./charts/BarChart";
import {
	getLastDayRevenue,
	genericSalesRequest,
} from "../data/generalFonctions";
function FicelleRevenue() {
	// react context variable
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	const [startEndDate] = useContext(StartEndDateContext);
	const [data, setData] = useState([]);

	const [lastDailyRevenue, setLastDailyRevenue] = useState(0);
	const [revenue, setRevenue] = useState(0);
	const [uberRevenue, setUberRevenue] = useState(0);
	const [tpvRevenue, setTpvRevenue] = useState(0);
	const [argentRevenue, setArgentRevenue] = useState(0);
	// const [wixRevenue, setWixRevenue] = useState(0);
	const [doordashRevenue, setDoordashRevenue] = useState(0);
	const [specificPeriod, setSpecificPeriod] = useState();
	const [labels, setLabels] = useState();
	const [sourcesRevenue, setSourcesRevenue] = useState();
	const ficelleBackgroundColor = ["#3C6843", "#71AD79", "#528E5C", "#0F1A11"];

	const Item = styled(Paper)(({ theme }) => ({
		textAlign: "center",
		width: "25%",
		margin: "0.5em",
		padding: "0.5em",
		background: colorTheme,
	}));
	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.2em",
		margin: "0.3em",
		color: activeRestaurant === "ficelle" ? "#fff" : "#000",
	}));
	useEffect(() => {
		if (data) {
			const formattedDataArray = Object.entries(data);
			const label = formattedDataArray.map((array) => {
				return array[0];
			});
			const dataNumbers = formattedDataArray.map((array) => {
				return array[1];
			});
			setLabels(label);
			setSourcesRevenue(dataNumbers);
		} else {
			return null;
		}
	}, [data]);
	//get daily revenue accorfing to selected period
	useEffect(() => {
		let year;
		let startDate;
		let endDate;
		let specificPeriodRevenue = [];
		if (startEndDate !== null) {
			const date = new Date(startEndDate[0]);

			year = date.getFullYear();
			startDate = new Date(startEndDate[0]);
			endDate = new Date(startEndDate[1]);
			const previousDay = new Date(
				startDate.getFullYear(),
				startDate.getMonth(),
				startDate.getDate() - 1
			);
			// const getSpecificData = query(
			// 	collection(db, `ventes/${activeRestaurant}/${year}`),
			// 	where("timestamp", ">=", previousDay),
			// 	where("timestamp", "<=", endDate)
			// );
			const getSpecificData = genericSalesRequest(
				activeRestaurant,
				year,
				previousDay,
				endDate
			);
			onSnapshot(getSpecificData, (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.data());
					// totalMonthBefore += doc.data().total;
					specificPeriodRevenue.push(doc.data());
				});
				setSpecificPeriod(specificPeriodRevenue);
				// setSpecificPeriod((prev) => [...prev, testObject]);
			});
		}
	}, [activeRestaurant, startEndDate]);

	useEffect(() => {
		let startDate;
		const date = new Date();
		const currentYear = new Date().getFullYear();
		let todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		if (activePeriod === "annee") {
			startDate = new Date(currentYear, 0, 1);
		} else if (activePeriod === "mois") {
			startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
		} else if (activePeriod === "custom" && startEndDate !== null) {
			startDate = new Date(startEndDate[0]);
			todayDate = new Date(startEndDate[1]);
		} else if (activePeriod === "custom" && startEndDate === null) {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
		}
		// const q = query(
		// 	collection(db, `ventes/${activeRestaurant}/${currentYear}`),
		// 	where("timestamp", ">=", startDate),
		// 	where("timestamp", "<=", todayDate)
		// );
		const q = genericSalesRequest(
			activeRestaurant,
			currentYear,
			startDate,
			todayDate
		);
		let total = 0;
		let uberTotal = 0;
		let tpvTotal = 0;
		let argentTotal = 0;
		let doordashTotal = 0;
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				total += doc.data().total;
				uberTotal += doc.data().sourcesOfRevenues.uber;
				tpvTotal += doc.data().sourcesOfRevenues.tpv;
				argentTotal += doc.data().sourcesOfRevenues.argent;
				doordashTotal += doc.data().sourcesOfRevenues.doordash;
			});
			setUberRevenue(Math.round(uberTotal));
			setTpvRevenue(Math.round(tpvTotal));
			setArgentRevenue(Math.round(argentTotal));
			setDoordashRevenue(Math.round(doordashTotal));
			setRevenue(Math.round(total));
			setData({
				argent: argentTotal,
				tpv: tpvTotal,
				uber: uberTotal,
				doordash: doordashTotal,
			});
			console.log(argentTotal);
		});
	}, [activePeriod, activeRestaurant, startEndDate]);
	useEffect(() => {
		const date = new Date();
		const currentYear = new Date().getFullYear();
		const previousDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - 1
		);
		getLastDayRevenue(
			activeRestaurant,
			currentYear,
			previousDay,
			setLastDailyRevenue
		);
		// const lastDayRequest = query(
		// 	collection(db, `ventes/${activeRestaurant}/${currentYear}`),
		// 	where("timestamp", "==", previousDay)
		// );
		// let lastDayRevenue = 0;
		// onSnapshot(lastDayRequest, (querySnapshot) => {
		// 	if (querySnapshot.empty) {
		// 		console.log("pas de revenus hier");
		// 		setLastDailyRevenue(0);
		// 	} else {
		// 		querySnapshot.forEach((doc) => {
		// 			console.log(doc.data().sourcesOfRevenues);
		// 			lastDayRevenue = doc.data().total;
		// 		});
		// 		setLastDailyRevenue(lastDayRevenue);
		// 	}
		// });
	}, [activeRestaurant]);
	return (
		<>
			<Box
				sx={{
					margin: "3em 0",
				}}
			>
				<Typography
					sx={{
						fontSize: "2em",
					}}
				>
					Chiffres d'affaires:{" "}
					<Typography
						variant="span"
						sx={{
							color: colorTheme,
							fontStyle: "oblique",
							fontWeight: "bold",
						}}
					>
						${revenue}
					</Typography>
				</Typography>
				<Typography
					sx={{
						fontSize: "1.2em",
					}}
				>
					Chiffre d'affaires hier:{" "}
					<Typography
						variant="span"
						sx={{
							color: colorTheme,
							fontStyle: "oblique",
							fontWeight: "bold",
						}}
					>
						{lastDailyRevenue === 0
							? "Caisse pas faite"
							: "$" + lastDailyRevenue}
					</Typography>
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					flexWrap: "wrap",
				}}
			>
				<Item>
					<StyledTypo>ARGENT</StyledTypo>
					<StyledTypo>$ {argentRevenue}</StyledTypo>
				</Item>
				<Item>
					<StyledTypo>TPV</StyledTypo>
					<StyledTypo>$ {tpvRevenue}</StyledTypo>
				</Item>
				<Item>
					<StyledTypo>UBER</StyledTypo>
					<StyledTypo>$ {uberRevenue}</StyledTypo>
				</Item>
				<Item>
					<StyledTypo>DOORDASH</StyledTypo>
					<StyledTypo>$ {doordashRevenue} </StyledTypo>
				</Item>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Box>
					<FicelleBarRevenue
						dataLabel={labels}
						dataNumbers={sourcesRevenue}
						backgroundColor={ficelleBackgroundColor}
					/>
				</Box>
				<Box>
					<PieChart
						dataLabel={labels}
						dataNumbers={sourcesRevenue}
						colors={ficelleBackgroundColor}
					/>
				</Box>
			</Box>
			<Divider />
			<TableContainer>
				<Table>
					<TableHead
						sx={{
							background: colorTheme,
						}}
					>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Argent</TableCell>
							<TableCell>TPV</TableCell>
							<TableCell>Wix</TableCell>
							<TableCell>Resto Loco</TableCell>
							<TableCell>Uber</TableCell>
							<TableCell>Doordash</TableCell>
							<TableCell>Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{specificPeriod?.map((element) => (
							<TableRow
								key={element.date}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{element.date}
								</TableCell>
								<TableCell>{element.sourcesOfRevenues.argent}$</TableCell>
								<TableCell>{element.sourcesOfRevenues.tpv}$</TableCell>
								<TableCell>{element.sourcesOfRevenues.wix}$</TableCell>
								<TableCell>{element.sourcesOfRevenues.restoloco}$</TableCell>
								<TableCell>{element.sourcesOfRevenues.uber}$</TableCell>
								<TableCell>{element.sourcesOfRevenues.doordash}$</TableCell>
								<TableCell>{element.total}$</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* {specificPeriod?.map((x) => {
				return (
					<Typography>
						{x.date} / {x.total}
					</Typography>
				);
			})} */}
		</>
	);
}

export default FicelleRevenue;
