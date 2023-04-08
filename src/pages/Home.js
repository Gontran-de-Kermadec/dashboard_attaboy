import {
	Container,
	Paper,
	// Button,
	// ButtonGroup,
	Tab,
	Tabs,
	// ToggleButton,
	// ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import "../Home.css";
import styled from "@emotion/styled";
import MovingIcon from "@mui/icons-material/Moving";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";
import { BarChart, BarComparison } from "../components/charts/BarChart";
import { caNumbers, orderNumbers, avgTicketNumbers } from "../data/sample";
const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	width: "30%",
}));

function Home() {
	const [activePeriod, setActivePeriod] = useState("annee");
	const [revenue, setRevenue] = useState(null);
	const [order, setOrder] = useState(null);
	const [avgTicket, setAvgTicket] = useState(null);
	const handleChange = (e, newPeriod) => {
		setActivePeriod(newPeriod);
	};
	const displayRevenue = () => {
		if (activePeriod === "annee") {
			return caNumbers.year;
		} else if (activePeriod === "mois") {
			return caNumbers.month;
		} else {
			return caNumbers.week;
		}
	};
	useEffect(() => {
		const displayData = () => {
			if (activePeriod === "annee") {
				setRevenue(caNumbers.year);
				setOrder(orderNumbers.year);
				setAvgTicket(avgTicketNumbers.year);
			} else if (activePeriod === "mois") {
				setRevenue(caNumbers.month);
				setOrder(orderNumbers.month);
				setAvgTicket(avgTicketNumbers.month);
			} else {
				setRevenue(caNumbers.week);
				setOrder(orderNumbers.week);
				setAvgTicket(avgTicketNumbers.week);
			}
		};
		displayData();

		//   return () => {
		// 	second
		//   }
	}, [activePeriod]);

	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<div>
					{/* <Box>
				<ToggleButtonGroup
					color="primary"
					value={activePeriod}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					>
					<ToggleButton value="année">Année</ToggleButton>
					<ToggleButton value="mois">Mois</ToggleButton>
					<ToggleButton value="semaine">Semaine</ToggleButton>
					</ToggleButtonGroup>
				</Box> */}
					<Box>
						<Tabs
							value={activePeriod}
							onChange={handleChange}
							aria-label="tableau de periodes"
						>
							<Tab value="annee" label="Année" />
							<Tab value="mois" label="Mois" />
							<Tab value="semaine" label="Semaine" />
						</Tabs>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							// m-y: 5,
							marginTop: 10,
							//width: "100%",
						}}
					>
						{/* <Paper elevation={1}>
							<p>Chiffres d'affaires hors taxes</p>
							<p>25689</p>
						</Paper>
						<Paper elevation={1}>
							<p>Nombres de tickets</p>
							<p>123</p>
						</Paper> */}
						{/* <Paper elevation={1}>
							<p>Ticket moyen</p>
							<p>29,6$</p>
						</Paper> */}
						<Item elevation={1}>
							<p>Chiffres d'affaires hors taxes</p>
							<div>
								{/* <p>$ {displayRevenue()}</p> */}
								<p>$ {revenue}</p>
								{/* <p>$ {caNumbers.year}</p> */}
								{/* <Box
									sx={{
										display: "flex",
										//justifyContent: "space-evenly",
									}}
								>
									<MovingIcon />
									<p>+25%</p>
								</Box> */}
							</div>
						</Item>
						<Item elevation={1}>
							<p>Nombres de tickets</p>
							<p>{order}</p>
						</Item>
						<Item elevation={1}>
							<p>Ticket moyen</p>
							<p>{avgTicket}</p>
						</Item>
					</Box>
				</div>
				<Box
					sx={{
						display: "flex",
						width: "40%",
						paddingTop: 2,
					}}
				>
					{/* <p>Source CA</p> */}
					<PieChart />
					{activePeriod === "semaine" ? <LineChart /> : null}
					{activePeriod === "annee" ? <BarComparison /> : null}
					{/* <LineChart /> */}
					{/* <BarChart /> */}
					{/* <BarComparison /> */}
				</Box>
			</Container>
		</div>
	);
}

export default Home;
