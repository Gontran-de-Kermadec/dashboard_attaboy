import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserContext } from "../App";

const CustomTitle = styled(Typography)`
	font-size: 1.2em;
`;
const CustomInputContainer = styled(Container)`
	padding: 1em;
	text-align: center;
`;

function Login() {
	const [setUserLoggedIn] = useContext(UserContext);
	const [email, setEmail] = useState();
	//const [userName, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				setUserLoggedIn(true);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
	return (
		<>
			<Box
				component="form"
				sx={{
					padding: "1em",
					"& .MuiTextField-root": { m: 1, width: "25ch" },
				}}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<CustomInputContainer>
					<TextField
						//error
						//disabled={tpv}
						id="email"
						label="Email"
						type="email"
						variant="standard"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						// onBlur={(e) => {
						// 	updateTotal();
						// }}
						//defaultValue="Ventes"
						//helperText="Incorrect entry."
					/>
				</CustomInputContainer>
				<CustomInputContainer>
					<TextField
						//error
						id="password"
						label="Mot de passe"
						type="password"
						variant="standard"
						//defaultValue="Tips"
						//helperText="Incorrect entry."
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						// onBlur={(e) => {
						// 	updateTotalTips();
						// }}
					/>
				</CustomInputContainer>

				<Button
					sx={{
						left: "50%",
						transform: "translateX(-50%)",
						fontSize: "1.2em",
						boxShadow: 1,
						margin: "2em auto",
						// background: colorTheme,
						// color: "#fff",
						// "&:hover": {
						// 	color: colorTheme,
						// },
					}}
					type="submit"
				>
					Se Connecter
				</Button>
			</Box>
		</>
	);
}

export default Login;
