import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import {  } from "react";

const CustomButton = styled(Button)`
	display: block;
	transform: translateX(95%);
	padding: 0;
`;
const CustomTitle = styled(Typography)`
	font-size: 1.2em;
`;
let fakeDataBase = {};

function CaisseForm() {
	const [total, setTotal] = useState(0);
	const [totalTips, setTotalTips] = useState(0);
	const [date, setDate] = useState();
	//disable input
	// const [argent, setArgent] = useState(false);
	// const [tpv, setTpv] = useState(false);
	// const [wixInput, setWixInput] = useState(false);
	// const [uberInput, setUberInput] = useState(false);
	// const [doordashInput, setDoordashInput] = useState(false);
	// const [restoInput, setRestoInput] = useState(false);
	//amount just added in input
	const [tpvNumber, setTpvNumber] = useState();
	const [argentNumber, setArgentNumber] = useState();
	const [wixNumber, setWixNumber] = useState();
	const [uberNumber, setUberNumber] = useState();
	const [doordashNumber, setDoordashNumber] = useState();
	const [restoNumber, setRestoNumber] = useState();
	// amount tips just added in input
	const [tpvTips, setTpvTips] = useState();
	const [wixTips, setWixTips] = useState();
	const [uberTips, setUberTips] = useState();
	const [doordashTips, setDoordashTips] = useState();
	const [restoTips, setRestoTips] = useState();
	//button invisible
	//const [invisible, setInvisible] = useState(true);
	const [argentButton, setArgentButton] = useState(true);
	const [tpvButton, setTpvButton] = useState(true);
	const [wixButton, setWixButton] = useState(true);
	const [uberButton, setUberButton] = useState(true);
	const [doordashButton, setDoordashButton] = useState(true);
	const [restoButton, setRestoButton] = useState(true);
	const updateTotal = () => {
		const tpvAmount = tpvNumber === undefined ? Number(0) : tpvNumber;
		const argentAmount = argentNumber === undefined ? Number(0) : argentNumber;
		const wixAmount = wixNumber === undefined ? Number(0) : wixNumber;
		const uberAmount = uberNumber === undefined ? Number(0) : uberNumber;
		const doordashAmount =
			doordashNumber === undefined ? Number(0) : doordashNumber;
		const restoAmount = restoNumber === undefined ? Number(0) : restoNumber;

		let sum =
			tpvAmount +
			argentAmount +
			wixAmount +
			uberAmount +
			doordashAmount +
			restoAmount;
		setTotal(sum);
	};
	const updateTotalTips = () => {
		const tpvAmount = tpvTips === undefined ? Number(0) : tpvTips;
		const wixAmount = wixTips === undefined ? Number(0) : wixTips;
		const uberAmount = uberTips === undefined ? Number(0) : uberTips;
		const doordashAmount =
			doordashTips === undefined ? Number(0) : doordashTips;
		const restoAmount = restoTips === undefined ? Number(0) : restoTips;

		let sum = tpvAmount + wixAmount + uberAmount + doordashAmount + restoAmount;
		setTotalTips(sum);
	};
	const getValue = (e) => {
		let date = e.$d;
		console.log(Date.parse(date));
		console.log(e.$d);
		setDate(e.$d);
	};
	// const disableInput = (e) => {
	// 	switch (e.target.id) {
	// 		case "argent":
	// 			return setArgent(true);
	// 		case "tpv":
	// 			return setTpv(true);
	// 		case "wix":
	// 			return setWixInput(true);
	// 		case "uber":
	// 			return setUberInput(true);
	// 		case "doordash":
	// 			return setDoordashInput(true);
	// 		case "resto":
	// 			return setRestoInput(true);
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// 	// if(e.target.id === "argent")
	// 	// setArgent(true);
	// };
	// const enableInput = (e) => {
	// 	switch (e.target.id) {
	// 		case "argent_modify":
	// 			return setArgent(false);
	// 		case "tpv_modify":
	// 			return setTpv(false);
	// 		case "wix_modify":
	// 			return setWixInput(false);
	// 		case "uber_modify":
	// 			return setUberInput(false);
	// 		case "doordash_modify":
	// 			return setDoordashInput(false);
	// 		case "resto_modify":
	// 			return setRestoInput(false);
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// };
	// const toggleInput = (e) => {
	// 	console.log(e.target.id);
	// 	switch (e.target.id) {
	// 		case "argent":
	// 		case "tpv":
	// 		case "wix":
	// 			console.log("true");
	// 			break;
	// 		default:
	// 			return null;
	// 	}
	// };
	const makeButtonVisible = (e) => {
		switch (e.target.id) {
			case "argent":
				return setArgentButton(false);
			case "tpv":
				return setTpvButton(false);
			case "wix":
				return setWixButton(false);
			case "uber":
				return setUberButton(false);
			case "doordash":
				return setDoordashButton(false);
			case "resto":
				return setRestoButton(false);
			// case 'error':
			//   return <Error text={text} />
			default:
				return null;
		}
		// if(e.target.id === "argent")
		// setArgent(true);
	};
	const makeButtonInvisible = (e) => {
		switch (e.target.id) {
			case "argent_modify":
				return setArgentButton(true);
			case "tpv_modify":
				return setTpvButton(true);
			case "wix_modify":
				return setWixButton(true);
			case "uber_modify":
				return setUberButton(true);
			case "doordash_modify":
				return setDoordashButton(true);
			case "resto_modify":
				return setRestoButton(true);
			// case 'error':
			//   return <Error text={text} />
			default:
				return null;
		}
		// if(e.target.id === "argent")
		// setArgent(true);
	};
	// const removeNumber = (e) => {
	// 	let totalNumber = Number(total);
	// 	console.log(e.target.id);
	// 	switch (e.target.id) {
	// 		case "argent_modify":
	// 			//let removedNumber = Number(argentNumber);
	// 			return setTotal(totalNumber - Number(argentNumber));
	// 		case "tpv_modify":
	// 			//let removedNumber = Number(argentNumber);
	// 			return setTotal(totalNumber - Number(tpvNumber));
	// 		// case 'error':
	// 		//   return <Error text={text} />
	// 		default:
	// 			return null;
	// 	}
	// 	// let totalNumber = Number(total);
	// 	// let removedNumber = Number(argentNumber);
	// 	// let sum = totalNumber - removedNumber;
	// 	// setTotal(sum);
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitted");
		//console.log(tpvNumber, argentNumber);
		const caisse = {
			//date: date,
			ventes: {
				argent: argentNumber,
				tpv: tpvNumber,
				//total: total,
			},
			tips: {
				tpv: tpvTips,
				//total: totalTips,
			},
			totalVentes: total,
			totalTips: totalTips,
		};
		console.log(caisse);
		//fakeDataBase.push(caisse);
		fakeDataBase[date] = caisse;
		//Object.assign(fakeDataBase, { date: caisse });
		console.log(fakeDataBase);
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{/* <DemoContainer components={["DatePicker"]}> */}
				<DatePicker
					sx={{
						left: "50%",
						transform: "translateX(-50%)",
					}}
					onChange={(e) => {
						getValue(e);
					}}
					label="Choisir une date"
				/>
				{/* </DemoContainer> */}
			</LocalizationProvider>
			<div>
				<CustomTitle>ARGENT</CustomTitle>
				<Container
					sx={{
						padding: "1em",
					}}
				>
					<TextField
						//disabled={argent}
						//error
						//{...argent ? disabled : null}
						id="argent"
						label="Argent"
						type="number"
						onChange={(e) => {
							setArgentNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>
					{argentButton ? null : (
						<Button
							id="argent_modify"
							onClick={(e) => {
								setArgentNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier
						</Button>
					)}
				</Container>
			</div>
			<div>
				<Typography>TPV</Typography>
				<Container
					sx={{
						padding: "1em",
					}}
				>
					<TextField
						//error
						//disabled={tpv}
						id="tpv"
						label="TPV / Ventes"
						type="number"
						onChange={(e) => {
							setTpvNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							//setTpvNumber(Number(e.target.value));
							// disableInput(e);
							// makeButtonVisible(e);
						}}
						//defaultValue="Ventes"
						//helperText="Incorrect entry."
					/>
					{tpvButton ? null : (
						<CustomButton
							id="tpv_modify"
							onClick={(e) => {
								//removeNumber(e);
								setTpvNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier ventes
						</CustomButton>
					)}

					<TextField
						//error
						id="tpv_tips"
						label="TPV / Tips"
						type="number"
						//defaultValue="Tips"
						//helperText="Incorrect entry."
						onChange={(e) => {
							setTpvTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
							//setTpvNumber(Number(e.target.value));
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>
				</Container>
			</div>
			<div>
				<Typography>Wix</Typography>
				<Container
					sx={{
						padding: "1em",
					}}
				>
					<TextField
						//error
						//disabled={wixInput}
						id="wix"
						label="Wix / Ventes"
						type="number"
						//defaultValue="Ventes"
						//variant="filled"
						onChange={(e) => {
							setWixNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>
					<TextField
						//error
						id="filled-error-helper-text"
						label="Wix / Tips"
						type="number"
						//defaultValue="Tips"
						//helperText="Incorrect entry."
						//variant="filled"
						onChange={(e) => {
							setWixTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
						}}
					/>
					{wixButton ? null : (
						<CustomButton
							id="wix_modify"
							onClick={(e) => {
								//removeNumber(e);
								setWixNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier
						</CustomButton>
					)}
				</Container>
			</div>
			<div>
				<Typography>Uber</Typography>
				<Container
					sx={{
						padding: "1em",
					}}
				>
					<TextField
						//error
						//disabled={uberInput}
						id="uber"
						label="Uber / Ventes"
						type="number"
						//defaultValue="Hello World"
						//variant="standard"
						onChange={(e) => {
							setUberNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>
					<TextField
						//error
						id="standard-error-helper-text"
						label="Uber / Tips"
						type="number"
						//helperText="Incorrect entry."
						//variant="standard"
						onChange={(e) => {
							setUberTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
						}}
					/>
					{uberButton ? null : (
						<CustomButton
							id="uber_modify"
							onClick={(e) => {
								setUberNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier
						</CustomButton>
					)}
				</Container>
			</div>
			<div>
				<Typography>Doordash</Typography>
				<Container
					sx={{
						padding: "1em",
					}}
				>
					{/* <div> */}
					<TextField
						//error
						//disabled={doordashInput}
						id="doordash"
						label="Doordash / Ventes"
						type="number"
						onChange={(e) => {
							setDoordashNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>
					{doordashButton ? null : (
						<CustomButton
							id="doordash_modify"
							onClick={(e) => {
								setDoordashNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier
						</CustomButton>
					)}
					{/* </div> */}
					<TextField
						//error
						id="standard-error-helper-text"
						label="Doordash / Tips"
						type="number"
						onChange={(e) => {
							setDoordashTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
						}}
					/>
				</Container>
			</div>
			<div>
				<Typography>Resto Loco</Typography>
				{/* <div> */}
				<Container
					sx={{
						padding: "1em",
					}}
				>
					<TextField
						//error
						//disabled={restoInput}
						id="resto"
						label="Resto Loco / Ventes"
						type="number"
						onChange={(e) => {
							setRestoNumber(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotal();
							// disableInput(e);
							// makeButtonVisible(e);
						}}
					/>

					{restoButton ? null : (
						<CustomButton
							// <CustomButton
							id="resto_modify"
							onClick={(e) => {
								setRestoNumber(Number(e.target.value));
								//enableInput(e);
								makeButtonInvisible(e);
							}}
						>
							Modifier
						</CustomButton>
					)}
					{/* </div> */}
					<TextField
						//error
						id="standard-error-helper-text"
						label="Resto Loco / Tips"
						type="number"
						onChange={(e) => {
							setRestoTips(Number(e.target.value));
						}}
						onBlur={(e) => {
							updateTotalTips();
						}}
					/>
				</Container>
			</div>
			{/* <div> */}
			<Container
				sx={{
					position: "fixed",
					right: "10%",
					top: "50%",
					width: "fit-content",
				}}
			>
				<Typography
					sx={{
						fontSize: "2em",
					}}
				>
					Total ventes: {total}$
				</Typography>
				<Typography
					sx={{
						fontSize: "2em",
					}}
				>
					Total tips: {totalTips}$
				</Typography>
			</Container>
			{/* </div> */}
			<Button type="submit">Envoyer</Button>
		</Box>
	);
}

export default CaisseForm;
