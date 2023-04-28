import React from "react";
import Sidebar from "../components/Sidebar";
import { Container, Typography } from "@mui/material";

function Depenses() {
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
			</Container>
		</div>
	);
}

export default Depenses;
