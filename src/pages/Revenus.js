import React, { useContext } from "react";
import { RestaurantContext } from "../App";
import Sidebar from "../components/Sidebar";
import //collection,
//query,
//where,
//getDocs,
//onSnapshot,
"firebase/firestore";
//import { db } from "../firebaseConfig";
import { Container, Divider } from "@mui/material";
import Period from "../components/Period";
// import { ficelle, attaboy, yobatta } from "../data/sample";
// import { BarRevenue } from "../components/charts/BarChart";
// import PieChart from "../components/charts/PieChart";
// import LineChart from "../components/charts/LineChart";
import AttaboyRevenue from "../components/AttaboyRevenue";
import FicelleRevenue from "../components/FicelleRevenue";
import YobattaRevenue from "../components/YobattaRevenue";

// import { getData, annualCA as caAnnuel, getAnnualCA } from "../data/getData";

function Revenus() {
	// react context variable
	//const [activePeriod] = useContext(PeriodContext);
	const [activeRestaurant] = useContext(RestaurantContext);
	// const [colorTheme] = useContext(ThemeContext);
	// const [data, setData] = useState([]);

	// revenue sources
	// const [annualCA, setannualCA] = useState(0);
	// const [revenue, setRevenue] = useState(0);
	// const [uberRevenue, setUberRevenue] = useState(0);
	// const [tpvRevenue, setTpvRevenue] = useState(0);
	// const [argentRevenue, setArgentRevenue] = useState(0);
	// const [wixRevenue, setWixRevenue] = useState(0);
	// const [doordashRevenue, setDoordashRevenue] = useState(0);
	// const [restoLocoRevenue, setRestoLocoRevenue] = useState(0);

	// const Item = styled(Paper)(({ theme }) => ({
	// 	textAlign: "center",
	// 	width: "25%",
	// 	margin: "0.5em",
	// 	padding: "0.5em",
	// 	background: colorTheme,
	// }));
	// const StyledTypo = styled(Typography)(({ theme }) => ({
	// 	fontSize: "1.2em",
	// 	margin: "0.3em",
	// 	color: activeRestaurant === "ficelle" ? "#fff" : "#000",
	// }));
	//firestore fetching

	//useEffect(() => {
	//let startDate;
	// const date = new Date();
	// const currentYear = new Date().getFullYear();
	// const todayDate = new Date(
	// 	date.getFullYear(),
	// 	date.getMonth(),
	// 	date.getDate()
	// );
	// if (activePeriod === "annee") {
	// 	startDate = new Date(currentYear, 0, 1);
	// } else if (activePeriod === "mois") {
	// 	startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	// } else if (activePeriod === "semaine") {
	// 	startDate = new Date(date.setDate(date.getDate() - date.getDay())); //first day of current week
	// 	console.log(startDate);
	// 	const midnightDate = new Date(startDate.setHours(0, 0, 0, 0));
	// 	console.log(midnightDate);
	// 	todayDate === startDate
	// 		? (startDate = todayDate)
	// 		: (startDate = midnightDate);
	// }
	// console.log(startDate, todayDate);
	// console.log(activeRestaurant);
	// const q = query(
	// 	//collection(db, `ventes/attaboy/${currentYear}`),
	// 	collection(db, `ventes/${activeRestaurant}/${currentYear}`),
	// 	where("timestamp", ">=", startDate),
	// 	where("timestamp", "<=", todayDate)
	// );
	// console.log(q);
	// let total = 0;
	// let uberTotal = 0;
	// let tpvTotal = 0;
	// let argentTotal = 0;
	// let doordashTotal = 0;
	// let restoLocoTotal = 0;
	//	let wixTotal = 0;
	//	onSnapshot(q, (querySnapshot) => {
	//	querySnapshot.forEach((doc) => {
	// console.log(doc.data().argent);
	// total += doc.data().total;
	// uberTotal += doc.data().uber;
	// tpvTotal += doc.data().tpv;
	// argentTotal += doc.data().argent;
	// doordashTotal += doc.data().doordash;
	// wixTotal += doc.data().wix;
	// restoLocoTotal += doc.data().restoloco;
	//setannualCA(Math.round(total));
	//attaboyData(doc.data());
	//});
	// setUberRevenue(Math.round(uberTotal));
	// setTpvRevenue(Math.round(tpvTotal));
	// setArgentRevenue(Math.round(argentTotal));
	// setDoordashRevenue(Math.round(doordashTotal));
	// setWixRevenue(Math.round(wixTotal));
	// setRestoLocoRevenue(Math.round(restoLocoTotal));
	// setRevenue(Math.round(total));
	//	});
	//	}, [activePeriod, activeRestaurant]);
	// let total = 0;
	// let uberTotal = 0;
	// let tpvTotal = 0;
	// let argentTotal = 0;
	// let doordashTotal = 0;
	// let restoLocoTotal = 0;
	// let wixTotal = 0;
	// const attaboyData = (document) => {
	// 	console.log(document.argent);
	// 	total += document.total;
	// 	uberTotal += document.uber;
	// 	tpvTotal += document.tpv;
	// 	argentTotal += document.argent;
	// 	doordashTotal += document.doordash;
	// 	wixTotal += document.wix;
	// 	restoLocoTotal += document.restoloco;
	// 	setannualCA(Math.round(total));
	// 	setRevenue(Math.round(total));
	// 	setUberRevenue(Math.round(uberTotal));
	// 	setTpvRevenue(Math.round(tpvTotal));
	// 	setArgentRevenue(Math.round(argentTotal));
	// 	setDoordashRevenue(Math.round(doordashTotal));
	// 	setWixRevenue(Math.round(wixTotal));
	// 	setRestoLocoRevenue(Math.round(restoLocoTotal));
	// };

	return (
		<div className="flex">
			<Sidebar />
			<Container>
				<Period />

				{activeRestaurant === "attaboy" ? <AttaboyRevenue /> : null}
				{activeRestaurant === "ficelle" ? <FicelleRevenue /> : null}
				{activeRestaurant === "yobatta" ? <YobattaRevenue /> : null}

				<Divider />
			</Container>
		</div>
	);
}

export default Revenus;
