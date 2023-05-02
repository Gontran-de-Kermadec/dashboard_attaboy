import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Container, Typography } from "@mui/material";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
import AttaboyExpenses from "../components/AttaboyExpenses";

// const style = {
// 	position: "absolute",
// 	top: "50%",
// 	left: "50%",
// 	transform: "translate(-50%, -50%)",
// 	width: 400,
// 	bgcolor: "background.paper",
// 	border: "2px solid #000",
// 	boxShadow: 24,
// 	p: 4,
// };

function Depenses() {
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	return (
		<div className="flex">
			<Sidebar />
			<Container>
				{/* <Period /> */}
				<Typography>Depenses</Typography>
				<p>ajouter une depense</p>
				<p>date</p>
				<p>bouton: - salaires / - commandes / - autres</p>
				<p>si autre: ajouter remarque</p>
				<p>montant</p>
				<p>envoyer</p>
				<AttaboyExpenses />
			</Container>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			{/* <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal> */}
		</div>
	);
}

export default Depenses;
