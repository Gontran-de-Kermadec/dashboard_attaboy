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
import moment from "moment";
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

//console.log(db);
// import {  } from "react";

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
	console.log(activeRestaurant);
	//disable input
	// const [argent, setArgent] = useState(false);
	// const [tpv, setTpv] = useState(false);
	// const [wixInput, setWixInput] = useState(false);
	// const [uberInput, setUberInput] = useState(false);
	// const [doordashInput, setDoordashInput] = useState(false);
	// const [restoInput, setRestoInput] = useState(false);
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
	//button invisible
	//const [invisible, setInvisible] = useState(true);
	const [argentButton, setArgentButton] = useState(true);
	const [tpvButton, setTpvButton] = useState(true);
	const [wixButton, setWixButton] = useState(true);
	// const [uberButton, setUberButton] = useState(true);
	// const [doordashButton, setDoordashButton] = useState(true);
	// const [restoButton, setRestoButton] = useState(true);

	const removeTaxes = (amount) => {
		return amount - amount * (15 / 100);
	};
	const tipsSummary = {
		date: date,
		tpv: tpvTips,
		wix: wixTips,
		uber: uberTips,
		doordash: doordashTips,
		restoloco: restoTips,
		total: totalTips,
	};
	const salesSummary = {
		date: date,
		timestamp: timeStampDate,
		total: total,
		sourcesOfRevenues: {
			argent: removeTaxes(argentNumber),
			// argent: argentNumber,
			tpv: removeTaxes(tpvNumber),
			// tpv: tpvNumber,
			wix: wixNumber,
			restoloco: restoNumber,
			uber: removeTaxes(uberNumber),
			// uber: uberNumber,
			doordash: doordashNumber,
		},
	};
	// const salesSummary = {
	// 	date: date,
	// 	timestamp: timeStampDate,
	// 	argent: argentNumber,
	// 	tpv: tpvNumber,
	// 	wix: wixNumber,
	// 	uber: uberNumber,
	// 	doordash: doordashNumber,
	// 	restoloco: restoNumber,
	// 	total: total,
	// };

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
			uberNumber === undefined ? Number(0) : removeTaxes(uberNumber);
		const doordashAmount =
			doordashNumber === undefined ? Number(0) : doordashNumber;
		const restoAmount = restoNumber === undefined ? Number(0) : restoNumber;
		let sum =
			tpvAmountTaxesFree +
			argentAmountTaxesFree +
			wixAmount +
			uberAmountTaxesFree +
			doordashAmount +
			restoAmount;
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
	// const disableInput = (e) => {
	// 	switch (e.target.id) {
	// 		case "argent":
	// 			return setArgent(true);
	// 		case "tpv":
	// 			return setTpv(true);
	// 		case "wix":
	// 			return setWixInput(true);
	// 		case "uber":
	// 			return setUberInput(true);
	// 		case "doordash":
	// 			return setDoordashInput(true);
	// 		case "resto":
	// 			return setRestoInput(true);
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// 	// if(e.target.id === "argent")
	// 	// setArgent(true);
	// };
	// const enableInput = (e) => {
	// 	switch (e.target.id) {
	// 		case "argent_modify":
	// 			return setArgent(false);
	// 		case "tpv_modify":
	// 			return setTpv(false);
	// 		case "wix_modify":
	// 			return setWixInput(false);
	// 		case "uber_modify":
	// 			return setUberInput(false);
	// 		case "doordash_modify":
	// 			return setDoordashInput(false);
	// 		case "resto_modify":
	// 			return setRestoInput(false);
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// };
	// const toggleInput = (e) => {
	// 	console.log(e.target.id);
	// 	switch (e.target.id) {
	// 		case "argent":
	// 		case "tpv":
	// 		case "wix":
	// 			console.log("true");
	// 			break;
	// 		default:
	// 			return null;
	// 	}
	// };

	// const removeNumber = (e) => {
	// 	let totalNumber = Number(total);
	// 	console.log(e.target.id);
	// 	switch (e.target.id) {
	// 		case "argent_modify":
	// 			//let removedNumber = Number(argentNumber);
	// 			return setTotal(totalNumber - Number(argentNumber));
	// 		case "tpv_modify":
	// 			//let removedNumber = Number(argentNumber);
	// 			return setTotal(totalNumber - Number(tpvNumber));
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// 	// let totalNumber = Number(total);
	// 	// let removedNumber = Number(argentNumber);
	// 	// let sum = totalNumber - removedNumber;
	// 	// setTotal(sum);
	// };

	// firebase queries
	// const checkingrequest = query(
	// 	collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
	// 	where("timestamp", "==", selectedDate)
	// );
	// const dataAlreadyExist = async () => {
	// 	const checkingrequest = query(
	// 		collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
	// 		where("timestamp", "==", selectedDate)
	// 	);

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
				// updateDoc(
				// 	collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
				// 	salesSummary
				// );
				updateDoc(docRef, salesSummary);
			});
		}
		// querySnapshot.forEach((doc) => {
		// 	// doc.data() is never undefined for query doc snapshots
		// 	console.log(doc.id, " => ", doc.data());
		// });
		// if (timeStampDate === undefined) {
		// 	setError(true);
		// 	console.log(error);
		// 	return;
		// }
		// console.log("submitted");
		// await setDoc(doc(db, "ventes", date), salesSummary);
		// // const docRef = await addDoc(collection(db, "tips"), tipsSummary);
		// // console.log("Document written with ID: ", docRef.id);
		// console.log(activeRestaurant);
		// const userDoc = await setDoc(
		// 	docRef,
		// 	// collection(db, `ventes/${activeRestaurant}/${selectedYear}`),
		// 	salesSummary
		// );
		// console.log("Document written with ID: " + userDoc.id);

		//const testCollection = collection(db, "attaboy", userDoc.id, "ventes");

		//const subColl = await addDoc(testCollection, salesSummary);
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
				{/* <DemoContainer components={["DatePicker"]}> */}
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
				{/* </DemoContainer> */}
			</LocalizationProvider>
			{/* {error ? <p>Selection date</p> : null} */}
			<div>
				<CustomTitle>ARGENT</CustomTitle>
				<CustomInputContainer>
					<TextField
						//disabled={argent}
						//error
						//{...argent ? disabled : null}
						id="argent"
						label="Argent"
						type="number"
						onChange={(e) => {
							setArgentNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
						}}
					/>
					{argentButton ? null : (
						<Button
							id="argent_modify"
							onClick={(e) => {
								setArgentNumber(Number(e.target.value));
								//enableInput(e);
							}}
						>
							Modifier
						</Button>
					)}
				</CustomInputContainer>
			</div>
			<div>
				<Typography>TPV</Typography>
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
							//setTpvNumber(Number(e.target.value));
							// disableInput(e);
						}}
						//defaultValue="Ventes"
						//helperText="Incorrect entry."
					/>
					{tpvButton ? null : (
						<CustomButton
							id="tpv_modify"
							onClick={(e) => {
								//removeNumber(e);
								setTpvNumber(Number(e.target.value));
								//enableInput(e);
							}}
						>
							Modifier ventes
						</CustomButton>
					)}

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
							//setTpvNumber(Number(e.target.value));
							// disableInput(e);
						}}
					/>
				</CustomInputContainer>
			</div>
			{activeRestaurant === "ficelle" ||
			activeRestaurant === "yobatta" ? null : (
				<div>
					<Typography>Wix</Typography>
					<CustomInputContainer
					// sx={{
					// 	padding: "1em",
					// }}
					>
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
						{wixButton ? null : (
							<CustomButton
								id="wix_modify"
								onClick={(e) => {
									//removeNumber(e);
									setWixNumber(Number(e.target.value));
									//enableInput(e);
								}}
							>
								Modifier
							</CustomButton>
						)}
					</CustomInputContainer>
				</div>
			)}
			{activeRestaurant === "yobatta" ? null : (
				<div>
					<Typography>Uber</Typography>
					<CustomInputContainer
					// sx={{
					// 	padding: "1em",
					// }}
					>
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
						{/* {uberButton ? null : (
							<CustomButton
								id="uber_modify"
								onClick={(e) => {
									setUberNumber(Number(e.target.value));
									//enableInput(e);
								}}
							>
								Modifier
							</CustomButton>
						)} */}
					</CustomInputContainer>
				</div>
			)}
			{activeRestaurant === "yobatta" ? null : (
				<div>
					<Typography>Doordash</Typography>
					<CustomInputContainer
					// sx={{
					// 	padding: "1em",
					// 	textAlign: "center",
					// }}
					>
						{/* <div> */}
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
						{/* {doordashButton ? null : (
							<CustomButton
								id="doordash_modify"
								onClick={(e) => {
									setDoordashNumber(Number(e.target.value));
									//enableInput(e);
								}}
							>
								Modifier
							</CustomButton>
						)} */}
						{/* </div> */}
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
					<Typography>Resto Loco</Typography>
					<CustomInputContainer>
						<TextField
							//error
							//disabled={restoInput}
							id="resto"
							label="Resto Loco / Ventes"
							type="number"
							onChange={(e) => {
								setRestoNumber(Number(e.target.value));
							}}
							onBlur={(e) => {
								updateTotal();
								// disableInput(e);
							}}
						/>

						{/* {restoButton ? null : (
							<CustomButton
								// <CustomButton
								id="resto_modify"
								onClick={(e) => {
									setRestoNumber(Number(e.target.value));
									//enableInput(e);
								}}
							>
								Modifier
							</CustomButton>
						)} */}
						{/* </div> */}
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
					Total ventes: {totalToDisplay}$
				</Typography>
				<Typography
					sx={{
						fontSize: "1.3em",
					}}
				>
					Total ventes HT: {total}$
				</Typography>
				<Typography
					sx={{
						fontSize: "1.3em",
					}}
				>
					Total tips: {totalTips}$
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
