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
import {
	PeriodContext,
	RestaurantContext,
	ThemeContext,
	StartEndDateContext,
} from "../App";
import Period from "../components/Period";
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import AttaboyOverview from "../components/AttaboyOverview";
import FicelleOverview from "../components/FicelleOverview";
import YobattaOverview from "../components/YobattaOverview";
import {
	getLastDayRevenue,
	genericSalesRequest,
} from "../data/generalFonctions";
import Authentication from "./Authentication";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	width: "30%",
}));

function Home() {
	const navigate = useNavigate();
	//console.log(auth);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	onAuthStateChanged(auth, (user) => {
		console.log(user);
		if (user) {
			console.log("user");
			setUserLoggedIn(true);
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			//const uid = user.uid;
			// ...
		} else {
			console.log("no user relocate");
			setUserLoggedIn(false);
			//navigate("/connexion", { replace: true });
		}
	});
	//context const
	const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	const [startEndDate] = useContext(StartEndDateContext);
	//revenue const
	const [globalRevenue, setGlobalRevenue] = useState(null);
	const [revenue, setRevenue] = useState(null);
	const [ficelleRevenue, setFicelleRevenue] = useState(null);
	const [yobattaRevenue, setYobattaRevenue] = useState(null);
	const [totalAttaboyRevenue, setTotalAttaboyRevenue] = useState(0);
	const [totalFicelleRevenue, setTotalFicelleRevenue] = useState(0);
	const [totalYobattaRevenue, setTotalYobattaRevenue] = useState(0);
	const [lastDayYobattaRevenue, setlastDayYobattaRevenue] = useState(0);
	// const [order, setOrder] = useState(null);
	// const [avgTicket, setAvgTicket] = useState(null);
	// const [allRevenue, setAllRevenue] = useState([]);

	//expenses const
	const [globalExpenses, setGlobalExpenses] = useState(0);
	const [totalSalary, setTotalSalary] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);
	const [totalOther, setTotalOther] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [attaboySalary, setAttaboySalary] = useState(0);
	const [attaboyOrders, setAttaboyOrders] = useState(0);
	const [attaboyOthers, setAttaboyOthers] = useState(0);
	const [ficelleSalary, setFicelleSalary] = useState(0);
	const [ficelleOrders, setFicelleOrders] = useState(0);
	const [ficelleOthers, setFicelleOthers] = useState(0);
	const [yobattaSalary, setYobattaSalary] = useState(0);
	const [yobattaOrders, setYobattaOrders] = useState(0);
	const [yobattaOthers, setYobattaOthers] = useState(0);
	const [totalFicelleSalary, setTotalFicelleSalary] = useState(0);
	const [totalYobattaSalary, setTotalYobattaSalary] = useState(0);
	const [totalAttaboyExpenses, setTotalAttaboyExpenses] = useState(0);
	const [totalFicelleExpenses, setTotalFicelleExpenses] = useState(0);
	const [totalYobattaExpenses, setTotalYobattaExpenses] = useState(0);
	const [globalSalaryExpenses, setGlobalSalaryExpenses] = useState(0);
	const [globalOrdersExpenses, setGlobalOrdersExpenses] = useState(0);
	const [globalOthersExpenses, setGlobalOthersExpenses] = useState(0);

	//background charts const
	const yobattaBackgroundColor = ["#D55D8D", "#922651"];
	const ficelleBackgroundColor = ["#3C6843", "#71AD79"];
	const attaboyBackgroundColor = ["#FFD702", "#FFEA70"];

	const dataLabel = ["revenus", "depenses"];

	const ficelleDataNumbers = [totalFicelleRevenue, totalFicelleExpenses];
	const yobattaDataNumbers = [totalYobattaRevenue, totalYobattaExpenses];
	const attaboyDataNumbers = [totalAttaboyRevenue, totalAttaboyExpenses];
	// const Item = styled(Paper)(({ theme }) => ({
	// 	textAlign: "center",
	// 	width: "30%",
	// 	margin: "1em",
	// 	padding: "0.5em",
	// 	background: colorTheme,
	// }));
	useEffect(() => {
		if (startEndDate !== null) {
			const firstDate = new Date(startEndDate[0]);

			console.log(firstDate);
			//setFirstDate(firstDate);
		}
	}, [startEndDate]);
	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.2em",
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
	useEffect(() => {
		const globalSalaryExpenses = attaboySalary + ficelleSalary + yobattaSalary;
		setGlobalSalaryExpenses(globalSalaryExpenses);
	}, [attaboySalary, ficelleSalary, yobattaSalary]);
	useEffect(() => {
		const globalOrdersExpenses = attaboyOrders + ficelleOrders + yobattaOrders;
		setGlobalOrdersExpenses(globalOrdersExpenses);
	}, [attaboyOrders, ficelleOrders, yobattaOrders]);
	useEffect(() => {
		const globalOthersExpenses = attaboyOthers + ficelleOthers + yobattaOthers;
		setGlobalOthersExpenses(globalOthersExpenses);
	}, [attaboyOthers, ficelleOthers, yobattaOthers]);
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
		let startDate;
		const currentYear = new Date().getFullYear();
		let todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);

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
		} else if (activePeriod === "custom" && startEndDate !== null) {
			console.log("pret pour lattaque");
			startDate = new Date(startEndDate[0]);
			todayDate = new Date(startEndDate[1]);
		} else if (activePeriod === "custom" && startEndDate === null) {
			console.log("bsjsjjssjj");
			startDate = new Date(currentYear, 0, 1);
		}

		let incrementAttaboyRevenue = 0;
		let incrementFicelleRevenue = 0;
		let incrementYobattaRevenue = 0;
		const revenueRequest = (restaurant) => {
			const request = genericSalesRequest(
				restaurant,
				currentYear,
				startDate,
				todayDate
			);
			// const request = query(
			// 	collection(db, `ventes/${restaurant}/${currentYear}`),
			// 	where("timestamp", ">=", startDate),
			// 	where("timestamp", "<=", todayDate)
			// );
			genericSalesRequest(restaurant, currentYear, startDate, todayDate);
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
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						incrementFicelleRevenue += doc.data().total;
					});
					setTotalFicelleRevenue(Math.round(incrementFicelleRevenue));
				});
			} else if (restaurant === "yobatta") {
				onSnapshot(request, (querySnapshot) => {
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
	}, [activePeriod, activeRestaurant, startEndDate]);

	//expenses section
	const currentYear = new Date().getFullYear();
	useEffect(() => {
		const date = new Date();
		let todayDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		let startDate;

		let attaboySalary = 0;
		let ficelleSalary = 0;
		let yobattaSalary = 0;

		let attaboyOrders = 0;
		let ficelleOrders = 0;
		let yobattaOrders = 0;

		let attaboyOthers = 0;
		let ficelleOthers = 0;
		let yobattaOthers = 0;

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
		} else if (activePeriod === "custom" && startEndDate !== null) {
			console.log("pret pour le sale");
			startDate = new Date(startEndDate[0]);
			todayDate = new Date(startEndDate[1]);
		} else if (activePeriod === "custom" && startEndDate === null) {
			console.log("bsjsjjssjj");
			startDate = todayDate;
		}
		// salaryRequest("attaboy", "Salaires");
		// salaryRequest("attaboy", "Commandes");
		// salaryRequest("attaboy", "Autres");
		// salaryRequest("ficelle", "Commandes");
		// salaryRequest("ficelle", "Autres");
		// salaryRequest("yobatta", "Salaires");
		let totalAttaboyExpenses = 0;
		let totalFicelleExpenses = 0;
		let totalYobattaExpenses = 0;
		const expenseRequest = (restaurant, expenseType) => {
			const request = query(
				collection(db, `depenses/${restaurant}/${expenseType}`),
				where("timestamp", ">=", startDate),
				where("timestamp", "<=", todayDate)
			);

			if (restaurant === "attaboy") {
				onSnapshot(request, (querySnapshot) => {
					querySnapshot.forEach((doc) => {
						totalAttaboyExpenses += doc.data().total;
						if (expenseType === "Salaires") {
							attaboySalary += doc.data().total;
						} else if (expenseType === "Commandes") {
							attaboyOrders += doc.data().total;
						} else {
							attaboyOthers += doc.data().total;
						}
					});
					setTotalAttaboyExpenses(totalAttaboyExpenses);
					setAttaboySalary(attaboySalary);
					setAttaboyOrders(attaboyOrders);
					setAttaboyOthers(attaboyOthers);
				});
			} else if (restaurant === "ficelle") {
				onSnapshot(request, (querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						totalFicelleExpenses += doc.data().total;
						if (expenseType === "Salaires") {
							ficelleSalary += doc.data().total;
						} else if (expenseType === "Commandes") {
							ficelleOrders += doc.data().total;
						} else {
							ficelleOthers += doc.data().total;
						}
					});
					setTotalFicelleExpenses(totalFicelleExpenses);
					setFicelleSalary(ficelleSalary);
					setFicelleOrders(ficelleOrders);
					setFicelleOthers(ficelleOthers);
				});
			} else if (restaurant === "yobatta") {
				onSnapshot(request, (querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						totalYobattaExpenses += doc.data().total;
						if (expenseType === "Salaires") {
							yobattaSalary += doc.data().total;
						} else if (expenseType === "Commandes") {
							yobattaOrders += doc.data().total;
						} else {
							yobattaOthers += doc.data().total;
						}
					});
					setTotalYobattaExpenses(totalYobattaExpenses);
					setYobattaSalary(yobattaSalary);
					setYobattaOrders(yobattaOrders);
					setYobattaOthers(yobattaOthers);
				});
			}
		};
		expenseRequest("attaboy", "Salaires");
		expenseRequest("attaboy", "Commandes");
		expenseRequest("attaboy", "Autres");

		expenseRequest("ficelle", "Salaires");
		expenseRequest("ficelle", "Commandes");
		expenseRequest("ficelle", "Autres");

		expenseRequest("yobatta", "Salaires");
		expenseRequest("yobatta", "Commandes");
		expenseRequest("yobatta", "Autres");
	}, [activePeriod, currentYear, startEndDate]);
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

	const ratioComparedToRevenue = (revenue, expense) => {
		const ratio = (expense / revenue) * 100;
		return Math.round(ratio);
	};
	const displayScoreColor = (value) => {
		let color;
		console.log(Number(value));
		if (Number(value) > 60) {
			console.log("pas bon");
			color = "#D63838";
		} else if (Number(value) > 30 && Number(value) < 60) {
			color = "#F35815";
		} else {
			color = "#01790d";
		}

		return color;
	};
	const [lastDailyRevenue, setLastDailyRevenue] = useState();
	const [lastDayAttaboyRevenue, setlastDayAttaboyRevenue] = useState(0);
	const [lastDayFicelleRevenue, setlastDayFicelleRevenue] = useState(0);
	useEffect(() => {
		const date = new Date();
		const currentYear = new Date().getFullYear();
		const previousDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - 1
		);
		getLastDayRevenue(
			"attaboy",
			currentYear,
			previousDay,
			setlastDayAttaboyRevenue
		);
		getLastDayRevenue(
			"ficelle",
			currentYear,
			previousDay,
			setlastDayFicelleRevenue
		);
		getLastDayRevenue(
			"yobatta",
			currentYear,
			previousDay,
			setlastDayYobattaRevenue
		);
	}, []);
	useEffect(() => {
		console.log(
			lastDayAttaboyRevenue,
			lastDayFicelleRevenue + lastDayYobattaRevenue
		);
		const x =
			lastDayAttaboyRevenue + lastDayFicelleRevenue + lastDayYobattaRevenue;
		setLastDailyRevenue(x);
	}, [lastDayAttaboyRevenue, lastDayFicelleRevenue, lastDayYobattaRevenue]);
	console.log(startEndDate === null ? "fail" : startEndDate[0]);
	return (
		<>
			{userLoggedIn ? (
				<div className="flex">
					<Sidebar />
					<Container>
						<div>
							<Period />
						</div>
						{activeRestaurant === "attaboy" ? (
							<AttaboyOverview
								totalAttaboyRevenue={totalAttaboyRevenue}
								totalAttaboyExpenses={totalAttaboyExpenses}
								attaboySalary={attaboySalary}
								attaboyOrders={attaboyOrders}
								attaboyOthers={attaboyOthers}
							/>
						) : null}
						{activeRestaurant === "ficelle" ? (
							<FicelleOverview
								totalFicelleRevenue={totalFicelleRevenue}
								totalFicelleExpenses={totalFicelleExpenses}
								ficelleSalary={ficelleSalary}
								ficelleOrders={ficelleOrders}
								ficelleOthers={ficelleOthers}
							/>
						) : null}
						{activeRestaurant === "yobatta" ? (
							<YobattaOverview
								totalYobattaRevenue={totalYobattaRevenue}
								totalYobattaExpenses={totalYobattaExpenses}
								yobattaSalary={yobattaSalary}
								yobattaOrders={yobattaOrders}
								yobattaOthers={yobattaOthers}
							/>
						) : null}

						{activeRestaurant === "soguares" ? (
							<Box>
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
													color: colorTheme,
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
													color: colorTheme,
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
											margin: "4em 0",
										}}
									>
										<StyledTypo>
											Chiffre d'affaires global hier:{" "}
											<Typography
												variant="span"
												sx={{
													fontStyle: "oblique",
													fontWeight: "bold",
													color: colorTheme,
												}}
											>
												{lastDailyRevenue === 0
													? "Caisse pas faite"
													: "$" + lastDailyRevenue}
											</Typography>
										</StyledTypo>
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-evenly",
										textAlign: "center",
										margin: "5em 0",
									}}
								>
									<Paper
										elevation={2}
										sx={{
											background: displayScoreColor(
												ratioComparedToRevenue(
													globalRevenue,
													globalSalaryExpenses
												)
											),
										}}
									>
										<StyledTypo
											sx={{
												padding: "1em",
											}}
										>
											Masse salariale{" "}
											<Typography
												variant="span"
												sx={{
													display: "block",
													fontWeight: "bold",
													fontSize: "1.8em",
												}}
											>
												{ratioComparedToRevenue(
													globalRevenue,
													globalSalaryExpenses
												)}
												%
											</Typography>
										</StyledTypo>
									</Paper>
									<Paper
										elevation={2}
										sx={{
											background: displayScoreColor(
												ratioComparedToRevenue(
													globalRevenue,
													globalOrdersExpenses
												)
											),
										}}
									>
										<StyledTypo
											sx={{
												padding: "1em",
											}}
										>
											Commandes:{" "}
											<Typography
												variant="span"
												sx={{
													display: "block",
													fontWeight: "bold",
													fontSize: "1.8em",
												}}
											>
												{ratioComparedToRevenue(
													globalRevenue,
													globalOrdersExpenses
												)}
												%
											</Typography>
										</StyledTypo>
									</Paper>
									<Paper
										elevation={2}
										sx={{
											background: displayScoreColor(
												ratioComparedToRevenue(
													globalRevenue,
													globalOthersExpenses
												)
											),
										}}
									>
										<StyledTypo
											sx={{
												padding: "1em",
											}}
										>
											Autres frais:{" "}
											<Typography
												variant="span"
												sx={{
													display: "block",
													fontWeight: "bold",
													fontSize: "1.8em",
												}}
											>
												{ratioComparedToRevenue(
													globalRevenue,
													globalOthersExpenses
												)}
												%
											</Typography>
										</StyledTypo>
									</Paper>
								</Box>
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
												{/* <Box
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
											<Divider /> */}
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
												{/* <Box
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
											<Divider /> */}
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
												{/* <Box
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
											<Divider /> */}
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
							</Box>
						) : null}
					</Container>
				</div>
			) : (
				<Authentication />
			)}
		</>
	);
}

export default Home;
