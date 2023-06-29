import React, { useContext } from "react";
import { RestaurantContext } from "../App";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../App";
import { checkUserLoggedIn } from "../data/generalFonctions";
import { useNavigate } from "react-router-dom";
import //collection,
//query,
//where,
//getDocs,
//onSnapshot,
"firebase/firestore";
//import { db } from "../firebaseConfig";
import { Container, Divider } from "@mui/material";
import Period from "../components/Period";
import AttaboyRevenue from "../components/AttaboyRevenue";
import FicelleRevenue from "../components/FicelleRevenue";
import YobattaRevenue from "../components/YobattaRevenue";
import Authentication from "./Authentication";

function Revenus() {
	// react context variable
	const [activeRestaurant] = useContext(RestaurantContext);
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
						{activeRestaurant === "attaboy" ? <AttaboyRevenue /> : null}
						{activeRestaurant === "ficelle" ? <FicelleRevenue /> : null}
						{activeRestaurant === "yobatta" ? <YobattaRevenue /> : null}
						<Divider />
					</Container>
				</div>
			) : (
				<Authentication />
			)}
		</>
	);
}

export default Revenus;
