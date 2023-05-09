import React from "react";
import { useState, useEffect, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

function Period() {
	const [activePeriod, setActivePeriod] = useContext(PeriodContext);
	//const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	//const [color, setColor] = useState();
	const StyledTab = styled(Tab)({
		"&.Mui-selected": {
			color: colorTheme,
			// color: color,
		},
	});
	const handleChange = (e, newPeriod) => {
		console.log(newPeriod);
		setActivePeriod(newPeriod);
	};

	console.log(colorTheme);
	return (
		<>
			<Box>
				<Tabs
					value={activePeriod}
					// onChange={() => {
					// 	handleChange(activePeriod);
					// }}
					onChange={handleChange}
					aria-label="tableau de periodes"
					//indicatorColor="secondary"
					TabIndicatorProps={{
						style: {
							// backgroundColor: `${color}`,
							backgroundColor: `${colorTheme}`,
						},
					}}
				>
					<StyledTab
						value="annee"
						label="Année"
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: color,
						// 	},
						// }}
					/>
					<StyledTab
						value="mois"
						label="Mois"
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: color,
						// 	},
						// }}
					/>
					<StyledTab
						value="semaine"
						label="Semaine"
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: color,
						// 	},
						// }}
					/>
				</Tabs>
			</Box>
		</>
	);
}

export default Period;
