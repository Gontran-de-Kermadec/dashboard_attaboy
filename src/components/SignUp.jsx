import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
	doc,
	setDoc,
	addDoc,
	Timestamp,
	getDoc,
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";

const CustomInputContainer = styled(Container)`
	padding: 1em;
	text-align: center;
`;

function SignUp() {
	const [email, setEmail] = useState();
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [passwordConfirmation, setPasswordConfirmation] = useState();
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	//const [disabled, setDisabled] = useState(false);

	const checkPasswords = () => {
		if (password === passwordConfirmation) {
			console.log("true");
			setError(false);
			setErrorMessage("");
			//setDisabled(false);
		} else {
			console.log("false");
			setError(true);
			setErrorMessage("Mot de passe identique nécessaire !");
			//setDisabled(true);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === passwordConfirmation) {
			console.log(email, password, passwordConfirmation);
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					const userDoc = await addDoc(collection(db, `users`), {
						userId: user.uid,
						userName: userName,
						email: email,
						role: "",
					});
					console.log("Document written with ID: " + userDoc.id);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorCode, errorMessage);
					// ..
				});
		} else {
			console.log("rien");
		}
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
						id="username"
						label="Nom"
						type="text"
						variant="standard"
						onChange={(e) => {
							setUserName(e.target.value);
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
				<CustomInputContainer>
					<TextField
						error={error}
						id="password_confirmation"
						label="Confirmer mot de passe"
						type="password"
						variant="standard"
						//defaultValue="Tips"
						helperText={errorMessage}
						onChange={(e) => {
							setPasswordConfirmation(e.target.value);
							//checkPasswords();
						}}
						onBlur={(e) => {
							checkPasswords();
						}}
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
					//disabled={disabled}
				>
					S'inscrire
				</Button>
			</Box>
		</>
	);
}

export default SignUp;
