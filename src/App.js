import { Route, Routes } from "react-router-dom";

import "./App.css";
import Caisse from "./pages/Caisse";
import Home from "./pages/Home";
import Revenus from "./pages/Revenus";
import { createContext, useState, useEffect } from "react";
import Depenses from "./pages/Depenses";
import Employes from "./pages/Employes";

export const PeriodContext = createContext();
export const RestaurantContext = createContext();
export const ThemeContext = createContext();

function App() {
	const soguaresTheme = "#b4a693";
	const attaboyTheme = "#e0bf00";
	const ficelleTheme = "#3C6843";
	const yobattaTheme = "#D55D8D";
	const [activePeriod, setActivePeriod] = useState("annee");
	const [activeRestaurant, setActiveRestaurant] = useState("attaboy");
	const [colorTheme, setColorTheme] = useState(attaboyTheme);

	useEffect(() => {
		const changeTheme = () => {
			switch (activeRestaurant) {
				case "soguares":
					setColorTheme(soguaresTheme);
					break;
				case "attaboy":
					setColorTheme(attaboyTheme);
					break;
				case "ficelle":
					setColorTheme(ficelleTheme);
					break;
				case "yobatta":
					setColorTheme(yobattaTheme);
					break;
				default:
					console.log("not working");
					break;
			}
		};
		changeTheme();
	}, [activeRestaurant, setColorTheme]);

	return (
		<>
			<RestaurantContext.Provider
				value={[activeRestaurant, setActiveRestaurant]}
			>
				<ThemeContext.Provider value={[colorTheme, setColorTheme]}>
					<PeriodContext.Provider value={[activePeriod, setActivePeriod]}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/revenus" element={<Revenus />} />
							<Route path="/caisse" element={<Caisse />} />
							<Route path="/depenses" element={<Depenses />} />
							<Route path="/employes" element={<Employes />} />
						</Routes>
					</PeriodContext.Provider>
				</ThemeContext.Provider>
			</RestaurantContext.Provider>
		</>
	);
}

export default App;
