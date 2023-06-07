import React from "react";
import { useState, useEffect, useContext } from "react";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

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
					onChange={handleChange}
					aria-label="tableau de periodes"
					//indicatorColor="secondary"
					TabIndicatorProps={{
						style: {
							backgroundColor: `${colorTheme}`,
						},
					}}
				>
					<StyledTab value="annee" label="Année" />
					<StyledTab value="mois" label="Mois" />
					<StyledTab value="semaine" label="Semaine" />
				</Tabs>
			</Box>
			<Box>
				{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateRangePicker"]}>
						<DateRangePicker
							localeText={{ start: "Check-in", end: "Check-out" }}
						/>
					</DemoContainer>
				</LocalizationProvider> */}
			</Box>
		</>
	);
}

export default Period;
