import { Container, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useContext } from "react";
import "../Home.css";
import styled from "@emotion/styled";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";
import {
	BarChart,
	BarComparison,
	BarRevenue,
	HomeBarRevenue,
} from "../components/charts/BarChart";
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

const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	width: "30%",
}));

function Home() {
	//context const
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);

	//revenue const
	const [globalRevenue, setGlobalRevenue] = useState(null);
	const [revenue, setRevenue] = useState(null);
	const [ficelleRevenue, setFicelleRevenue] = useState(null);
	const [yobattaRevenue, setYobattaRevenue] = useState(null);
	const [totalAttaboyRevenue, setTotalAttaboyRevenue] = useState(0);
	const [totalFicelleRevenue, setTotalFicelleRevenue] = useState(0);
	const [totalYobattaRevenue, setTotalYobattaRevenue] = useState(0);
	// const [order, setOrder] = useState(null);
	// const [avgTicket, setAvgTicket] = useState(null);
	// const [allRevenue, setAllRevenue] = useState([]);

	//expenses const
	const [globalExpenses, setGlobalExpenses] = useState(0);
	const [totalSalary, setTotalSalary] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);
	const [totalOther, setTotalOther] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalAttaboySalary, setTotalAttaboySalary] = useState(0);
	const [totalFicelleSalary, setTotalFicelleSalary] = useState(0);
	const [totalYobattaSalary, setTotalYobattaSalary] = useState(0);
	const [test, setTest] = useState(0);
	const [totalAttaboyExpenses, setTotalAttaboyExpenses] = useState(0);
	const [totalFicelleExpenses, setTotalFicelleExpenses] = useState(0);
	const [totalYobattaExpenses, setTotalYobattaExpenses] = useState(0);

	//background charts const
	const yobattaBackgroundColor = ["#D55D8D", "#922651"];
	const ficelleBackgroundColor = ["#3C6843", "#71AD79"];
	const attaboyBackgroundColor = ["#FFD702", "#FFEA70"];

	const dataLabel = ["revenus", "depenses"];
	const attaboyDataNumbers = [totalAttaboyRevenue, totalAttaboyExpenses];
	const ficelleDataNumbers = [totalFicelleRevenue, totalFicelleExpenses];
	const yobattaDataNumbers = [totalYobattaRevenue, totalYobattaExpenses];
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
		// color:
		// 	activeRestaurant === "ficelle" || activeRestaurant === "yobatta"
		// 		? "#fff"
		// 		: "#000",
	}));
	useEffect(() => {
		const globalRevenue =
			totalAttaboyRevenue + totalFicelleRevenue + totalYobattaRevenue;
		setGlobalRevenue(globalRevenue);
	}, [totalAttaboyRevenue, totalFicelleRevenue, totalYobattaRevenue]);
	useEffect(() => {
		const globalExpenses =
			totalAttaboyExpenses + totalFicelleExpenses + totalYobattaExpenses;
		setGlobalExpenses(globalExpenses);
	}, [totalAttaboyExpenses, totalFicelleExpenses, totalYobattaExpenses]);
	// useEffect(() => {
	// 	const displayData = () => {
	// 		if (activePeriod === "annee") {
	// 			setOrder(orderNumbers.year);
	// 			setAvgTicket(avgTicketNumbers.year);
	// 		} else if (activePeriod === "mois") {
	// 			setOrder(orderNumbers.month);
	// 			setAvgTicket(avgTicketNumbers.month);
	// 		} else {
	// 			setOrder(orderNumbers.week);
	// 			setAvgTicket(avgTicketNumbers.week);
	// 		}
	// 	};
	// 	displayData();
	// }, [activePeriod]);

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
			todayDate === startDate
				? (startDate = todayDate)
				: (startDate = midnightDate);
		}
		// let total = 0;
		// let totalFicelle = 0;
		// let totalYobatta = 0;

		let incrementAttaboyRevenue = 0;
		let incrementFicelleRevenue = 0;
		let incrementYobattaRevenue = 0;
		const revenueRequest = (restaurant) => {
			const request = query(
				collection(db, `ventes/${restaurant}/${currentYear}`),
				where("timestamp", ">=", startDate),
				where("timestamp", "<=", todayDate)
			);
			if (restaurant === "attaboy") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementAttaboyRevenue += doc.data().total;
					});
					console.log(incrementAttaboyRevenue);
					setTotalAttaboyRevenue(Math.round(incrementAttaboyRevenue));
				});
			} else if (restaurant === "ficelle") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementFicelleRevenue += doc.data().total;
					});
					setTotalFicelleRevenue(Math.round(incrementFicelleRevenue));
				});
			} else if (restaurant === "yobatta") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementYobattaRevenue += doc.data().total;
					});
					setTotalYobattaRevenue(Math.round(incrementYobattaRevenue));
				});
			}
		};
		revenueRequest("attaboy");
		revenueRequest("ficelle");
		revenueRequest("yobatta");
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
		// let totalSalary = 0;
		// let totalAttaboySalary = 0;
		// let totalFicelleSalary = 0;
		// let totalYobattaSalary = 0;

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
		}
		// const salaryRequest = (restaurant) => {
		// 	const request = query(
		// 		collection(db, `depenses/${restaurant}/Salaires`),
		// 		where("timestamp", ">=", startDate),
		// 		where("timestamp", "<=", todayDate)
		// 	);
		// 	return request;
		// };
		let incrementAttaboy = 0;
		let incrementFicelle = 0;
		let incrementYobatta = 0;
		const salaryRequestTest = (restaurant, expenseType) => {
			const request = query(
				collection(db, `depenses/${restaurant}/${expenseType}`),
				// collection(db, `depenses/${restaurant}/Salaires`),
				where("timestamp", ">=", startDate),
				where("timestamp", "<=", todayDate)
			);
			if (restaurant === "attaboy") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementAttaboy += doc.data().total;
					});
					console.log(incrementAttaboy);
					//setTest(incrementAttaboy);
					setTotalAttaboyExpenses(incrementAttaboy);
				});
			} else if (restaurant === "ficelle") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementFicelle += doc.data().total;
					});
					setTotalFicelleExpenses(incrementFicelle);
				});
			} else if (restaurant === "yobatta") {
				onSnapshot(request, (querySnapshot) => {
					console.log(querySnapshot);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementYobatta += doc.data().total;
					});
					setTotalYobattaExpenses(incrementYobatta);
				});
			}
		};
		salaryRequestTest("attaboy", "Salaires");
		salaryRequestTest("attaboy", "Commandes");
		salaryRequestTest("attaboy", "Autres");

		salaryRequestTest("ficelle", "Salaires");
		salaryRequestTest("ficelle", "Commandes");
		salaryRequestTest("ficelle", "Autres");

		salaryRequestTest("yobatta", "Salaires");
		salaryRequestTest("yobatta", "Commandes");
		salaryRequestTest("yobatta", "Autres");
	}, [activePeriod, currentYear]);
	// useEffect(() => {
	// 	const date = new Date();
	// 	const todayDate = new Date(
	// 		date.getFullYear(),
	// 		date.getMonth(),
	// 		date.getDate()
	// 	);
	// 	let startDate;
	// 	let totalOrder = 0;
	// 	let orderData = [];
	// 	if (activePeriod === "annee") {
	// 		startDate = new Date(currentYear, 0, 1); //current year
	// 	} else if (activePeriod === "mois") {
	// 		startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month
	// 	} else if (activePeriod === "semaine") {
	// 		startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
	// 		const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));

	// 		todayDate === startDate
	// 			? (startDate = todayDate)
	// 			: (startDate = midnightDate);
	// 		console.log(startDate);
	// 	}
	// 	const requestOrder = query(
	// 		collection(db, `depenses/${activeRestaurant}/Commandes`),
	// 		where("timestamp", ">=", startDate),
	// 		where("timestamp", "<=", todayDate)
	// 	);
	// 	onSnapshot(requestOrder, (querySnapshot) => {
	// 		console.log(querySnapshot);
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.data());
	// 			totalOrder += doc.data().total;
	// 			orderData.push(doc.data());
	// 		});
	// 		setTotalOrder(totalOrder);
	// 		//setOrderDetails(orderData);
	// 	});
	// }, [activeRestaurant, activePeriod, currentYear]);
	// useEffect(() => {
	// 	const date = new Date();
	// 	const todayDate = new Date(
	// 		date.getFullYear(),
	// 		date.getMonth(),
	// 		date.getDate()
	// 	);
	// 	let startDate;
	// 	let totalOther = 0;
	// 	let otherData = [];

	// 	if (activePeriod === "annee") {
	// 		startDate = new Date(currentYear, 0, 1); //current year
	// 	} else if (activePeriod === "mois") {
	// 		startDate = new Date(date.getFullYear(), date.getMonth(), 1); //current month
	// 	} else if (activePeriod === "semaine") {
	// 		startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
	// 		const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));

	// 		todayDate === startDate
	// 			? (startDate = todayDate)
	// 			: (startDate = midnightDate);
	// 		console.log(startDate);
	// 	}
	// 	const requestOther = query(
	// 		collection(db, `depenses/${activeRestaurant}/Autres`),
	// 		where("timestamp", ">=", startDate),
	// 		where("timestamp", "<=", todayDate)
	// 	);
	// 	onSnapshot(requestOther, (querySnapshot) => {
	// 		console.log(querySnapshot);
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.data());
	// 			totalOther += doc.data().total;
	// 			otherData.push(doc.data());
	// 		});
	// 		setTotalOther(totalOther);
	// 	});
	// }, [activePeriod, activeRestaurant, currentYear]);
	useEffect(() => {
		const sumOfExpenses = totalOther + totalOrder + totalSalary;
		setTotalExpenses(sumOfExpenses);
	}, [totalOrder, totalOther, totalSalary]);
	console.log("ficelle " + ficelleRevenue);
	console.log("yobatta " + yobattaRevenue);
	console.log(test);
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
								$ {globalExpenses}
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
							<StyledTypo>En cours</StyledTypo>
						</Box>
					</Box>
				</div>
				<Box
					sx={{
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
									<StyledTypo>Chiffre d'affaires: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalAttaboyRevenue}
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
										${totalAttaboyExpenses}
									</StyledTypo>
								</Box>
							</Box>
							<Box>
								<HomeBarRevenue
									dataLabel={dataLabel}
									dataNumbers={attaboyDataNumbers}
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
									dataNumbers={ficelleDataNumbers}
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
									<StyledTypo>Chiffre d'affaires: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalFicelleRevenue}
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
										$ {totalFicelleExpenses}
									</StyledTypo>
								</Box>
							</Box>
						</Box>
					</Paper>
				</Box>
				<Divider />
				<Box
					sx={{
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
									<StyledTypo>Chiffre d'affaires: </StyledTypo>
									<StyledTypo
										sx={{
											fontWeight: "bold",
											fontStyle: "oblique",
										}}
									>
										${totalYobattaRevenue}
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
										$ {totalYobattaExpenses}
									</StyledTypo>
								</Box>
							</Box>
							<Box>
								<HomeBarRevenue
									dataLabel={dataLabel}
									dataNumbers={yobattaDataNumbers}
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

				{/* <Box
					sx={{
						width: "40%",
						paddingTop: 2,
					}}
				>
					<PieChart />
					{activePeriod === "semaine" ? <LineChart /> : null}
					{activePeriod === "annee" ? <BarComparison /> : null}
					<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
				</Box> */}
			</Container>
		</div>
	);
}

export default Home;
