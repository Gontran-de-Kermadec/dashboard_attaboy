import React from "react";
import Sidebar from "../components/Sidebar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CaisseForm from "../components/CaisseForm";

function Caisse() {
	const getValue = (e) => {
		let date = e.$d;
		console.log(Date.parse(date));
		console.log(e.$d);
	};
	return (
		<>
			<div className="flex">
				<Sidebar />
				<div>
					<div>Caisse</div>
					{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							onChange={(e) => {
								getValue(e);
							}}
							label="Choisir une date"
						/>
					</LocalizationProvider> */}
					<CaisseForm />
				</div>
			</div>
		</>
	);
}

export default Caisse;
