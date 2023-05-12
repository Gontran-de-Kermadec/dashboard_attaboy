import React, { useEffect, useState, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import styled from "@emotion/styled";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Paper, Typography, Box } from "@mui/material";
import { YobattaBarRevenue } from "./charts/BarChart";
import PieChart from "./charts/PieChart";

function YobattaRevenue() {
	// react context variable
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);

	const [lastDailyRevenue, setLastDailyRevenue] = useState(0);

	const [revenue, setRevenue] = useState(0);
	const [tpvRevenue, setTpvRevenue] = useState(0);
	const [argentRevenue, setArgentRevenue] = useState(0);
	const [data, setData] = useState([]);

	const [labels, setLabels] = useState();
	const [sourcesRevenue, setSourcesRevenue] = useState();
	const yobattaBackgroundColor = ["#D55D8D", "#922651"];

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
		color: activeRestaurant === "yobatta" ? "#fff" : "#000",
	}));
	useEffect(() => {
		if (data) {
			console.log(data);
			console.log("manipulez moi");
			const formattedDataArray = Object.entries(data);
			const label = formattedDataArray.map((array) => {
				//console.log(array[0]);
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
	useEffect(() => {
		let startDate;
		const date = new Date();
		const currentYear = new Date().getFullYear();
		const todayDate = new Date(
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
		}
		const q = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		console.log(q);
		let total = 0;
		let tpvTotal = 0;
		let argentTotal = 0;

		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				tpvTotal += doc.data().sourcesOfRevenues.tpv;
				argentTotal += doc.data().sourcesOfRevenues.argent;
			});
			setTpvRevenue(Math.round(tpvTotal));
			setArgentRevenue(Math.round(argentTotal));
			setRevenue(Math.round(total));
			setData({
				argent: argentTotal,
				tpv: tpvTotal,
			});
			console.log(argentTotal);
		});
	}, [activePeriod, activeRestaurant]);
	useEffect(() => {
		const date = new Date();
		const currentYear = new Date().getFullYear();
		const previousDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - 1
		);
		const lastDayRequest = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", "==", previousDay)
		);
		let lastDayRevenue = 0;
		console.log(lastDayRequest);
		onSnapshot(lastDayRequest, (querySnapshot) => {
			if (querySnapshot.empty) {
				console.log("pas de revenus hier");
				setLastDailyRevenue(0);
			} else {
				querySnapshot.forEach((doc) => {
					console.log(doc.data().sourcesOfRevenues);
					lastDayRevenue = doc.data().total;
				});
				setLastDailyRevenue(lastDayRevenue);
			}
		});
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
						sx={{ color: colorTheme, fontStyle: "oblique", fontWeight: "bold" }}
					>
						$ {revenue}
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
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Box>
						<YobattaBarRevenue
							dataLabel={labels}
							dataNumbers={sourcesRevenue}
							backgroundColor={yobattaBackgroundColor}
						/>
					</Box>
					<Box>
						<PieChart dataLabel={labels} dataNumbers={sourcesRevenue} />
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default YobattaRevenue;
