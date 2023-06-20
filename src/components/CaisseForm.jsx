import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { db } from "../firebaseConfig";
import { RestaurantContext, ThemeContext } from "../App";
// import moment from "moment";
//firestore
import {
	doc,
	setDoc,
	addDoc,
	Timestamp,
	getDoc,
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import {
	removeDoordashFees,
	removeRestoLocoFees,
	removeTaxes,
	removeUberFees,
} from "../data/generalFonctions";

const CustomButton = styled(Button)`
	display: block;
	transform: translateX(95%);
	padding: 0;
`;
const CustomTitle = styled(Typography)`
	font-size: 1.2em;
`;
const CustomInputContainer = styled(Container)`
	padding: 1em;
	text-align: center;
`;

function CaisseForm() {
	const [total, setTotal] = useState(0);
	const [totalToDisplay, setTotalToDisplay] = useState(0);
	const [totalTips, setTotalTips] = useState(0);
	const [date, setDate] = useState();
	const [timeStampDate, setTimeStampDate] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [selectedDate, setSelectedDate] = useState();

	//context variables
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);

	//amount just added in input
	const [tpvNumber, setTpvNumber] = useState(0);
	const [argentNumber, setArgentNumber] = useState(0);
	const [wixNumber, setWixNumber] = useState(0);
	const [uberNumber, setUberNumber] = useState(0);
	const [doordashNumber, setDoordashNumber] = useState(0);
	const [restoNumber, setRestoNumber] = useState(0);
	// amount tips just added in input
	const [tpvTips, setTpvTips] = useState(0);
	const [wixTips, setWixTips] = useState(0);
	const [uberTips, setUberTips] = useState(0);
	const [doordashTips, setDoordashTips] = useState(0);
	const [restoTips, setRestoTips] = useState(0);

	//label input

	// const tipsSummary = {
	// 	date: date,
	// 	tpv: tpvTips,
	// 	wix: wixTips,
	// 	uber: uberTips,
	// 	doordash: doordashTips,
	// 	restoloco: restoTips,
	// 	total: totalTips,
	// };
	const salesSummary = {
		date: date,
		timestamp: timeStampDate,
		total: total,
		sourcesOfRevenues: {
			argent: removeTaxes(argentNumber),
			// argent: argentNumber,
			tpv: removeTaxes(tpvNumber),
			// tpv: tpvNumber,
			wix: wixNumber, //subtotal so no taxes
			restoloco: removeRestoLocoFees(restoNumber),
			uber: removeUberFees(uberNumber),
			// uber: uberNumber,
			doordash: removeDoordashFees(doordashNumber),
		},
		tips: totalTips,
	};

	const updateTotal = () => {
		const tpvAmount = tpvNumber === undefined ? Number(0) : tpvNumber;
		const tpvAmountTaxesFree =
			tpvNumber === undefined ? Number(0) : removeTaxes(tpvNumber);
		const argentAmount = argentNumber === undefined ? Number(0) : argentNumber;
		const argentAmountTaxesFree =
			argentNumber === undefined ? Number(0) : removeTaxes(argentNumber);
		const wixAmount = wixNumber === undefined ? Number(0) : wixNumber;
		const uberAmount = uberNumber === undefined ? Number(0) : uberNumber;
		const uberAmountTaxesFree =
			uberNumber === undefined ? Number(0) : removeUberFees(uberNumber);
		//uberNumber === undefined ? Number(0) : removeTaxes(uberNumber);
		const doordashAmount =
			doordashNumber === undefined ? Number(0) : doordashNumber;
		const restoAmount = restoNumber === undefined ? Number(0) : restoNumber;
		let sum =
			tpvAmountTaxesFree +
			argentAmountTaxesFree +
			wixAmount +
			uberAmountTaxesFree +
			removeDoordashFees(doordashAmount) +
			removeRestoLocoFees(restoAmount);
		setTotal(sum);
		let sumToDisplay =
			tpvAmount +
			argentAmount +
			wixAmount +
			uberAmount +
			doordashAmount +
			restoAmount;
		setTotalToDisplay(sumToDisplay);
	};
	const updateTotalTips = () => {
		const tpvAmount = tpvTips === undefined ? Number(0) : tpvTips;
		const wixAmount = wixTips === undefined ? Number(0) : wixTips;
		const uberAmount = uberTips === undefined ? Number(0) : uberTips;
		const doordashAmount =
			doordashTips === undefined ? Number(0) : doordashTips;
		const restoAmount = restoTips === undefined ? Number(0) : restoTips;
		let sum = tpvAmount + wixAmount + uberAmount + doordashAmount + restoAmount;
		setTotalTips(sum);
	};
	const getSelectedDate = (e) => {
		let day = e.$d.getDate();
		console.log(day);
		let month = e.$d.getMonth() + 1;
		console.log(month);
		let year = e.$d.getFullYear();

		setSelectedYear(year);
		// const momentDate = moment()
		// 	.date(day)
		// 	.month(month)
		// 	.year(year)
		// 	.format("MM DD YYYY");

		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;
		const formattedDate = new Date(month + "/" + day + "/" + year);
		console.log(formattedDate);
		setSelectedDate(formattedDate);
		setDate(month + "/" + day + "/" + year);
		const testDate = Timestamp.fromDate(e.$d);
		setTimeStampDate(testDate);
		setError(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const checkingrequest = query(
			collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
			where("timestamp", "==", selectedDate)
		);
		const querySnapshot = await getDocs(checkingrequest);
		console.log(querySnapshot.empty);
		if (querySnapshot.empty) {
			console.log("create");
			const userDoc = await addDoc(
				collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
				salesSummary
			);
			console.log("Document written with ID: " + userDoc.id);
			window.location.reload();
		} else {
			console.log("update");
			querySnapshot.forEach((document) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(document.id, " => ", document.data());
				const ref = collection(
					db,
					`ventes/${activeRestaurant}/${selectedYear}`
				);
				const docRef = doc(ref, document.id);
				updateDoc(docRef, salesSummary);
				window.location.reload();
			});
		}
	};
	const [error, setError] = React.useState(false);
	//const helperText = error ? "Selectionner une date" : "";
	const errorMessage = React.useMemo(() => {
		if (error) {
			return "Selectionner une date";
		}
	}, [error]);
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
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					sx={{
						left: "50%",
						transform: "translateX(-50%)",
					}}
					onChange={(e) => {
						getSelectedDate(e);
					}}
					label="Choisir une date"
					disableFuture
					onError={(newError) => setError(newError)}
					//error={error}
					//helperText={helperText}
					slotProps={{
						textField: {
							helperText: errorMessage,
						},
					}}
				/>
			</LocalizationProvider>
			<div>
				<CustomTitle>ARGENT</CustomTitle>
				<CustomInputContainer>
					<TextField
						//disabled={argent}
						//error
						id="argent"
						label="Argent"
						type="number"
						onChange={(e) => {
							setArgentNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
						}}
					/>
				</CustomInputContainer>
			</div>
			<div>
				<CustomTitle>TPV</CustomTitle>
				<CustomInputContainer>
					<TextField
						//error
						//disabled={tpv}
						id="tpv"
						label="TPV / Ventes"
						type="number"
						onChange={(e) => {
							setTpvNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
						}}
						//defaultValue="Ventes"
						//helperText="Incorrect entry."
					/>

					<TextField
						//error
						id="tpv_tips"
						label="TPV / Tips"
						type="number"
						//defaultValue="Tips"
						//helperText="Incorrect entry."
						onChange={(e) => {
							setTpvTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
						}}
					/>
				</CustomInputContainer>
			</div>
			{activeRestaurant === "ficelle" ||
			activeRestaurant === "yobatta" ? null : (
				<div>
					<CustomTitle>WIX</CustomTitle>
					<CustomInputContainer>
						<TextField
							//error
							//disabled={wixInput}
							id="wix"
							label="Wix / Ventes"
							type="number"
							//defaultValue="Ventes"
							//variant="filled"
							onChange={(e) => {
								setWixNumber(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotal();
								// disableInput(e);
							}}
						/>
						<TextField
							//error
							id="filled-error-helper-text"
							label="Wix / Tips"
							type="number"
							//defaultValue="Tips"
							//helperText="Incorrect entry."
							//variant="filled"
							onChange={(e) => {
								setWixTips(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotalTips();
							}}
						/>
					</CustomInputContainer>
				</div>
			)}
			{activeRestaurant === "yobatta" ? null : (
				<div>
					<CustomTitle>UBER</CustomTitle>
					<CustomInputContainer>
						<TextField
							//error
							//disabled={uberInput}
							id="uber"
							label="Uber / Ventes"
							type="number"
							//defaultValue="Hello World"
							//variant="standard"
							onChange={(e) => {
								setUberNumber(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotal();
								// disableInput(e);
							}}
						/>
						<TextField
							//error
							id="standard-error-helper-text"
							label="Uber / Tips"
							type="number"
							//helperText="Incorrect entry."
							//variant="standard"
							onChange={(e) => {
								setUberTips(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotalTips();
							}}
						/>
					</CustomInputContainer>
				</div>
			)}
			{activeRestaurant === "yobatta" ? null : (
				<div>
					<CustomTitle>DOORDASH</CustomTitle>
					<CustomInputContainer>
						<TextField
							//error
							//disabled={doordashInput}
							id="doordash"
							label="Doordash / Ventes"
							type="number"
							onChange={(e) => {
								setDoordashNumber(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotal();
								// disableInput(e);
							}}
						/>

						<TextField
							//error
							id="standard-error-helper-text"
							label="Doordash / Tips"
							type="number"
							onChange={(e) => {
								setDoordashTips(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotalTips();
							}}
						/>
					</CustomInputContainer>
				</div>
			)}
			{activeRestaurant === "ficelle" ||
			activeRestaurant === "yobatta" ? null : (
				<div>
					<CustomTitle>RESTO LOCO</CustomTitle>
					<CustomInputContainer>
						<TextField
							//error
							id="resto"
							label="Resto Loco / Ventes"
							type="number"
							onChange={(e) => {
								setRestoNumber(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotal();
							}}
						/>
						<TextField
							//error
							id="standard-error-helper-text"
							label="Resto Loco / Tips"
							type="number"
							onChange={(e) => {
								setRestoTips(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotalTips();
							}}
						/>
					</CustomInputContainer>
				</div>
			)}
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					margin: "1em auto",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.3em",
					}}
				>
					Total ventes: ${totalToDisplay}
				</Typography>
				<Typography
					sx={{
						fontSize: "1.3em",
					}}
				>
					Total ventes HT: ${total}
				</Typography>
				<Typography
					sx={{
						fontSize: "1.3em",
					}}
				>
					Total tips: ${totalTips}
				</Typography>
			</Container>
			<Button
				sx={{
					left: "50%",
					transform: "translateX(-50%)",
					fontSize: "1.2em",
					boxShadow: 1,
					margin: "2em auto",
					background: colorTheme,
					color: "#fff",
					"&:hover": {
						color: colorTheme,
					},
				}}
				type="submit"
			>
				Envoyer
			</Button>
		</Box>
	);
}

export default CaisseForm;
