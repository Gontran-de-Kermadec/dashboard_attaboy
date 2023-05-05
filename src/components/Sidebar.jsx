import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownIcon";
import {
	Divider,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Menu,
	MenuItem,
	Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { KeyboardArrowDown } from "@mui/icons-material";
import { RestaurantContext, ThemeContext } from "../App";
// import { useNavigate, Link } from "react-router-dom";

function Sidebar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	console.log(open);
	// const [store, setStore] = useState("Attaboy");
	const [activeRestaurant, setActiveRestaurant] = useContext(RestaurantContext);
	//const [color, setColor] = useState();
	const [colorTheme] = useContext(ThemeContext);
	const selectStore = (e) => {
		//setStore(e.currentTarget.innerText);
		setActiveRestaurant(e.currentTarget.innerText.toLowerCase());
	};
	const handleClick = (e) => {
		console.log(e.currentTarget);
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// useEffect(() => {
	// 	const changeTheme = () => {
	// 		// switch (activeRestaurant) {
	// 		// 	case "attaboy":
	// 		// 		setColor("#FFD702");
	// 		// 		break;
	// 		// 	case "ficelle":
	// 		// 		setColor("#3C6843");
	// 		// 		break;
	// 		// 	case "yobatta":
	// 		// 		setColor("#D55D8D");
	// 		// 		break;
	// 		// 	default:
	// 		// 		console.log("not working");
	// 		// 		break;
	// 		// }
	// 		switch (activeRestaurant) {
	// 			case "attaboy":
	// 				//setColor("#FFD702");
	// 				setColorTheme("#FFD702");
	// 				break;
	// 			case "ficelle":
	// 				//setColor("#3C6843");
	// 				setColorTheme("#3C6843");
	// 				break;
	// 			case "yobatta":
	// 				//setColor("#D55D8D");
	// 				setColorTheme("#D55D8D");
	// 				break;
	// 			default:
	// 				console.log("not working");
	// 				break;
	// 		}
	// 	};
	// 	changeTheme();
	// }, [activeRestaurant, setColorTheme]);
	//console.log(color);
	const menuItems = ["Caisse", "Revenus", "Dépenses"];
	const menu = [
		{
			title: "Vue d'ensemble",
			path: "/",
		},
		{
			title: "Finances",
			section: ["Caisse", "Revenus", "Depenses"],
		},
		{
			title: "Personnel",
			section: ["Employes", "Planning", "Salaires"],
		},
	];
	// const navigate = useNavigate();
	return (
		<>
			<Drawer
				sx={{
					// "& .MuiDrawerer-root": {
					// 	width: 500,
					// 	backgroundColor: "red",
					// 	position: "initial",
					// },
					"& .MuiPaper-root": {
						width: 200,
						position: "initial",
					},
				}}
				variant="persistent"
				anchor="left"
				open
			>
				<Box>
					<Button
						sx={{
							width: "100%",
							color: "white",
							// backgroundColor: color,
							backgroundColor: colorTheme,
							fontSize: "1.2em",
							borderRadius: "inherit",
							"&:hover": {
								// backgroundColor: color,
								backgroundColor: colorTheme,
							},
						}}
						id="store-button"
						aria-controls={open ? "store-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? true : undefined}
						onClick={handleClick}
						endIcon={<KeyboardArrowDown />}
					>
						{activeRestaurant}
					</Button>
					<Menu
						sx={{
							"& .MuiPaper-root": {
								width: 160,
								color: colorTheme,
							},
						}}
						id="store-menu"
						// aria-controls="store-menu"
						// aria-haspopup="true"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						<MenuItem
							onClick={(e) => {
								selectStore(e);
								handleClose();
							}}
						>
							ATTABOY
						</MenuItem>
						<Divider />
						<MenuItem
							onClick={(e) => {
								selectStore(e);
								handleClose();
							}}
						>
							FICELLE
						</MenuItem>
						<Divider />
						<MenuItem
							onClick={(e) => {
								selectStore(e);
								handleClose();
							}}
						>
							YOBATTA
						</MenuItem>
					</Menu>
				</Box>
				{/* <List>
					<ListItemButton>
						<Link to="/">
							<ListItem>
								<ListItemText primary="Dashboard" />
							</ListItem>
						</Link>
					</ListItemButton>
				</List> */}

				{/* <div>
					<Typography variant="h6">Finances</Typography>
				</div> */}
				{/* <List>
					{menuItems.map((item, index) => (
						<ListItemButton key={index}>
							<Link to={item}>
								<ListItem>
									<ListItemText primary={item} />
								</ListItem>
							</Link>
						</ListItemButton>
					))}
				</List>
			
				<Divider /> */}
				{/* <Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>Finances</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							{["Revenu", "Depenses"].map((item, index) => (
								// <ListItemButton onClick={() => navigate(`/${item}`)}>
								<ListItemButton key={index}>
									<Link to={item}>
										<ListItem>
											<ListItemText primary={item} />
										</ListItem>
									</Link>
								</ListItemButton>
							))}
						</List>
					</AccordionDetails>
				</Accordion> */}
				<List>
					{menu.map((item, index) => (
						// <ListItemButton onClick={() => navigate(`/${item}`)}>
						<div key={index}>
							{/* <Typography>{item.title}</Typography> */}
							{/* <ListItemButton>
								<Link to={item.section}>
									<ListItem>
										<ListItemText primary={item.section} />
									</ListItem>
								</Link>
							</ListItemButton> */}
							{item.section ? (
								<>
									{/* <Accordion>
										<AccordionSummary expandIcon={<ExpandMoreIcon />}>
											<Typography>{item.title}</Typography>
										</AccordionSummary>
										<AccordionDetails>
											{item.section.map((item, index) => (
												<ListItemButton key={index}>
													<Link to={`/${item}`}>
														<ListItem>
															<ListItemText primary={item} />
														</ListItem>
													</Link>
												</ListItemButton>
											))}
										</AccordionDetails>
									</Accordion> */}
									<Typography>{item.title}</Typography>
									{item.section.map((item, index) => (
										<ListItemButton key={index}>
											<Link to={`/${item}`}>
												<ListItem>
													<ListItemText primary={item} />
												</ListItem>
											</Link>
										</ListItemButton>
									))}
									<Divider />
								</>
							) : (
								<>
									<ListItemButton>
										{/* <Link to={`/${item.title}`}> */}
										<Link to={item.path}>
											{/* <ListItem>
												<ListItemText primary={item.title} />
											</ListItem> */}
											{/* {item.title} */}
											<Typography>{item.title}</Typography>
										</Link>
									</ListItemButton>
									<Divider />
								</>
							)}
						</div>
					))}
				</List>
			</Drawer>
		</>
	);
}

export default Sidebar;
