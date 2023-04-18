import React, { useEffect, useState, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import styled from "@emotion/styled";
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Paper, Typography, Box, Divider } from "@mui/material";
import { BarRevenue } from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";

function AttaboyRevenue() {
	// react context variable
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	const [data, setData] = useState([]);

	//data for charts
	const [labels, setLabels] = useState();

	const [revenue, setRevenue] = useState(0);
	const [uberRevenue, setUberRevenue] = useState(0);
	const [tpvRevenue, setTpvRevenue] = useState(0);
	const [argentRevenue, setArgentRevenue] = useState(0);
	const [wixRevenue, setWixRevenue] = useState(0);
	const [doordashRevenue, setDoordashRevenue] = useState(0);
	const [restoLocoRevenue, setRestoLocoRevenue] = useState(0);
	const [allRevenue, setAllRevenue] = useState([]);

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
	console.log(data);
	//if (data.length !== 0) {

	//const setLabelsAndData = async() => {

	//console.log(blabla);

	// const reformattedArray = blabla.map(({ key, value }) => [key]);

	// const label = [];
	// blabla.forEach((x) => {
	// 	console.log(x[0]);
	// 	label.push(x[0]);
	// 	//setLabels((prev) => [...prev, x[0]]);
	// });
	// console.log(label);
	// setLabels(label);
	// //}
	// console.log(labels);
	//}
	useEffect(() => {
		if (data) {
			console.log(data);
			console.log("manipulez moi");
			const formattedDataArray = Object.entries(data);
			const label = formattedDataArray.map((array) => {
				console.log(array[0]);
				return array[0];
			});
			const dataNumbers = formattedDataArray.map((array) => {
				return array[1];
			});
			setLabels(label);
			setAllRevenue(dataNumbers);
		} else {
			return null;
		}
	}, [data]);
	console.log(labels);
	console.log(allRevenue);

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
			console.log(startDate);
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			console.log(midnightDate);
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
			//: (startDate = );
			// (startDate = new Date(date.setDate(date.getDate() - date.getDay())));
			// console.log(startDate, todayDate);
			// const q = query(
			// 	collection(db, "ventes"),
			// 	where("timestamp", "==", startDate)
			// 	// where("timestamp", "<=", todayDate)
			// 	// where("timestamp", "in", [startDate, todayDate])
			// );
		}
		console.log(startDate, todayDate);
		console.log(activeRestaurant);
		const q = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		console.log(q);
		let total = 0;
		let uberTotal = 0;
		let tpvTotal = 0;
		let argentTotal = 0;
		let doordashTotal = 0;
		let restoLocoTotal = 0;
		let wixTotal = 0;
		// let test;
		// let a;
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				uberTotal += doc.data().sourcesOfRevenues.uber;
				//setUberRevenue(Math.round(uberTotal));
				tpvTotal += doc.data().sourcesOfRevenues.tpv;
				argentTotal += doc.data().sourcesOfRevenues.argent;
				doordashTotal += doc.data().sourcesOfRevenues.doordash;
				wixTotal += doc.data().sourcesOfRevenues.wix;
				restoLocoTotal += doc.data().sourcesOfRevenues.restoloco;
				//setannualCA(Math.round(total));
				setAllRevenue((prev) => [...prev]);
				//test = doc.data().sourcesOfRevenues;
				//a.push(doc.data().sourcesOfRevenues);
			});

			setUberRevenue(Math.round(uberTotal));
			setTpvRevenue(Math.round(tpvTotal));
			setArgentRevenue(Math.round(argentTotal));
			setDoordashRevenue(Math.round(doordashTotal));
			setWixRevenue(Math.round(wixTotal));
			setRestoLocoRevenue(Math.round(restoLocoTotal));
			setRevenue(Math.round(total));
			setData({
				argent: argentTotal,
				tpv: tpvTotal,
				wix: wixTotal,
				uber: uberTotal,
				doordash: doordashTotal,
				restoLoco: restoLocoTotal,
			});
			//setAllRevenue(prev => [...prev, ])
			// a = {
			// 	argent: argentTotal,
			// 	tpv: tpvTotal,
			// 	wix: wixTotal,
			// 	uber: uberTotal,
			// 	doordash: doordashTotal,
			// 	restoLoco: restoLocoTotal,
			// };
			// console.log(a);
		});
		//const output = a.map((val) => val.name);
		// const resultat = a.reduce((acc, current) => {
		// 	console.log(acc, current);
		// 	return current;
		// });
		// console.log(resultat);
		// Object.entries(test);
		//console.log(array);
		// array.forEach((x) => {
		// 	console.log(x[0]);
		// });
		// console.log(Object.entries(test));
		// const summed = a.reduce((acc, cur, i) => {
		// 	const item = i > 0 && acc.find(({ argent }) => argent === cur.argent);
		// 	if (item) item.value += cur.value;
		// 	else acc.push({ name: cur.name, value: cur.value }); // don't push cur here
		// 	return acc;
		// }, []);
		// console.log(summed);

		// const result = Object.values(
		// 	a.reduce((acc, item) => {
		// 	  acc[item.description] = acc[item.description]
		// 		? { ...item, amount: item.amount + acc[item.description].amount }
		// 		: item;
		// 	  return acc;
		// 	}, {})
		//   );

		//   console.log(result);
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
				<Item>
					<StyledTypo>WIX</StyledTypo>
					<StyledTypo>$ {wixRevenue}</StyledTypo>
				</Item>
				<Item>
					<StyledTypo>RESTO LOCO</StyledTypo>
					<StyledTypo>$ {restoLocoRevenue}</StyledTypo>
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
				}}
			>
				<Box
					sx={{
						alignSelf: "center",
					}}
				>
					<BarRevenue dataLabel={labels} dataNumbers={allRevenue} />
				</Box>
				<div>
					<PieChart />
				</div>
			</Box>
		</>
	);
}

export default AttaboyRevenue;
