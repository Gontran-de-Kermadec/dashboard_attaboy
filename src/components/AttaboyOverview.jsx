import { Box, Typography, Divider } from "@mui/material";
import styled from "@emotion/styled";
// import {
// 	collection,
// 	query,
// 	where,
// 	getDocs,
// 	onSnapshot,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import {
	displayScoreColor,
	ratioComparedToRevenue,
	getLastDayRevenue,
} from "../data/generalFonctions";
import { HomeBarRevenue } from "./charts/BarChart";
import { PeriodContext, RestaurantContext, ThemeContext } from "../App";

function AttaboyOverview(props) {
	const [activeRestaurant] = useContext(RestaurantContext);
	const {
		totalAttaboyRevenue,
		totalAttaboyExpenses,
		attaboySalary,
		attaboyOrders,
		attaboyOthers,
	} = props;
	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.2em",
	}));
	const [lastDailyRevenue, setLastDailyRevenue] = useState();
	const dataLabel = ["revenus", "depenses"];
	const attaboyBackgroundColor = ["#FFD702", "#FFEA70"];
	const attaboyDataNumbers = [totalAttaboyRevenue, totalAttaboyExpenses];
	useEffect(() => {
		const date = new Date();
		const currentYear = new Date().getFullYear();
		const previousDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - 1
		);
		getLastDayRevenue(
			activeRestaurant,
			currentYear,
			previousDay,
			setLastDailyRevenue
		);
	}, [activeRestaurant]);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					flexWrap: "wrap",
					textAlign: "center",
					margin: "2em 0",
				}}
			>
				<Box>
					<Box
						sx={{
							fontSize: "1.5em",
						}}
					>
						<StyledTypo>Chiffre d'affaires</StyledTypo>
						<StyledTypo
							sx={{
								fontWeight: "bold",
								fontStyle: "oblique",
								"&.MuiTypography-root": {
									color: "#e0bf00",
								},
							}}
						>
							$ {totalAttaboyRevenue}
						</StyledTypo>
					</Box>
					<Box
						sx={{
							fontSize: "1.5em",
						}}
					>
						<StyledTypo>Dépenses</StyledTypo>
						<StyledTypo
							sx={{
								fontWeight: "bold",
								fontStyle: "oblique",
								"&.MuiTypography-root": {
									color: "#e0bf00",
								},
							}}
						>
							$ {totalAttaboyExpenses}
						</StyledTypo>
					</Box>
				</Box>
				<Box>
					<HomeBarRevenue
						dataLabel={dataLabel}
						dataNumbers={attaboyDataNumbers}
						backgroundColor={attaboyBackgroundColor}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					margin: "2em 0",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.2em",
						//margin: "1em 0;",
					}}
				>
					Chiffre d'affaires hier:{" "}
					<Typography
						variant="span"
						sx={{
							color: "#e0bf00",
							fontStyle: "oblique",
							fontWeight: "bold",
						}}
					>
						{lastDailyRevenue === 0
							? "Caisse pas faite"
							: "$" + lastDailyRevenue}
					</Typography>
				</Typography>
			</Box>
			<Divider />
			<Box
				sx={{
					width: "fit-content",
					margin: "1em auto",
				}}
			>
				<Box
					sx={{
						fontSize: "1.2em",
					}}
				>
					<StyledTypo>
						Masse salariale:{" "}
						<Typography
							variant="span"
							sx={{
								color: "#e0bf00",
							}}
						>
							${attaboySalary}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalAttaboyRevenue, attaboySalary)
								),
							}}
						>
							{ratioComparedToRevenue(totalAttaboyRevenue, attaboySalary)}%
						</StyledTypo>{" "}
						du CA
					</StyledTypo>
				</Box>
				<Box
					sx={{
						fontSize: "1.2em",
					}}
				>
					<StyledTypo>
						Commandes:{" "}
						<Typography
							variant="span"
							sx={{
								color: "#e0bf00",
							}}
						>
							${attaboyOrders}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalAttaboyRevenue, attaboyOrders)
								),
							}}
						>
							{ratioComparedToRevenue(totalAttaboyRevenue, attaboyOrders)}%
						</StyledTypo>{" "}
						du CA
					</StyledTypo>
				</Box>
				<Box
					sx={{
						fontSize: "1.2em",
					}}
				>
					<StyledTypo>
						Autres frais:{" "}
						<Typography
							variant="span"
							sx={{
								color: "#e0bf00",
							}}
						>
							${attaboyOthers}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalAttaboyRevenue, attaboyOthers)
								),
							}}
						>
							{ratioComparedToRevenue(totalAttaboyRevenue, attaboyOthers)}%
						</StyledTypo>{" "}
						du CA
					</StyledTypo>

					{/* <StyledTypo>
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalAttaboyRevenue, attaboyOthers)
								),
							}}
						>
							{ratioComparedToRevenue(totalAttaboyRevenue, attaboyOthers)}%
						</StyledTypo>{" "}
						du CA
					</StyledTypo> */}
				</Box>
			</Box>
			<Divider />
			<Box>
				<Typography
					sx={{
						fontSize: "1.2em",
						textAlign: "center",
						margin: "2em",
					}}
				>
					Section ticket moyen en cours de construction
				</Typography>
			</Box>
		</>
	);
}

export default AttaboyOverview;
