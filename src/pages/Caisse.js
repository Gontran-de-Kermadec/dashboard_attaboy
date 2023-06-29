import React from "react";
import Sidebar from "../components/Sidebar";
import CaisseForm from "../components/CaisseForm";
import Authentication from "./Authentication";
import { useContext } from "react";
import { UserContext } from "../App";
import { checkUserLoggedIn } from "../data/generalFonctions";
import { useNavigate } from "react-router-dom";

function Caisse() {
	const navigate = useNavigate();
	const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
	checkUserLoggedIn(setUserLoggedIn, navigate);
	return (
		<>
			{userLoggedIn ? (
				<div className="flex">
					<Sidebar />
					<div className="caisse__container">
						<CaisseForm />
					</div>
				</div>
			) : (
				<Authentication />
			)}
		</>
	);
}

export default Caisse;
