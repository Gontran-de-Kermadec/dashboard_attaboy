import React, { useEffect, useState, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Paper, Typography, Box, Divider } from "@mui/material";
import Period from "../components/Period";
import { ficelle, attaboy, yobatta } from "../data/sample";
import { BarRevenue } from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";

// import { getData, annualCA as caAnnuel, getAnnualCA } from "../data/getData";

function Revenus() {
	// getData();
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [data, setData] = useState([]);
	const [annualCA, setannualCA] = useState(0);
	const [revenue, setRevenue] = useState(0);
	const [colorTheme] = useContext(ThemeContext);

	const Item = styled(Paper)(({ theme }) => ({
		textAlign: "center",
		width: "30%",
		margin: "0.5em",
		background: colorTheme,
	}));
	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.5em",
		margin: "0.5em",
		color: activeRestaurant === "ficelle" ? "#fff" : "#000",
	}));
	//firestore fetching

	// useEffect(() => {
	// 	let startDate;
	// 	const date = new Date();
	// 	const currentYear = new Date().getFullYear();
	// 	const todayDate = new Date(
	// 		date.getFullYear(),
	// 		date.getMonth(),
	// 		date.getDate()
	// 	);
	// 	if (activePeriod === "annee") {
	// 		startDate = new Date(currentYear, 0, 1);
	// 	} else if (activePeriod === "mois") {
	// 		startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	// 	} else if (activePeriod === "semaine") {
	// 		startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
	// 		console.log(startDate);
	// 		const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
	// 		console.log(midnightDate);
	// 		//console.log(todayDate <= correctDate);
	// 		// todayDate === startDate
	// 		todayDate === startDate
	// 			? (startDate = todayDate)
	// 			: (startDate = midnightDate);
	// 		//: (startDate = );
	// 		// (startDate = new Date(date.setDate(date.getDate() - date.getDay())));
	// 		// console.log(startDate, todayDate);
	// 		// const q = query(
	// 		// 	collection(db, "ventes"),
	// 		// 	where("timestamp", "==", startDate)
	// 		// 	// where("timestamp", "<=", todayDate)
	// 		// 	// where("timestamp", "in", [startDate, todayDate])
	// 		// );
	// 		// let total = 0;
	// 		// onSnapshot(q, (querySnapshot) => {
	// 		// 	querySnapshot.forEach((doc) => {
	// 		// 		total += doc.data().total;
	// 		// 		setannualCA(Math.round(total));
	// 		// 	});
	// 		// 	console.log(total);
	// 		// });
	// 	}
	// 	console.log(startDate, todayDate);
	// 	console.log(activeRestaurant);
	// 	const q = query(
	// 		//collection(db, `ventes/attaboy/${currentYear}`),
	// 		collection(db, `ventes/${activeRestaurant}/${currentYear}`),
	// 		where("timestamp", ">=", startDate),
	// 		where("timestamp", "<=", todayDate)
	// 	);
	// 	console.log(q);
	// 	let total = 0;
	// 	onSnapshot(q, (querySnapshot) => {
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc);
	// 			total += doc.data().total;
	// 			setannualCA(Math.round(total));
	// 		});

	// 		console.log(total);
	// 	});
	// }, [activePeriod, activeRestaurant]);

	//sample data fetching
	useEffect(() => {
		const displayRevenue = () => {
			if (activeRestaurant === "attaboy") {
				if (activePeriod === "annee") {
					setRevenue(attaboy.year);
				} else if (activePeriod === "mois") {
					setRevenue(attaboy.month);
				} else {
					setRevenue(attaboy.week);
				}
			} else if (activeRestaurant === "ficelle") {
				if (activePeriod === "annee") {
					console.log("dkddkkd");
					setRevenue(ficelle.year);
				} else if (activePeriod === "mois") {
					setRevenue(ficelle.month);
				} else {
					setRevenue(ficelle.week);
				}
			} else if (activeRestaurant === "yobatta") {
				if (activePeriod === "annee") {
					setRevenue(yobatta.year);
				} else if (activePeriod === "mois") {
					setRevenue(yobatta.month);
				} else {
					setRevenue(yobatta.week);
				}
			}

			// switch (period) {
			// 	case period === 'annee':

			// 		break;

			// 	default:
			// 		break;
			// }
		};
		// const displayFicelleRevenue = () => {
		// 	if (activePeriod === "annee" && activeRestaurant === "ficelle") {
		// 		console.log("dkddkkd");
		// 		setRevenue(ficelle.year);
		// 	} else if (activePeriod === "mois" && activeRestaurant === "ficelle") {
		// 		setRevenue(ficelle.month);
		// 	} else {
		// 		setRevenue(ficelle.week);
		// 	}
		// };
		// const displayYobattaRevenue = () => {
		// 	if (activePeriod === "annee" && activeRestaurant === "yobatta") {
		// 		setRevenue(yobatta.year);
		// 	} else if (activePeriod === "mois" && activeRestaurant === "yobatta") {
		// 		setRevenue(yobatta.month);
		// 	} else {
		// 		setRevenue(yobatta.week);
		// 	}
		// };
		displayRevenue();
		// displayYobattaRevenue();
		// displayFicelleRevenue();
	}, [activePeriod, activeRestaurant]);

	console.log(data);
	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<Period />
				{/* <div>Revenus</div> */}
				{data.map((x) => {
					return (
						<div key={x.date}>
							<p>date : {x.date}</p>
							{/* <br /> */}
							<p>total : {x.total}</p>
						</div>
					);
				})}
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
				{/* <p>Chiffres d'affaires : $ {annualCA}</p> */}
				{/* <Paper
					elevation={1}
					sx={{
						textAlign: "center",
					}}
				>
					<p>
						Chiffres d'affaires hors taxes: <span>$ {revenue}</span>
					</p>
				</Paper> */}

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						flexWrap: "wrap",
					}}
				>
					<Item>
						<StyledTypo>Argent</StyledTypo>
						<p>$ 2500</p>
					</Item>
					<Item>
						<StyledTypo>TPV</StyledTypo>
						<p>$ 2500</p>
					</Item>
					<Item>
						<StyledTypo>Wix</StyledTypo>
						<p>$ 2500</p>
					</Item>
					<Item>
						<StyledTypo>Resto Loco</StyledTypo>
						<p>$ 2500</p>
					</Item>
					<Item>
						<StyledTypo>Uber</StyledTypo>
						<p>2500</p>
					</Item>
					<Item>
						<StyledTypo>DOORDASH</StyledTypo>
						<p>2500</p>
					</Item>
				</Box>
				<Box
					sx={{
						display: "flex",
					}}
				>
					<div>
						<BarRevenue />
					</div>
					<div>
						<PieChart />
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
					<Item>
						<p>Semaine : 10</p>
						<p>
							$ 2000 <span>+ 25%</span>
						</p>
					</Item>
					<Item>
						<p>Semaine : 11</p>
						<p>
							$ 1800 <span>- 25%</span>
						</p>
					</Item>
					<Item>
						<p>Semaine : 12</p>
						<p>
							$ 2500 <span>+ 15%</span>
						</p>
					</Item>
					<Item
						sx={{
							border: "solid 1px green",
						}}
					>
						<p>Semaine : 13</p>
						<p>$ 3000</p>
					</Item>
				</Box>
				{/* <Box>
					<LineChart />
				</Box> */}
			</Container>
		</div>
	);
}

export default Revenus;
