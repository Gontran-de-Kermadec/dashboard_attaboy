import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DateSelection from "./utils/DateSelection";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

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

	const [type, setType] = useState("");

	const handleChange = (event) => {
		setType(event.target.value);
	};
	return (
		<div>
			<Button onClick={handleOpen}>Ajouter une dépense</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{/* <Container> */}

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
							width: "30vw",
							margin: "1em auto",
						}}
					>
						<DateSelection />
					</Box>
					<Box
						sx={{
							width: "30vw",
							margin: "1em auto",
						}}
					>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={type}
								label="Age"
								onChange={handleChange}
							>
								<MenuItem value="Salaires">Salaires</MenuItem>
								<MenuItem value="Commandes">Commandes</MenuItem>
								<MenuItem value="Autre">Autre</MenuItem>
							</Select>
						</FormControl>
					</Box>
					{type === "Autre" ? (
						<Box
							sx={{
								width: "30vw",
								margin: "1em auto",
							}}
						>
							<TextField
								id="outlined-multiline-flexible"
								label="Remarque"
								multiline
								maxRows={4}
								sx={{
									width: "100%",
								}}
							/>
						</Box>
					) : null}
					<Box
						sx={{
							width: "20vw",
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
							// onChange={(e) => {
							// 	setTpvTips(Number(e.target.value));
							// }}
							// onBlur={(e) => {
							// 	updateTotalTips();
							// 	//setTpvNumber(Number(e.target.value));
							// 	// disableInput(e);
							// }}
						/>
					</Box>
					<Box
						sx={{
							textAlign: "center",
						}}
					>
						<Button
							// sx={{
							// 	left: "50%",
							// 	transform: "translateX(-50%)",
							// 	fontSize: "1.2em",
							// 	boxShadow: 1,
							// 	margin: "2em auto",
							// 	background: colorTheme,
							// 	color: "#fff",
							// 	"&:hover": {
							// 		color: colorTheme,
							// 	},
							// }}
							type="submit"
						>
							Envoyer
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

export default AttaboyExpenses;
