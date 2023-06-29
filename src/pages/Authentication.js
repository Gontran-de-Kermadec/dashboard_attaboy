import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const CustomTitle = styled(Typography)`
	font-size: 1.2em;
`;
const CustomInputContainer = styled(Container)`
	padding: 1em;
	text-align: center;
`;
const StyledTab = styled(Tab)({
	"&.Mui-selected": {
		color: "blue",
	},
});

function Authentication() {
	const [isLogin, setIsLogin] = useState(true);
	const [authenticationStatus, setAuthenticationStatus] = useState("Login");
	const handleSubmit = () => {
		console.log("submit");
	};
	const handleChange = (e, tabValue) => {
		setAuthenticationStatus(tabValue);
	};
	return (
		<>
			<Tabs
				//value={activePeriod}
				value={authenticationStatus}
				onChange={handleChange}
				aria-label="tableau de periodes"
				TabIndicatorProps={{
					style: {
						backgroundColor: `red`,
					},
				}}
				sx={{
					width: "fit-content",
					margin: "8em auto 4em auto",
				}}
			>
				<StyledTab value="Login" label="Connexion" />
				<StyledTab value="Signup" label="Inscription" />
			</Tabs>

			{authenticationStatus === "Login" ? <Login /> : <SignUp />}
		</>
	);
}

export default Authentication;
