import React, { useEffect, useState, useContext } from "react";
import { Container, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DateSelection from "./utils/DateSelection";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpenseForm from "./ExpenseForm";
import { BarRevenue } from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";

import { RestaurantContext, ThemeContext, PeriodContext } from "../App";
//firebase - firestore
import { db } from "../firebaseConfig";
import {
	// doc,
	// setDoc,
	addDoc,
	Timestamp,
	// getDoc,
	collection,
	query,
	where,
	// getDocs,
	onSnapshot,
	// updateDoc,
} from "firebase/firestore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function AttaboyExpenses() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [activeRestaurant] = useContext(RestaurantContext);
	const [activePeriod] = useContext(PeriodContext);
	const [colorTheme] = useContext(ThemeContext);

	const [type, setType] = useState("");
	const [totalSalary, setTotalSalary] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);
	const [totalOther, setTotalOther] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);

	const [salaryDetails, setSalaryDetails] = useState();
	const [orderDetails, setOrderDetails] = useState();
	const [otherDetails, setOtherDetails] = useState();

	const [dataNumbers, setDataNumbers] = useState();

	const dataLabel = ["salaires", "commandes", "autres"];
	useEffect(() => {
		const numbers = [totalSalary, totalOrder, totalOther];
		setDataNumbers(numbers);
	}, [totalOrder, totalOther, totalSalary]);

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
		let salaryData = [];
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
				salaryData.push(doc.data());
			});
			setTotalSalary(totalSalary);
			setSalaryDetails(salaryData);
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
			//  collection(db, `depenses/${activeRestaurant}/${type}`),
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

				// 	doordash: doordashTotal,
				// 	restoLoco: restoLocoTotal,
				// });
			});
			setTotalOrder(totalOrder);
			setOrderDetails(orderData);
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
			setOtherDetails(otherData);
		});
	}, [activePeriod, activeRestaurant, currentYear]);
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const checkingrequest = query(
	// 		collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
	// 		where("timestamp", "==", selectedDate)
	// 	);
	// 	const querySnapshot = await getDocs(checkingrequest);
	// 	console.log(querySnapshot.empty);
	// 	if (querySnapshot.empty) {
	// 		console.log("create");
	// 		const userDoc = await addDoc(
	// 			collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
	// 			salesSummary
	// 		);
	// 		console.log("Document written with ID: " + userDoc.id);
	// 	} else {
	// 		console.log("update");
	// 		querySnapshot.forEach((document) => {
	// 			// doc.data() is never undefined for query doc snapshots
	// 			console.log(document.id, " => ", document.data());
	// 			const ref = collection(
	// 				db,
	// 				`ventes/${activeRestaurant}/${selectedYear}`
	// 			);
	// 			const docRef = doc(ref, document.id);
	// 			// updateDoc(
	// 			// 	collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
	// 			// 	salesSummary
	// 			// );
	// 			updateDoc(docRef, salesSummary);
	// 		});
	// 	}
	// };
	useEffect(() => {
		const sumOfExpenses = totalOther + totalOrder + totalSalary;
		setTotalExpenses(sumOfExpenses);
	}, [totalOrder, totalOther, totalSalary]);

	console.log(salaryDetails);
	return (
		<Box>
			<Button
				onClick={handleOpen}
				sx={{
					left: "50%",
					transform: "translateX(-50%)",
					background: colorTheme,
					boxShadow: 2,
					fontSize: "1.2em",
					color: "#fff",
					margin: "2em auto",
					"&:hover": {
						color: colorTheme,
					},
				}}
			>
				Ajouter une dépense
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div>
					<ExpenseForm handleClose={handleClose} />
				</div>
			</Modal>
			<Container
				sx={{
					// textAlign: "center",
					margin: "2em auto",
				}}
			>
				<Typography variant="h5">
					Total des dépenses: ${totalExpenses}
				</Typography>
			</Container>
			<Container>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography variant="h6">Salaires: ${totalSalary}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{salaryDetails?.map((element, index) => {
							return (
								<List key={index}>
									<ListItem>
										<ListItemText>
											{element.date}{" "}
											{element.note !== "" ? "/ " + element.note : null} - $
											{element.total}
										</ListItemText>
									</ListItem>
								</List>
							);
						})}
					</AccordionDetails>
				</Accordion>
				{/* <Typography>Detail des salaires</Typography> */}
				{/* {salaryDetails.map((element, index) => {
					return (
						<List key={index}>
							<ListItem>
								<ListItemText>
									{element.date} ={">"} {element.total}
								</ListItemText>
							</ListItem>
						</List>
					);
				})} */}
			</Container>
			<Container
				sx={{
					margin: "1em auto",
				}}
			>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography variant="h6">Commandes: ${totalOrder}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{orderDetails?.map((element, index) => {
							return (
								<List key={index}>
									<ListItem>
										<ListItemText>
											{element.date}{" "}
											{element.note !== "" ? "/ " + element.note : null} - $
											{element.total}{" "}
										</ListItemText>
									</ListItem>
									<Divider />
								</List>
							);
						})}
					</AccordionDetails>
				</Accordion>
			</Container>
			<Container
				sx={{
					margin: "1em auto",
				}}
			>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography variant="h6">Autres dépenses: ${totalOther}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{otherDetails?.map((element, index) => {
							return (
								<List key={index}>
									<ListItem>
										<ListItemText>
											{element.date} / {element.note} - ${element.total}
										</ListItemText>
									</ListItem>
									<Divider />
								</List>
							);
						})}
					</AccordionDetails>
				</Accordion>
			</Container>
			<BarRevenue dataLabel={dataLabel} dataNumbers={dataNumbers} />
			<PieChart dataLabel={dataLabel} dataNumbers={dataNumbers} />
		</Box>
	);
}

export default AttaboyExpenses;
