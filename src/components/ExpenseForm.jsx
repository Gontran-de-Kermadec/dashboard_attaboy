import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
//import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { db } from "../firebaseConfig";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import DateSelection from "./utils/DateSelection";

//firestore
import {
	// doc,
	// setDoc,
	addDoc,
	Timestamp,
	// getDoc,
	collection,
	// query,
	// where,
	// getDocs,
	// onSnapshot,
	// updateDoc,
} from "firebase/firestore";

import { RestaurantContext, ThemeContext } from "../App";

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

function ExpenseForm() {
	const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	const [date, setDate] = useState();
	const [timeStampDate, setTimeStampDate] = useState();
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");

	const [activeRestaurant] = useContext(RestaurantContext);

	const expenseSummary = {
		date: date,
		timestamp: timeStampDate,
		total: amount,
		note: note,
	};

	const getSelectedDate = (e) => {
		let day = e.$d.getDate();
		console.log(day);
		let month = e.$d.getMonth() + 1;
		console.log(month);
		let year = e.$d.getFullYear();

		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;

		const formattedDate = new Date(month + "/" + day + "/" + year);
		console.log(formattedDate);
		// setSelectedDate(formattedDate);
		setDate(month + "/" + day + "/" + year);
		const timestampFormat = Timestamp.fromDate(e.$d);
		setTimeStampDate(timestampFormat);
		// setError(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(date);
		console.log(amount);
		console.log(type);
		console.log(note);
		// const checkingrequest = query(
		// 	collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
		// 	where("timestamp", "==", selectedDate)
		// );
		// const querySnapshot = await getDocs(checkingrequest);
		// console.log(querySnapshot.empty);
		// if (querySnapshot.empty) {
		// 	console.log("create");
		const userDoc = await addDoc(
			collection(db, `depenses/${activeRestaurant}/${type}/`),
			expenseSummary
		);
		console.log("Document written with ID: " + userDoc.id);
		// } else {
		// 	console.log("update");
		// 	querySnapshot.forEach((document) => {
		// 		// doc.data() is never undefined for query doc snapshots
		// 		console.log(document.id, " => ", document.data());
		// 		const ref = collection(
		// 			db,
		// 			`ventes/${activeRestaurant}/${selectedYear}`
		// 		);
		// 		const docRef = doc(ref, document.id);
		// 		// updateDoc(
		// 		// 	collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
		// 		// 	salesSummary
		// 		// );
		// 		updateDoc(docRef, salesSummary);
		// 	});
		// }
	};
	const handleChange = (event) => {
		setType(event.target.value);
	};

	return (
		<Box
			component="form"
			sx={{
				padding: "1em",
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<Box sx={style}>
				<Typography
					variant="h6"
					sx={{
						textAlign: "center",
					}}
				>
					Remplir le formulaire
				</Typography>
				<Box
					sx={{
						width: "20em",
						margin: "1em auto",
					}}
				>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							sx={{
								left: "50%",
								transform: "translateX(-50%)",
								width: "100%",
							}}
							onChange={(e) => {
								getSelectedDate(e);
							}}
							label="Choisir une date"
							disableFuture
							//onError={(newError) => setError(newError)}
							//error={error}
							//helperText={helperText}
							// slotProps={{
							// 	textField: {
							// 		helperText: errorMessage,
							// 	},
							// }}
						/>
					</LocalizationProvider>
					{/* <DateSelection /> */}
				</Box>
				<Box
					sx={{
						width: "20em",
						margin: "1em auto",
					}}
				>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={type}
							label="Type"
							onChange={handleChange}
						>
							<MenuItem value="Salaires">Salaires</MenuItem>
							<MenuItem value="Commandes">Commandes</MenuItem>
							<MenuItem value="Autres">Autres</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box
					sx={{
						width: "20em",
						margin: "1em auto",
					}}
				>
					<TextField
						id="outlined-multiline-flexible"
						label="Remarque"
						multiline
						maxRows={4}
						onChange={(e) => {
							setNote(e.target.value);
						}}
						sx={{
							width: "100%",
						}}
					/>
				</Box>
				<Box
					sx={{
						width: "15vw",
						margin: "1em auto",
					}}
				>
					<TextField
						//error
						id="tpv_tips"
						label="Montant"
						type="number"
						//defaultValue="Tips"
						//helperText="Incorrect entry."
						onChange={(e) => {
							setAmount(Number(e.target.value));
						}}
						// onBlur={(e) => {
						// 	updateTotalTips();
						// 	//setTpvNumber(Number(e.target.value));
						// 	// disableInput(e);
						// }}
						sx={{
							width: "100%",
						}}
					/>
				</Box>
				<Box
					sx={{
						textAlign: "center",
					}}
				>
					<Button type="submit">Envoyer</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default ExpenseForm;
