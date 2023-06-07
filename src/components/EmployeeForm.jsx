import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
//import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { db } from "../firebaseConfig";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { RestaurantContext, ThemeContext } from "../App";

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

function EmployeeForm({ handleClose }) {
	const [colorTheme] = useContext(ThemeContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	const [activeStep, setActiveStep] = useState(1);

	//form data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [cellNumber, setCellNumber] = useState("");
	const [nas, setNas] = useState("");
	const [hourlySalary, setHourlySalary] = useState("");
	const [familyName, setFamilyName] = useState("");
	const [name, setName] = useState("");
	const [relative, setRelative] = useState("");
	const [relativeNumber, setRelativeNumber] = useState("");
	const [transitNumber, setTransitNumber] = useState("");
	const [branchNumber, setBranchNumber] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	// const [timeStampDate, setTimeStampDate] = useState();

	const capitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const hideComponent = {
		display: "none",
	};
	const showComponent = {
		display: "block",
	};
	const employeeDetails = {
		personnal_infos: {
			lastName: capitalize(lastName),
			firstName: capitalize(firstName),
			birthDate: birthDate,
			email: email,
			address: address,
			cellNumber: cellNumber,
			nas: nas,
			hourlySalary: hourlySalary,
		},
		emergency_infos: {
			familyName: capitalize(familyName),
			name: capitalize(name),
			relative: relative,
			relativeNumber: relativeNumber,
		},
		bank_infos: {
			transitNumber: transitNumber,
			branchNumber: branchNumber,
			accountNumber: accountNumber,
		},
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(employeeDetails);
		const userDoc = await addDoc(
			collection(db, `personnel/${activeRestaurant}/salarie/`),
			employeeDetails
		);
		console.log("Document written with ID: " + userDoc.id);
		handleClose();
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
		setBirthDate(month + "/" + day + "/" + year);
		//const timestampFormat = Timestamp.fromDate(e.$d);
		//setTimeStampDate(timestampFormat);
		// setError(false);
	};
	return (
		<Box
			component="form"
			sx={{
				padding: "1em",
				"& .MuiTextField-root": { m: 1, width: "100%" },
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<Box sx={style}>
				<Container sx={activeStep === 1 ? showComponent : hideComponent}>
					<Typography variant="h6" sx={{ margin: "1em auto" }}>
						Renseignements personnels
					</Typography>
					<Box>
						<TextField
							required
							id="outlined-required"
							label="Nom"
							onChange={(e) => setLastName(e.target.value)}
							sx={{
								"& .MuiInputBase-input": {
									height: "1em",
								},
							}}
						/>
					</Box>
					<Box>
						<TextField
							required
							id="outlined-required"
							label="Prénom"
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Box>
					<Box>
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
								label="Date de naissance"
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
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Adresse"
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							// type="number"
							label="Numéro de cellulaire"
							onChange={(e) => setCellNumber(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Numero d'assurance sociale"
							onChange={(e) => setNas(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Salaire"
							onChange={(e) => setHourlySalary(e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							textAlign: "right",
						}}
					>
						<Button
							onClick={() => setActiveStep(2)}
							sx={{ margin: "1em auto" }}
						>
							Suivant
						</Button>
					</Box>
				</Container>
				<Container sx={activeStep === 2 ? showComponent : hideComponent}>
					<Typography variant="h6" sx={{ margin: "1em auto" }}>
						Contact d'urgence
					</Typography>
					<Box>
						<TextField
							required
							id="outlined-required"
							label="Nom"
							onChange={(e) => setFamilyName(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							required
							id="outlined-required"
							label="Prénom"
							onChange={(e) => setName(e.target.value)}
						/>
					</Box>

					<Box>
						<TextField
							id="outlined-required"
							label="Relation (ex:famille, ami)"
							onChange={(e) => setRelative(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							// type="number"
							label="Numéro de cellulaire"
							onChange={(e) => setRelativeNumber(e.target.value)}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Button onClick={() => setActiveStep(1)} sx={{ margin: "1em 0" }}>
							Precedent
						</Button>
						<Button onClick={() => setActiveStep(3)} sx={{ margin: "1em 0" }}>
							Suivant
						</Button>
					</Box>
				</Container>
				<Container sx={activeStep === 3 ? showComponent : hideComponent}>
					<Typography variant="h6" sx={{ margin: "1em auto" }}>
						Informations bancaires
					</Typography>
					<Box>
						<TextField
							id="outlined-required"
							label="Numéro de transit"
							onChange={(e) => setTransitNumber(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Numéro de succursale"
							onChange={(e) => setBranchNumber(e.target.value)}
						/>
					</Box>
					<Box>
						<TextField
							id="outlined-required"
							label="Numéro de compte"
							onChange={(e) => setAccountNumber(e.target.value)}
						/>
					</Box>
					<Box>
						<Button onClick={() => setActiveStep(2)}>Précedent</Button>
					</Box>
					<Box
						sx={{
							textAlign: "center",
							marginTop: "1em",
						}}
					>
						<Button
							type="submit"
							sx={{
								background: colorTheme,
								color: "#fff",
								fontSize: "1.2em",
								"&:hover": {
									color: colorTheme,
									background: "#fff",
								},
							}}
						>
							Ajouter
						</Button>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}

export default EmployeeForm;
