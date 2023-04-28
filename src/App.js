import { Route, Routes } from "react-router-dom";

import "./App.css";
import Caisse from "./pages/Caisse";
import Home from "./pages/Home";
import Revenus from "./pages/Revenus";
import { createContext, useState, useEffect } from "react";
import Depenses from "./pages/Depenses";

export const PeriodContext = createContext();
export const RestaurantContext = createContext();
export const ThemeContext = createContext();

function App() {
	const attaboyTheme = "#FFD702";
	const ficelleTheme = "#3C6843";
	const yobattaTheme = "#D55D8D";
	const [activePeriod, setActivePeriod] = useState("annee");
	const [activeRestaurant, setActiveRestaurant] = useState("attaboy");
	const [colorTheme, setColorTheme] = useState(attaboyTheme);

	useEffect(() => {
		const changeTheme = () => {
			switch (activeRestaurant) {
				case "attaboy":
					//setColor("#FFD702");
					setColorTheme(attaboyTheme);
					break;
				case "ficelle":
					//setColor("#3C6843");
					setColorTheme(ficelleTheme);
					break;
				case "yobatta":
					//setColor("#D55D8D");
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
						</Routes>
					</PeriodContext.Provider>
				</ThemeContext.Provider>
			</RestaurantContext.Provider>
		</>
	);
}

export default App;
