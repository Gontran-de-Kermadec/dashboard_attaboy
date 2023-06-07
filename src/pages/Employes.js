import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebaseConfig";
import {
	doc,
	// setDoc,
	// addDoc,
	// Timestamp,
	getDoc,
	collection,
	query,
	where,
	// getDocs,
	onSnapshot,
	// deleteDoc
	deleteDoc,
	updateDoc,
} from "firebase/firestore";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//Material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {
	SpanItem,
	CardTitle,
	style,
} from "../components/utils/StyledComponents";

import { RestaurantContext, ThemeContext } from "../App";
import EmployeeForm from "../components/EmployeeForm";
import "../App.css";
// const SpanItem = styled(Box)(({ theme }) => ({
// 	fontWeight: "bold",
// }));

function Employes() {
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);

	const [activeEmployee, setActiveEmployee] = useState();
	const [employeesDatas, setEmployeesDatas] = useState([]);

	const [currentField, setCurrentField] = useState("");
	const [parentToElement, setParentToElement] = useState("");
	const [userId, setUserId] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openDelete, setOpenDelete] = useState(false);
	const handleOpenDelete = (id) => {
		console.log(id);
		setUserId(id);
		setOpenDelete(true);
	};
	const handleCloseDelete = () => setOpenDelete(false);

	//update section
	const [openUpdatePersonnalInfos, setOpenUpdatePersonnalInfos] =
		useState(false);
	const [openUpdateEmergencyInfos, setOpenUpdateEmergencyInfos] =
		useState(false);
	const [openUpdateBankInfos, setOpenUpdateBankInfos] = useState(false);
	const [sectionDatas, setSectionDatas] = useState();
	const [sectionDatasTitle, setSectionDatasTitle] = useState();
	const [newFamilyName, setNewFamilyName] = useState();
	const [newFirstName, setNewFirstName] = useState();
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

	const [accountNumber, setAccountNumber] = useState();
	const [branchNumber, setBranchNumber] = useState();
	const [transitNumber, setTransitNumber] = useState();

	const personnalInfos = {
		lastName: newFamilyName,
		firstName: newFirstName,
		birthDate: birthDate,
		email: email,
		address: address,
		cellNumber: cellNumber,
		nas: nas,
		hourlySalary: hourlySalary,
	};
	const emergencyInfos = {
		familyName: familyName,
		name: name,
		relative: relative,
		relativeNumber: relativeNumber,
	};
	const bankInfos = {
		accountNumber: accountNumber,
		branchNumber: branchNumber,
		transitNumber: transitNumber,
	};
	const handleOpenPersonnalInfos = (id, section, datas) => {
		console.log(datas);
		setUserId(id);
		setSectionDatasTitle(section);
		setSectionDatas(datas);
		setNewFamilyName(datas.lastName);
		setNewFirstName(datas.firstName);
		setBirthDate(datas.birthDate);
		setAddress(datas.address);
		setEmail(datas.email);
		setCellNumber(datas.cellNumber);
		setNas(datas.nas);
		setHourlySalary(datas.hourlySalary);

		setOpenUpdatePersonnalInfos(true);
	};
	const handleOpenEmergencyInfos = (id, section, datas) => {
		setUserId(id);
		setSectionDatasTitle(section);
		setSectionDatas(datas);
		setFamilyName(datas.familyName);
		setName(datas.name);
		setRelative(datas.relative);
		setRelativeNumber(datas.relativeNumber);

		setOpenUpdateEmergencyInfos(true);
	};
	const handleOpenBankInfos = (id, section, datas) => {
		setUserId(id);
		setSectionDatasTitle(section);
		setSectionDatas(datas);
		setAccountNumber(datas.accountNumber);
		setBranchNumber(datas.branchNumber);
		setTransitNumber(datas.transitNumber);

		setOpenUpdateBankInfos(true);
	};
	const handleCloseUpdatePersonnalInfos = () =>
		setOpenUpdatePersonnalInfos(false);
	const handleCloseUpdateEmergencyInfos = () =>
		setOpenUpdateEmergencyInfos(false);
	const handleCloseUpdateBankInfos = () => setOpenUpdateBankInfos(false);

	const handleUpdate = async (e) => {
		e.preventDefault();
		console.log(userId, sectionDatasTitle);
		const docRef = doc(db, `personnel/${activeRestaurant}/salarie/${userId}`);
		if (sectionDatasTitle === "personnal_infos") {
			console.log(personnalInfos);
			await updateDoc(docRef, {
				personnal_infos: personnalInfos,
			});
			console.log("done");
		} else if (sectionDatasTitle === "emergency_infos") {
			console.log(emergencyInfos);
			await updateDoc(docRef, {
				emergency_infos: emergencyInfos,
			});
			console.log("done");
		} else if (sectionDatasTitle === "bank_infos") {
			console.log(bankInfos);
			await updateDoc(docRef, {
				bank_infos: bankInfos,
			});
			console.log("done");
		}
		window.location.reload();
	};
	// const CardTitle = styled(Typography)(({ theme }) => ({
	// 	margin: "0.5em 0",
	// 	fontSize: "1.3em",
	// }));
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
	const CardButton = styled(Button)(({ theme }) => ({
		background: colorTheme,
		color: "#fff",
		"&:hover": {
			background: "#fff",
			color: colorTheme,
		},
	}));
	const handleDeleteEmployee = async () => {
		await deleteDoc(doc(db, `personnel/${activeRestaurant}/salarie/${userId}`));
		setOpenDelete(false);
	};
	// useEffect(() => {
	// 	const request = query(
	// 		collection(db, `personnel/${activeRestaurant}/salarie`),
	// 		where("personnal_infos.cellNumber", "==", "581-442-0325")
	// 		// where("timestamp", "<=", todayDate)
	// 	);
	// 	console.log(request);
	// 	// let dataToDisplay = [];
	// 	// let dataWithDocId;
	// 	onSnapshot(request, (querySnapshot) => {
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.id);
	// 			// dataWithDocId = doc.data();
	// 			// dataWithDocId.documentId = doc.id;
	// 			// dataToDisplay.push(dataWithDocId);
	// 		});
	// 		//setEmployeesDatas(dataToDisplay);
	// 	});
	// }, [activeRestaurant]);
	useEffect(() => {
		const request = query(
			collection(db, `personnel/${activeRestaurant}/salarie`)
			// where("timestamp", ">=", startDate),
			// where("timestamp", "<=", todayDate)
		);
		console.log(request);
		let dataToDisplay = [];
		let dataWithDocId;
		onSnapshot(request, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.id);
				dataWithDocId = doc.data();
				dataWithDocId.documentId = doc.id;
				dataToDisplay.push(dataWithDocId);
			});
			console.log(dataToDisplay);
			setEmployeesDatas(dataToDisplay);
		});
	}, [activeRestaurant]);
	console.log(employeesDatas);
	return (
		<>
			<div className="flex">
				<Sidebar />
				<Box
					sx={{
						width: "100%",
					}}
				>
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
						Ajouter un collègue !
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="add-employee-modal"
						aria-describedby="modal-modal-description"
					>
						<div>
							<EmployeeForm handleClose={handleClose} />
						</div>
					</Modal>
					<Typography>
						Nombre total de collègues: {employeesDatas.length}
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
						}}
					>
						<Box>
							{employeesDatas?.map((employee) => {
								return (
									<Typography
										key={employee.documentId}
										onClick={() =>
											setActiveEmployee(employee.personnal_infos.lastName)
										}
										sx={{
											margin: "1em 0",
											boxShadow: 2,
											padding: "1em 2em",
										}}
									>
										{employee.personnal_infos.firstName}{" "}
										{employee.personnal_infos.lastName}
									</Typography>
								);
							})}
						</Box>
						<Box
							sx={{
								width: "70%",
							}}
						>
							<Box>
								{employeesDatas?.map((employee) => {
									return activeEmployee ===
										employee.personnal_infos.lastName ? (
										<Container
											key={employee.documentId}
											sx={{
												width: "80%",
												boxShadow: 2,
												padding: "1em",
											}}
										>
											<Typography
												sx={{
													textAlign: "center",
													fontSize: "2em",
												}}
											>
												{employee.personnal_infos.firstName}{" "}
												{employee.personnal_infos.lastName}
											</Typography>
											<Box>
												<Container
													sx={{
														display: "flex",
														justifyContent: "space-between",
														"&:hover .MuiTypography-root:nth-of-type(even)": {
															//color: "red",
															opacity: "1",
														},
													}}
													className="hover"
												>
													<CardTitle>Renseignements personnels</CardTitle>
													<Typography
														sx={{
															color: colorTheme,
															opacity: "0",
														}}
														onClick={() =>
															// handleOpenUpdate(
															handleOpenPersonnalInfos(
																employee.documentId,
																"personnal_infos",
																employee.personnal_infos
															)
														}
													>
														{" "}
														edit
													</Typography>
												</Container>
												<Typography>
													<SpanItem component="span">Nom : </SpanItem>
													{employee.personnal_infos.lastName}
												</Typography>
												{/* <Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
														"&:hover .MuiTypography-root:nth-of-type(even)": {
															//color: "red",
															opacity: "1",
														},
													}}
													className="hover"
												>
													<Typography>
														<SpanItem component="span">Nom : </SpanItem>
														{employee.personnal_infos.lastName}
													</Typography>
													<Typography
														sx={{
															color: colorTheme,
															opacity: "0",
														}}
														onClick={() =>
															handleOpenUpdate(
																employee.documentId,
																"Nom",
																"familyName"
															)
														}
													>
														{" "}
														edit
													</Typography>
												</Box> */}

												<Typography>
													<SpanItem component="span">Prénom : </SpanItem>{" "}
													{employee.personnal_infos.firstName}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Date de naissance :{" "}
													</SpanItem>
													{employee.personnal_infos.birthDate}
												</Typography>
												<Typography>
													<SpanItem component="span">Adresse : </SpanItem>
													{employee.personnal_infos.address}
												</Typography>
												<Typography>
													<SpanItem component="span">Email : </SpanItem>
													{employee.personnal_infos.email}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Numéro de cellulaire :{" "}
													</SpanItem>
													{employee.personnal_infos.cellNumber}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Numéro d'assurance sociale :{" "}
													</SpanItem>
													{employee.personnal_infos.nas}
												</Typography>
												<Typography>
													<SpanItem component="span">Salaire : </SpanItem>
													{employee.personnal_infos.hourlySalary !== ""
														? employee.personnal_infos.hourlySalary + "$"
														: " "}
												</Typography>
											</Box>
											<Box>
												<Container
													sx={{
														display: "flex",
														justifyContent: "space-between",
														"&:hover .MuiTypography-root:nth-of-type(even)": {
															opacity: "1",
														},
													}}
													className="hover"
												>
													<CardTitle>Contact en cas d'urgence</CardTitle>
													<Typography
														sx={{
															color: colorTheme,
															opacity: "0",
														}}
														onClick={() => {
															//console.log("cooool");
															handleOpenEmergencyInfos(
																employee.documentId,
																"emergency_infos",
																employee.emergency_infos
															);
														}}
													>
														{" "}
														edit
													</Typography>
												</Container>
												<Typography>
													<SpanItem component="span">Nom : </SpanItem>
													{employee.emergency_infos.familyName}
												</Typography>
												<Typography>
													<SpanItem component="span">Prénom : </SpanItem>
													{employee.emergency_infos.name}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Relation (ex: père, mère, ...) :{" "}
													</SpanItem>
													{employee.emergency_infos.relative}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Numéro de cellulaire :{" "}
													</SpanItem>
													{employee.emergency_infos.relativeNumber}
												</Typography>
											</Box>
											<Box>
												<Container
													sx={{
														display: "flex",
														justifyContent: "space-between",
														"&:hover .MuiTypography-root:nth-of-type(even)": {
															opacity: "1",
														},
													}}
													className="hover"
												>
													<CardTitle>Informations bancaires</CardTitle>
													<Typography
														sx={{
															color: colorTheme,
															opacity: "0",
														}}
														onClick={() => {
															//console.log("cooool");
															handleOpenBankInfos(
																employee.documentId,
																"bank_infos",
																employee.bank_infos
															);
														}}
													>
														{" "}
														edit
													</Typography>
												</Container>
												<Typography>
													<SpanItem component="span">
														Numéro de transit :{" "}
													</SpanItem>
													{employee.bank_infos.transitNumber}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Numéro de succursale :{" "}
													</SpanItem>
													{employee.bank_infos.branchNumber}
												</Typography>
												<Typography>
													<SpanItem component="span">
														Numéro de compte :{" "}
													</SpanItem>
													{employee.bank_infos.accountNumber}
												</Typography>
											</Box>
											<Box
												sx={{
													marginTop: "1em",
													textAlign: "center",
												}}
											>
												<CardButton
													onClick={() => handleOpenDelete(employee.documentId)}
												>
													Supprimer {employee.personnal_infos.firstName}
												</CardButton>
											</Box>
										</Container>
									) : null;
								})}
							</Box>
						</Box>
					</Box>
					<Modal
						open={openDelete}
						onClose={handleCloseDelete}
						aria-labelledby="delete-employee-modal"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography
								sx={{
									textAlign: "center",
									fontSize: "2em",
								}}
							>
								C'est sûr !?
							</Typography>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									marginTop: "2em",
								}}
							>
								<Button
									onClick={handleDeleteEmployee}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Oui
								</Button>
								<Button
									onClick={handleCloseDelete}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Non
								</Button>
							</Box>
						</Box>
					</Modal>
					<Modal
						open={openUpdatePersonnalInfos}
						onClose={handleCloseUpdatePersonnalInfos}
						aria-labelledby="update-employee-modal"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							{/* <Typography
								sx={{
									textAlign: "center",
									//fontSize: "2em",
								}}
							>
								Nouveau {fieldNameFrench?.toLowerCase()}
							</Typography> */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									marginTop: "2em",
								}}
							>
								<Box
									component="form"
									sx={{
										padding: "1em",
										"& .MuiTextField-root": { m: 1, width: "100%" },
									}}
									noValidate
									autoComplete="off"
									onSubmit={handleUpdate}
								>
									<Box>
										{/* <TextField
											id="outlined-required"
											//label={fieldNameFrench}
											onChange={(e) => setUpdatedValue(e.target.value)}
										/> */}
										{sectionDatas ? (
											<>
												<Typography
													sx={{
														textAlign: "center",
														//fontSize: "2em",
													}}
												>
													{sectionDatasTitle}
												</Typography>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.lastName !== ""
															? sectionDatas.lastName
															: "Nom"
													}
													onChange={(e) => setNewFamilyName(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													label={sectionDatas.firstName}
													onChange={(e) => setNewFirstName(e.target.value)}
												/>
												{/* <TextField
													id="outlined-required"
													label={sectionDatas.birthDate}
													onChange={(e) => setBirthDate(e.target.value)}
												/> */}
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
														//label="Date de naissance"
														label={
															sectionDatas.birthDate !== ""
																? sectionDatas.birthDate
																: "Date de naissance"
														}
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
												<TextField
													id="outlined-required"
													label={
														sectionDatas.address !== ""
															? sectionDatas.address
															: "Adresse"
													}
													onChange={(e) => setAddress(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													//label={sectionDatas.email}
													label={
														sectionDatas.email !== ""
															? sectionDatas.email
															: "Email"
													}
													onChange={(e) => setEmail(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													//label={sectionDatas.cellNumber}
													label={
														sectionDatas.cellNumber !== ""
															? sectionDatas.cellNumber
															: "Numéro de cellulaire"
													}
													onChange={(e) => setCellNumber(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													//label={sectionDatas.nas}
													label={
														sectionDatas.nas !== ""
															? sectionDatas.nas
															: "Numéro d'assurance sociale"
													}
													onChange={(e) => setNas(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													//label={sectionDatas.nas}
													label={
														sectionDatas.hourlySalary !== ""
															? sectionDatas.hourlySalary
															: "Salaire"
													}
													onChange={(e) => setHourlySalary(e.target.value)}
												/>
											</>
										) : (
											<p>null</p>
										)}
									</Box>
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
										Modifier
									</Button>
								</Box>
								{/* <Button
									onClick={handleDeleteEmployee}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Oui
								</Button>
								<Button
									onClick={handleCloseDelete}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Non
								</Button> */}
							</Box>
						</Box>
					</Modal>
					<Modal
						open={openUpdateEmergencyInfos}
						onClose={handleCloseUpdateEmergencyInfos}
						aria-labelledby="update-employee-modal"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							{/* <Typography
								sx={{
									textAlign: "center",
									//fontSize: "2em",
								}}
							>
								Nouveau {fieldNameFrench?.toLowerCase()}
							</Typography> */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									marginTop: "2em",
								}}
							>
								<Box
									component="form"
									sx={{
										padding: "1em",
										"& .MuiTextField-root": { m: 1, width: "100%" },
									}}
									noValidate
									autoComplete="off"
									onSubmit={handleUpdate}
								>
									<Box>
										{/* <TextField
											id="outlined-required"
											//label={fieldNameFrench}
											onChange={(e) => setUpdatedValue(e.target.value)}
										/> */}
										{sectionDatas ? (
											<>
												<Typography
													sx={{
														textAlign: "center",
														//fontSize: "2em",
													}}
												>
													{sectionDatasTitle}
												</Typography>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.familyName !== ""
															? sectionDatas.familyName
															: "Nom"
													}
													onChange={(e) => setFamilyName(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.name !== ""
															? sectionDatas.name
															: "Prénom"
													}
													onChange={(e) => setName(e.target.value)}
												/>

												<TextField
													id="outlined-required"
													label={
														sectionDatas.relative !== ""
															? sectionDatas.relative
															: "Relation"
													}
													onChange={(e) => setRelative(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.relativeNumber !== ""
															? sectionDatas.relativeNumber
															: "Numéro de cellulaire"
													}
													onChange={(e) => setRelativeNumber(e.target.value)}
												/>
											</>
										) : (
											<p>null</p>
										)}
									</Box>
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
										Modifier
									</Button>
								</Box>
								{/* <Button
									onClick={handleDeleteEmployee}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Oui
								</Button>
								<Button
									onClick={handleCloseDelete}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Non
								</Button> */}
							</Box>
						</Box>
					</Modal>
					<Modal
						open={openUpdateBankInfos}
						onClose={handleCloseUpdateBankInfos}
						aria-labelledby="update-employee-modal"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							{/* <Typography
								sx={{
									textAlign: "center",
									//fontSize: "2em",
								}}
							>
								Nouveau {fieldNameFrench?.toLowerCase()}
							</Typography> */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									marginTop: "2em",
								}}
							>
								<Box
									component="form"
									sx={{
										padding: "1em",
										"& .MuiTextField-root": { m: 1, width: "100%" },
									}}
									noValidate
									autoComplete="off"
									onSubmit={handleUpdate}
								>
									<Box>
										{/* <TextField
											id="outlined-required"
											//label={fieldNameFrench}
											onChange={(e) => setUpdatedValue(e.target.value)}
										/> */}
										{sectionDatas ? (
											<>
												<Typography
													sx={{
														textAlign: "center",
														//fontSize: "2em",
													}}
												>
													{sectionDatasTitle}
												</Typography>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.accountNumber !== ""
															? sectionDatas.accountNumber
															: "Numéro de compte"
													}
													onChange={(e) => setAccountNumber(e.target.value)}
												/>
												<TextField
													id="outlined-required"
													label={
														sectionDatas.branchNumber !== ""
															? sectionDatas.branchNumber
															: "Numéro de succursale"
													}
													onChange={(e) => setBranchNumber(e.target.value)}
												/>

												<TextField
													id="outlined-required"
													label={
														sectionDatas.transitNumber !== ""
															? sectionDatas.transitNumber
															: "Numéro de transit"
													}
													onChange={(e) => setTransitNumber(e.target.value)}
												/>
											</>
										) : (
											<p>null</p>
										)}
									</Box>
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
										Modifier
									</Button>
								</Box>
								{/* <Button
									onClick={handleDeleteEmployee}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Oui
								</Button>
								<Button
									onClick={handleCloseDelete}
									sx={{
										fontSize: "1.2em",
										background: colorTheme,
										color: "#fff",
										"&:hover": {
											background: "#fff",
											color: colorTheme,
										},
									}}
								>
									Non
								</Button> */}
							</Box>
						</Box>
					</Modal>
				</Box>
			</div>
		</>
	);
}

export default Employes;
