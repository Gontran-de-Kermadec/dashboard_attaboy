import React, { useContext } from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownIcon";
import {
	Divider,
	Typography,
	Button,
	Menu,
	MenuItem,
	Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import { RestaurantContext, ThemeContext } from "../App";
// import { useNavigate, Link } from "react-router-dom";

function Sidebar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	console.log(open);
	// const [store, setStore] = useState("Attaboy");
	const [activeRestaurant, setActiveRestaurant] = useContext(RestaurantContext);
	const [colorTheme] = useContext(ThemeContext);
	const selectStore = (e) => {
		setActiveRestaurant(e.currentTarget.innerText.toLowerCase());
	};
	const handleClick = (e) => {
		console.log(e.currentTarget);
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// const menuItems = ["Caisse", "Revenus", "Dépenses"];
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
	return (
		<>
			<Drawer
				sx={{
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
							backgroundColor: colorTheme,
							fontSize: "1.2em",
							borderRadius: "inherit",
							"&:hover": {
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
							SOGUARES
						</MenuItem>
						<Divider />
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
				<List>
					{menu.map((item, index) => (
						<div key={index}>
							{item.section ? (
								<>
									<Typography
										sx={{
											fontSize: "1.2em",
										}}
									>
										{item.title}
									</Typography>
									{item.section.map((item, index) => (
										<ListItemButton key={index}>
											<Link
												to={`/${item}`}
												style={{
													textDecoration: "none",
													color: "#000",
												}}
											>
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
										<Link
											to={item.path}
											style={{
												textDecoration: "none",
												color: "#000",
											}}
										>
											<ListItem>
												<ListItemText primary={item.title} />
											</ListItem>
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
