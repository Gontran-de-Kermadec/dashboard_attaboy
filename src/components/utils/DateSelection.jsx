import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function DateSelection() {
	const getSelectedDate = (e) => {
		let day = e.$d.getDate();
		console.log(day);
		let month = e.$d.getMonth() + 1;
		console.log(month);
		let year = e.$d.getFullYear();

		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;

		const formattedDate = new Date(month + "/" + day + "/" + year);
		console.log(formattedDate);
		// setSelectedDate(formattedDate);
		// setDate(month + "/" + day + "/" + year);
		// const testDate = Timestamp.fromDate(e.$d);
		// setTimeStampDate(testDate);
		// setError(false);
	};
	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{/* <DemoContainer components={["DatePicker"]}> */}
				<DatePicker
					sx={{
						left: "50%",
						transform: "translateX(-50%)",
						width: "100%",
					}}
					onChange={(e) => {
						getSelectedDate(e);
					}}
					label="Choisir une date"
					disableFuture
					//onError={(newError) => setError(newError)}
					//error={error}
					//helperText={helperText}
					// slotProps={{
					// 	textField: {
					// 		helperText: errorMessage,
					// 	},
					// }}
				/>
				{/* </DemoContainer> */}
			</LocalizationProvider>
		</div>
	);
}

export default DateSelection;
