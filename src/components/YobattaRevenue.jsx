import React, { useEffect, useState, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import styled from "@emotion/styled";
import {
	collection,
	query,
	where,
	//getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Paper, Typography, Box } from "@mui/material";

function YobattaRevenue() {
	// react context variable
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	//const [data, setData] = useState([]);

	const [revenue, setRevenue] = useState(0);
	//const [uberRevenue, setUberRevenue] = useState(0);
	const [tpvRevenue, setTpvRevenue] = useState(0);
	const [argentRevenue, setArgentRevenue] = useState(0);
	// const [wixRevenue, setWixRevenue] = useState(0);
	//const [doordashRevenue, setDoordashRevenue] = useState(0);

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
			//console.log(startDate);
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			//console.log(midnightDate);
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
		}
		// console.log(startDate, todayDate);
		// console.log(activeRestaurant);
		const q = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		console.log(q);
		let total = 0;
		//let uberTotal = 0;
		let tpvTotal = 0;
		let argentTotal = 0;
		//let doordashTotal = 0;
		// let restoLocoTotal = 0;
		// let wixTotal = 0;
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				//uberTotal += doc.data().uber;
				tpvTotal += doc.data().sourcesOfRevenues.tpv;
				argentTotal += doc.data().sourcesOfRevenues.argent;
				//doordashTotal += doc.data().doordash;
				// wixTotal += doc.data().wix;
				// restoLocoTotal += doc.data().restoloco;
			});
			//setUberRevenue(Math.round(uberTotal));
			setTpvRevenue(Math.round(tpvTotal));
			setArgentRevenue(Math.round(argentTotal));
			//setDoordashRevenue(Math.round(doordashTotal));
			// setWixRevenue(Math.round(wixTotal));
			// setRestoLocoRevenue(Math.round(restoLocoTotal));
			setRevenue(Math.round(total));

			console.log(argentTotal);
		});
	}, [activePeriod, activeRestaurant]);
	return (
		<>
			<Typography
				sx={{
					fontSize: "2em",
					margin: "1em 0;",
				}}
			>
				Chiffres d'affaires :{" "}
				<Typography variant="span" sx={{ color: colorTheme }}>
					$ {revenue}
				</Typography>
			</Typography>
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
				{/* <Item>
					<StyledTypo>WIX</StyledTypo>
					<StyledTypo>$ {wixRevenue}</StyledTypo>
			</Item>*/}
				{/* <Item>
					<StyledTypo>UBER</StyledTypo>
					<StyledTypo>$ {uberRevenue}</StyledTypo>
				</Item>
				<Item>
					<StyledTypo>DOORDASH</StyledTypo>
					<StyledTypo>$ {doordashRevenue} </StyledTypo>
				</Item> */}
			</Box>
		</>
	);
}

export default YobattaRevenue;
