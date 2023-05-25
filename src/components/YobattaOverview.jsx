import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import styled from "@emotion/styled";

import {
	displayScoreColor,
	ratioComparedToRevenue,
	getLastDayRevenue,
} from "../data/generalFonctions";
import { HomeBarRevenue } from "./charts/BarChart";
import { RestaurantContext, ThemeContext } from "../App";

function YobattaOverview(props) {
	const {
		totalYobattaRevenue,
		totalYobattaExpenses,
		yobattaSalary,
		yobattaOrders,
		yobattaOthers,
	} = props;
	const [activeRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	const [lastDailyRevenue, setLastDailyRevenue] = useState();
	const yobattaDataNumbers = [totalYobattaRevenue, totalYobattaExpenses];
	const yobattaBackgroundColor = ["#D55D8D", "#922651"];
	const dataLabel = ["revenus", "depenses"];
	const StyledTypo = styled(Typography)(({ theme }) => ({
		fontSize: "1.2em",
	}));

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
									color: colorTheme,
								},
							}}
						>
							$ {totalYobattaRevenue}
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
									color: colorTheme,
								},
							}}
						>
							$ {totalYobattaExpenses}
						</StyledTypo>
					</Box>
				</Box>
				<Box>
					<HomeBarRevenue
						dataLabel={dataLabel}
						dataNumbers={yobattaDataNumbers}
						backgroundColor={yobattaBackgroundColor}
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
							fontStyle: "oblique",
							fontWeight: "bold",
							color: colorTheme,
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
								color: colorTheme,
							}}
						>
							${yobattaSalary}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalYobattaRevenue, yobattaSalary)
								),
							}}
						>
							{ratioComparedToRevenue(totalYobattaRevenue, yobattaSalary)}%
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
								color: colorTheme,
							}}
						>
							${yobattaOrders}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalYobattaRevenue, yobattaOrders)
								),
							}}
						>
							{ratioComparedToRevenue(totalYobattaRevenue, yobattaOrders)}%
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
								color: colorTheme,
							}}
						>
							${yobattaOthers}
						</Typography>{" "}
						-{" "}
						<StyledTypo
							variant="span"
							sx={{
								color: displayScoreColor(
									ratioComparedToRevenue(totalYobattaRevenue, yobattaOthers)
								),
							}}
						>
							{ratioComparedToRevenue(totalYobattaRevenue, yobattaOthers)}%
						</StyledTypo>{" "}
						du CA
					</StyledTypo>
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

export default YobattaOverview;
