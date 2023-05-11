import {
	Container,
	Divider,
	Paper,
	// Button,
	// ButtonGroup,
	Tab,
	Tabs,
	Typography,
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
import {
	BarChart,
	BarComparison,
	BarRevenue,
	HomeBarRevenue,
} from "../components/charts/BarChart";
import { caNumbers, orderNumbers, avgTicketNumbers } from "../data/sample";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
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
	const [colorTheme] = useContext(ThemeContext);

	const [globalRevenue, setGlobalRevenue] = useState(null);
	const [revenue, setRevenue] = useState(null);
	const [ficelleRevenue, setFicelleRevenue] = useState(null);
	const [yobattaRevenue, setYobattaRevenue] = useState(null);
	const [order, setOrder] = useState(null);
	const [avgTicket, setAvgTicket] = useState(null);
	// const handleChange = (e, newPeriod) => {
	// 	setActivePeriod(newPeriod);
	// };
	const [allRevenue, setAllRevenue] = useState([]);
	const [totalSalary, setTotalSalary] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);
	const [totalOther, setTotalOther] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);

	const yobattaBackgroundColor = ["#D55D8D", "#922651"];
	const ficelleBackgroundColor = ["#3C6843", "#71AD79"];
	const attaboyBackgroundColor = ["#FFD702", "#FFEA70"];

	const dataLabel = ["revenus", "depenses"];
	const dataNumbers = [revenue, totalExpenses];
	const Item = styled(Paper)(({ theme }) => ({
		textAlign: "center",
		width: "30%",
		margin: "1em",
		padding: "0.5em",
		background: colorTheme,
	}));

	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.2em",
		//margin: "0.3em",
		color:
			activeRestaurant === "ficelle" || activeRestaurant === "yobatta"
				? "#fff"
				: "#000",
	}));
	useEffect(() => {
		const globalRevenue = revenue + ficelleRevenue + yobattaRevenue;
		setGlobalRevenue(globalRevenue);
	}, [ficelleRevenue, revenue, yobattaRevenue]);
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

	//revenue section
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
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
			//console.log(midnightDate);
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
		}
		let total = 0;
		let totalFicelle = 0;
		let totalYobatta = 0;
		const q = query(
			collection(db, `ventes/attaboy/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				total += doc.data().total;
				//setAllRevenue((prev) => [...prev]);
			});
			setRevenue(Math.round(total));
		});
		const ficelleRequest = query(
			collection(db, `ventes/ficelle/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(ficelleRequest, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().total);
				totalFicelle += doc.data().total;
				//setAllRevenue((prev) => [...prev]);
			});
			setFicelleRevenue(Math.round(totalFicelle));
		});
		const yobattaRequest = query(
			collection(db, `ventes/yobatta/${currentYear}`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(yobattaRequest, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				totalYobatta += doc.data().total;
				//setAllRevenue((prev) => [...prev]);
			});
			setYobattaRevenue(Math.round(totalYobatta));
		});
	}, [activePeriod, activeRestaurant]);

	//expenses section
	const currentYear = new Date().getFullYear();
	useEffect(() => {
		const date = new Date();
		const todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		let startDate;
		let totalSalary = 0;
		//let salaryData = [];
		if (activePeriod === "annee") {
			startDate = new Date(currentYear, 0, 1); //current year
		} else if (activePeriod === "mois") {
			startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));

			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
			console.log(startDate);
		}
		const requestSalary = query(
			//  collection(db, `depenses/${activeRestaurant}/${type}`),
			collection(db, `depenses/${activeRestaurant}/Salaires`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(requestSalary, (querySnapshot) => {
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				totalSalary += doc.data().total;
				//salaryData.push(doc.data());
			});
			setTotalSalary(totalSalary);
			//setSalaryDetails(salaryData);
		});
	}, [activeRestaurant, activePeriod, currentYear]);
	useEffect(() => {
		const date = new Date();
		const todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		let startDate;
		let totalOrder = 0;
		let orderData = [];
		if (activePeriod === "annee") {
			startDate = new Date(currentYear, 0, 1); //current year
		} else if (activePeriod === "mois") {
			startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));

			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
			console.log(startDate);
		}
		const requestOrder = query(
			collection(db, `depenses/${activeRestaurant}/Commandes`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(requestOrder, (querySnapshot) => {
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				totalOrder += doc.data().total;
				orderData.push(doc.data());
			});
			setTotalOrder(totalOrder);
			//setOrderDetails(orderData);
		});
	}, [activeRestaurant, activePeriod, currentYear]);
	useEffect(() => {
		const date = new Date();
		const todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		let startDate;
		let totalOther = 0;
		let otherData = [];

		if (activePeriod === "annee") {
			startDate = new Date(currentYear, 0, 1); //current year
		} else if (activePeriod === "mois") {
			startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month
		} else if (activePeriod === "semaine") {
			startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
			const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));

			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
			console.log(startDate);
		}
		const requestOther = query(
			//  collection(db, `depenses/${activeRestaurant}/${type}`),
			collection(db, `depenses/${activeRestaurant}/Autres`),
			where("timestamp", ">=", startDate),
			where("timestamp", "<=", todayDate)
		);
		onSnapshot(requestOther, (querySnapshot) => {
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				totalOther += doc.data().total;
				otherData.push(doc.data());
			});
			setTotalOther(totalOther);
			//setOtherDetails(otherData);
		});
	}, [activePeriod, activeRestaurant, currentYear]);
	useEffect(() => {
		const sumOfExpenses = totalOther + totalOrder + totalSalary;
		setTotalExpenses(sumOfExpenses);
	}, [totalOrder, totalOther, totalSalary]);
	console.log("ficelle " + ficelleRevenue);
	console.log("yobatta " + yobattaRevenue);

	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<div>
					<Period />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							flexWrap: "wrap",
							textAlign: "center",
							margin: "2em 0",
						}}
					>
						<Box
							sx={{
								fontSize: "1.5em",
							}}
						>
							<StyledTypo>Chiffre d'affaires global</StyledTypo>
							<StyledTypo
								sx={{
									fontWeight: "bold",
									fontStyle: "oblique",
									"&.MuiTypography-root": {
										color: "blue",
									},
								}}
							>
								$ {globalRevenue}
							</StyledTypo>
						</Box>
						<Box
							sx={{
								fontSize: "1.5em",
							}}
						>
							<StyledTypo>Dépenses globales</StyledTypo>
							<StyledTypo
								sx={{
									fontWeight: "bold",
									fontStyle: "oblique",
									"&.MuiTypography-root": {
										color: "blue",
									},
								}}
							>
								$ {totalExpenses}
							</StyledTypo>
						</Box>
					</Box>
					<Box>
						<Box
							sx={{
								margin: "2em 0",
							}}
						>
							<StyledTypo>Chiffre d'affaires global hier</StyledTypo>
							<StyledTypo>$ {globalRevenue}</StyledTypo>
						</Box>
					</Box>
					{/* <Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							flexWrap: "wrap",
						}}
					>
						<Item>
							<StyledTypo>Chiffre d'affaires HT</StyledTypo>
							<StyledTypo>$ {revenue}</StyledTypo>
						</Item>
						<Item>
							<StyledTypo>Dépenses</StyledTypo>
							<StyledTypo>$ {totalExpenses}</StyledTypo>
						</Item>

						<Item>
							<StyledTypo>Nombre de tickets</StyledTypo>
							<StyledTypo>En cours</StyledTypo>
						</Item>
						<Item>
							<StyledTypo>Ticket moyen</StyledTypo>
							<StyledTypo>En cours</StyledTypo>
						</Item>
					</Box> */}
				</div>
				<Box
					sx={{
						// display: "flex",
						// justifyContent: "space-evenly",
						// alignItems: "center",
						margin: "1em 0",
					}}
				>
					<Paper>
						<Box
							sx={{
								background: "#FFD702",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									padding: "0.5em",
									fontSize: "1.3em",
								}}
							>
								Restaurant Attaboy pizza inc.
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "1em",
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<Box
								sx={{
									width: "40%",
								}}
							>
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>Chiffre d'affaires d'hier: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										Caisse pas faite
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>
										Chiffre d'affaires:{" "}
										{/* <Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${yobattaRevenue}
									</Typography> */}
									</StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {yobattaRevenue}
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>
										Dépenses:{" "}
										{/* <Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalExpenses}
									</Typography> */}
									</StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {totalExpenses}
									</StyledTypo>
								</Box>
							</Box>
							<Box>
								<HomeBarRevenue
									dataLabel={dataLabel}
									dataNumbers={dataNumbers}
									backgroundColor={attaboyBackgroundColor}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>
				<Divider />
				{/* <Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						margin: "1em 0",
					}}
				>
					<Box>
						<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
					</Box>
					<Paper>
						<Box
							sx={{
								background: "#3C6843",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									padding: "0.5em",
									fontSize: "1.3em",
								}}
							>
								Ficelle
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "1em",
							}}
						>
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Chiffre d'affaires d'hier:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$20154
									</Typography>
								</StyledTypo>
							</Box>
							<Divider />
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Chiffre d'affaires:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${ficelleRevenue}
									</Typography>
								</StyledTypo>
							</Box>
							<Divider />
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Dépenses:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalExpenses}
									</Typography>
								</StyledTypo>
							</Box>
						</Box>
					</Paper>
				</Box> */}
				<Box
					sx={{
						// display: "flex",
						// justifyContent: "space-evenly",
						// alignItems: "center",
						margin: "1em 0",
					}}
				>
					<Paper>
						<Box
							sx={{
								background: "#3C6843",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									padding: "0.5em",
									fontSize: "1.3em",
									textAlign: "right",
								}}
							>
								Restaurant Ficelle inc.
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "1em",
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<Box>
								<HomeBarRevenue
									dataLabel={dataLabel}
									dataNumbers={dataNumbers}
									backgroundColor={ficelleBackgroundColor}
								/>
							</Box>
							<Box
								sx={{
									width: "40%",
									textAlign: "right",
								}}
							>
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>Chiffre d'affaires d'hier: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										Caisse pas faite
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>
										Chiffre d'affaires:{" "}
										{/* <Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${yobattaRevenue}
									</Typography> */}
									</StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {yobattaRevenue}
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>Dépenses: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {totalExpenses}
									</StyledTypo>
								</Box>
							</Box>
						</Box>
					</Paper>
					{/* <Box>
						<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
					</Box> */}
				</Box>
				<Divider />
				<Box
					sx={{
						// display: "flex",
						// justifyContent: "space-evenly",
						// alignItems: "center",
						margin: "1em 0",
					}}
				>
					<Paper>
						<Box
							sx={{
								background: "#D55D8D",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									padding: "0.5em",
									fontSize: "1.3em",
								}}
							>
								Yobatta sucrerie de quartier inc.
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "1em",
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<Box
								sx={{
									width: "40%",
								}}
							>
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>Chiffre d'affaires d'hier: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										Caisse pas faite
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>
										Chiffre d'affaires:{" "}
										{/* <Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${yobattaRevenue}
									</Typography> */}
									</StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {yobattaRevenue}
									</StyledTypo>
								</Box>
								<Divider />
								<Box
									sx={{
										margin: "1em",
									}}
								>
									<StyledTypo>
										Dépenses:{" "}
										{/* <Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalExpenses}
									</Typography> */}
									</StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										$ {totalExpenses}
									</StyledTypo>
								</Box>
							</Box>
							<Box>
								<HomeBarRevenue
									dataLabel={dataLabel}
									dataNumbers={dataNumbers}
									backgroundColor={yobattaBackgroundColor}
								/>
							</Box>
						</Box>
					</Paper>
					{/* <Box>
						<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
					</Box> */}
				</Box>
				{/* <Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						margin: "1em 0",
					}}
				>
					<Paper>
						<Box
							sx={{
								background: "#D55D8D",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									padding: "0.5em",
									fontSize: "1.3em",
								}}
							>
								Yobatta
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "1em",
							}}
						>
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Chiffre d'affaires d'hier:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										Caisse pas faite
									</Typography>
								</StyledTypo>
							</Box>
							<Divider />
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Chiffre d'affaires:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${yobattaRevenue}
									</Typography>
								</StyledTypo>
							</Box>
							<Divider />
							<Box
								sx={{
									margin: "1em",
								}}
							>
								<StyledTypo>
									Dépenses:{" "}
									<Typography
										variant="span"
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalExpenses}
									</Typography>
								</StyledTypo>
							</Box>
						</Box>
					</Paper>
					<Box>
						<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
					</Box>
				</Box> */}
				{/* <Box>
					<Paper elevation={8}>
						<Box
							sx={{
								background: colorTheme,
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									padding: "1em",
								}}
							>
								Attaboy
							</Typography>
						</Box>
						<Divider />
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								textAlign: "center",
							}}
						>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Chiffre d'affaires hier:</StyledTypo>
								<StyledTypo>Caisse pas faite</StyledTypo>
							</Box>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Chiffre d'affaires :</StyledTypo>
								<StyledTypo>${revenue}</StyledTypo>
							</Box>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Dépenses:</StyledTypo>
								<StyledTypo>${totalExpenses}</StyledTypo>
							</Box>
						</Box>
					</Paper>
					<Paper elevation={8}>
						<Box
							sx={{
								background: "#3C6843",
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<Typography
								sx={{
									padding: "1em",
								}}
							>
								Ficelle
							</Typography>
						</Box>
						<Divider />
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								textAlign: "center",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Chiffre d'affaires hier:</StyledTypo>
								<StyledTypo>$12586</StyledTypo>
							</Box>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Chiffre d'affaires :</StyledTypo>
								<StyledTypo>${revenue}</StyledTypo>
							</Box>
							<Box
								sx={{
									width: "30%",
								}}
							>
								<StyledTypo>Dépenses:</StyledTypo>
								<StyledTypo>${totalExpenses}</StyledTypo>
							</Box>
						</Box>
					</Paper>
				</Box> */}
				<Box
					sx={{
						//display: "flex",
						width: "40%",
						paddingTop: 2,
					}}
				>
					{/* <p>Source CA</p> */}
					<PieChart />
					{activePeriod === "semaine" ? <LineChart /> : null}
					{activePeriod === "annee" ? <BarComparison /> : null}
					<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
					{/* <BarChart /> */}
					{/* <BarComparison /> */}
				</Box>
			</Container>
		</div>
	);
}

export default Home;
