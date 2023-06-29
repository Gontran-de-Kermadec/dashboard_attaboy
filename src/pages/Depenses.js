import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Container } from "@mui/material";
import AttaboyExpenses from "../components/AttaboyExpenses";
import Period from "../components/Period";
import { UserContext } from "../App";
import { checkUserLoggedIn } from "../data/generalFonctions";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";

function Depenses() {
	const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
	const navigate = useNavigate();
	checkUserLoggedIn(setUserLoggedIn, navigate);
	return (
		<>
			{userLoggedIn ? (
				<div className="flex">
					<Sidebar />
					<Container>
						<Period />
						<AttaboyExpenses />
					</Container>
				</div>
			) : (
				<Authentication />
			)}
		</>
	);
}

export default Depenses;
