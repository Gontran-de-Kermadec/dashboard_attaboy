import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebaseConfig";
import {
	// doc,
	// setDoc,
	// addDoc,
	// Timestamp,
	// getDoc,
	collection,
	query,
	// where,
	// getDocs,
	onSnapshot,
	// updateDoc,
} from "firebase/firestore";
//Material ui
import Box from "@mui/material/Box";
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

// const SpanItem = styled(Box)(({ theme }) => ({
// 	fontWeight: "bold",
// }));

function Employes() {
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);

	const [activeEmployee, setActiveEmployee] = useState();
	const [employeesDatas, setEmployeesDatas] = useState([]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openDelete, setOpenDelete] = useState(false);
	const handleOpenDelete = () => setOpenDelete(true);
	const handleCloseDelete = () => setOpenDelete(false);

	// const CardTitle = styled(Typography)(({ theme }) => ({
	// 	margin: "0.5em 0",
	// 	fontSize: "1.3em",
	// }));
	const CardButton = styled(Button)(({ theme }) => ({
		background: colorTheme,
		color: "#fff",
		"&:hover": {
			background: "#fff",
			color: colorTheme,
		},
	}));

	useEffect(() => {
		const request = query(
			//collection(db, `ventes/attaboy/${currentYear}`),
			collection(db, `personnel/${activeRestaurant}/salarie`)
			// where("timestamp", ">=", startDate),
			// where("timestamp", "<=", todayDate)
		);
		console.log(request);
		let dataToDisplay = [];
		onSnapshot(request, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				dataToDisplay.push(doc.data());
			});
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
							<EmployeeForm />
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
											sx={{
												// position: "absolute",
												// right: "0",
												// top: "-50%",
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
												<CardTitle>Renseignements personnels</CardTitle>
												<Typography>
													<SpanItem component="span">Nom : </SpanItem>
													{employee.personnal_infos.lastName}
												</Typography>
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
											</Box>
											<Box>
												<CardTitle>Contact en cas d'urgence</CardTitle>
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
												<CardTitle>Informations bancaires</CardTitle>
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
													display: "flex",
													justifyContent: "space-around",
													marginTop: "1em",
												}}
											>
												<CardButton onClick={handleOpenDelete}>
													Supprimer {employee.personnal_infos.firstName}
												</CardButton>
												<CardButton onClick={handleOpen}>Modifer</CardButton>
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
							<Typography>C'est sûr !?</Typography>
							<Box>
								<Button>Oui</Button>
								<Button onClick={handleCloseDelete}>Non</Button>
							</Box>
						</Box>
					</Modal>
				</Box>
			</div>
		</>
	);
}

export default Employes;