import React from "react";
import { useState, useContext } from "react";
import { PeriodContext, StartEndDateContext, ThemeContext } from "../App";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, Space } from "antd";
import "../index.css";

import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
const { RangePicker } = DatePicker;

function Period() {
	const [activePeriod, setActivePeriod] = useContext(PeriodContext);
	const [startEndDate, setStartEndDate] = useContext(StartEndDateContext);
	const [colorTheme] = useContext(ThemeContext);

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const pastMonth = new Date(2020, 10, 15);
	const defaultSelected = {
		from: pastMonth,
		to: addDays(pastMonth, 4),
	};
	const [range, setRange] = useState(defaultSelected);
	let footer = <p>Please pick the first day.</p>;
	if (range?.from) {
		if (!range.to) {
			footer = <p>{format(range.from, "PPP")}</p>;
		} else if (range.to) {
			footer = (
				<p>
					{format(range.from, "PPP")}–{format(range.to, "PPP")}
				</p>
			);
		}
	}

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
	const onChange = (e) => {
		const start = e[0].$d;
		const end = e[1].$d;
		setStartDate(start);
		setEndDate(end);
		setStartEndDate([start, end]);
	};

	console.log(startEndDate);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Tabs
					value={activePeriod}
					onChange={handleChange}
					aria-label="tableau de periodes"
					TabIndicatorProps={{
						style: {
							backgroundColor: `${colorTheme}`,
						},
					}}
				>
					<StyledTab value="annee" label="Année" />
					<StyledTab value="mois" label="Mois" />
					<StyledTab value="semaine" label="Semaine" />
					<StyledTab value="custom" label="Personnalisé" />
				</Tabs>
				<Box
					sx={{
						marginLeft: "1em",
					}}
				>
					{activePeriod === "custom" ? (
						<Space direction="vertical" size={6}>
							<RangePicker onChange={onChange} />
							{/* <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker picker="year" /> */}
						</Space>
					) : null}
				</Box>
			</Box>
		</>
	);
}

export default Period;
