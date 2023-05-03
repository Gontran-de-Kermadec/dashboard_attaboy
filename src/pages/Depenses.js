import React from "react";
import Sidebar from "../components/Sidebar";
import { Container } from "@mui/material";
import AttaboyExpenses from "../components/AttaboyExpenses";
import Period from "../components/Period";

function Depenses() {
	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<Period />
				<AttaboyExpenses />
			</Container>
		</div>
	);
}

export default Depenses;
