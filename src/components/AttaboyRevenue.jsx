import React, { useEffect, useState, useContext, useMemo } from "react";
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
// import { todayDate } from "../data/getData";

function AttaboyRevenue() {
	//console.log(dateTest);
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

	//weeks before
	const [revenueWeeksBefore, setRevenueWeeksBefore] = useState([]);
	const [finalCount, setFinalCount] = useState([]);

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
	//console.log(data);
	//if (data.length !== 0) {
	//const setLabelsAndData = async() => {

	console.log(revenueWeeksBefore);

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
			setAllRevenue(dataNumbers);
		} else {
			return null;
		}
	}, [data]);

	//console.log(labels);
	//console.log(allRevenue);

	useEffect(() => {
		setRevenueWeeksBefore([]);
		const date = new Date();
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
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			//console.log(midnightDate);
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);

			const previousWeekStart = (x) => {
				let substractor = x * 7;
				let weekFirstDay = new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - substractor
				);
				return weekFirstDay;
			};
			const previousWeekEnd = (x) => {
				let substractor = x * 7 - 7 + 1;
				let weekLastDay = new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - substractor
				);
				return weekLastDay;
			};

			for (let i = 1; i < 5; i++) {
				const beginningWeek = previousWeekStart(i);
				const weekEnding = previousWeekEnd(i);
				// console.log(beginningWeek);
				// console.log(weekEnding);
				let totalWeekBefore = 0;
				let randomDate;
				const getWeekBefore = query(
					collection(db, `ventes/${activeRestaurant}/${currentYear}`),
					where("timestamp", ">=", beginningWeek),
					where("timestamp", "<=", weekEnding)
				);
				onSnapshot(getWeekBefore, (querySnapshot) => {
					querySnapshot.forEach((doc) => {
						totalWeekBefore += doc.data().total;
						randomDate = doc.data().date;
					});
					const testObject = {
						date: randomDate,
						total: totalWeekBefore,
					};

					setRevenueWeeksBefore((prev) => [...prev, testObject]);
				});
			}
		}
		let total = 0;
		let uberTotal = 0;
		let tpvTotal = 0;
		let argentTotal = 0;
		let doordashTotal = 0;
		let restoLocoTotal = 0;
		let wixTotal = 0;
		const q = query(
			collection(db, `ventes/${activeRestaurant}/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				//console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				uberTotal += doc.data().sourcesOfRevenues.uber;
				tpvTotal += doc.data().sourcesOfRevenues.tpv;
				argentTotal += doc.data().sourcesOfRevenues.argent;
				doordashTotal += doc.data().sourcesOfRevenues.doordash;
				wixTotal += doc.data().sourcesOfRevenues.wix;
				restoLocoTotal += doc.data().sourcesOfRevenues.restoloco;
				setAllRevenue((prev) => [...prev]);
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
		});
	}, [activePeriod, activeRestaurant]);

	useEffect(() => {
		if (revenueWeeksBefore) {
			revenueWeeksBefore.reverse();

			//section pour afficher taux de variation
			const variationArray = [];
			const variation =
				revenueWeeksBefore.length > 0
					? revenueWeeksBefore.reduce((acc, curr) => {
							console.log(acc.total, curr.total);
							const x = Math.round(
								((curr.total - acc.total) / acc.total) * 100
							);
							console.log("varia " + x);
							const variationRate = {
								variation: x,
							};
							variationArray.push(variationRate);
							if (acc.total !== curr.total) {
								console.log("ici");
								acc.total = curr.total;
							}
							return acc;
					  })
					: null;
			console.log(variation);
			console.log(variationArray);

			//	revenueWeeksBefore.map((x) => {
			const findWeekNumber = revenueWeeksBefore.map((element) => {
				const date = new Date(element.date);
				const year = new Date(date.getFullYear(), 0, 1);
				const days = Math.floor((date - year) / (24 * 60 * 60 * 1000));
				const week = Math.ceil((date.getDay() + 1 + days) / 7);
				//	console.log(week);
				const objToReturn = {
					date: week,
					total: element.total,
				};
				return objToReturn;
			});
			//const testAdd = findWeekNumber.map((el) => ({ ...el }));
			const result = findWeekNumber.slice(1).map(({ date, total }, i) => ({
				date,
				total,
				...variationArray[i],
			}));
			console.log(result);
			// const newArr = [{ name: "eve" }, { name: "john" }, { name: "jane" }].map(
			// 	(v) => ({ ...v, isActive: true })
			// );

			setFinalCount(result);
			// setFinalCount(findWeekNumber);
		} else {
			console.log("pas da data");
			return null;
		}
	}, [revenueWeeksBefore]);
	console.log(finalCount);
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
					<PieChart dataLabel={labels} dataNumbers={allRevenue} />
				</div>
			</Box>
			<Divider />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					// flexWrap: "wrap",
				}}
			>
				{finalCount.map((value, i) => {
					// {finalCount.slice(1).map((value, i) => {
					return isNaN(value.date) ? null : (
						<Item key={i}>
							<Typography>Semaine : {value.date}</Typography>
							<Typography>$ {value.total}</Typography>
							{value.variation === Infinity ? (
								<Typography>N.D</Typography>
							) : (
								<Typography
									sx={{
										color: value.variation > 0 ? "green" : "red",
									}}
								>
									{value.variation}%
								</Typography>
							)}
						</Item>
					);
				})}
			</Box>
		</>
	);
}

export default AttaboyRevenue;
