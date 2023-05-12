import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { yearlyCA } from "../../data/sample";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
ChartJS.defaults.color = "#000";
const labels = ["2022", "2023", "2024", "2025", "2026"];
const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
			display: false,
		},
		title: {
			display: true,
			text: "Revenus/Depenses",
		},
	},
};
const yobattaOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
			display: false,
		},
		title: {
			display: true,
			text: "Sources de revenus",
		},
	},
};

function BarComparison() {
	let labelYear = [];
	let revenueYear = [];
	let expenseYear = [];
	yearlyCA.map((x) => {
		labelYear = [...labelYear, x.year];
		revenueYear = [...revenueYear, x.revenue];
		expenseYear = [...expenseYear, x.expense];
		console.log(labelYear);
		return "";
	});
	const data = {
		labels: labelYear,
		datasets: [
			{
				label: "Revenus",
				data: revenueYear,
				// data: ["1000", "200"],
				// backgroundColor: "rgba(255, 99, 132, 0.5)",
				backgroundColor: "rgba(255, 231, 92, 0.5)",
			},
			{
				label: "Depenses",
				data: expenseYear,
				// data: ["700", "300"],
				backgroundColor: "rgba(135, 206, 250, 0.5)",
			},
		],
	};
	return <Bar data={data} options={options} />;
}
function BarRevenue(props) {
	const { dataLabel, dataNumbers } = props;
	console.log(dataNumbers);
	//const labels = ["Argent", "TPV", "Uber", "Wix", "Doordash"];
	const data = {
		labels: dataLabel,
		datasets: [
			{
				label: "Revenus/Depenses",
				// data: ["1000", "200", "5000", "3500", "700"],
				data: dataNumbers,
				backgroundColor: ["rgb(255, 240, 153)", "rgb(255, 215, 2)"],
				// backgroundColor: "rgb(255, 231, 92)",
			},
		],
	};
	return <Bar data={data} width={400} height={200} options={options} />;
}
function HomeBarRevenue(props) {
	const { dataLabel, dataNumbers, backgroundColor } = props;
	console.log(dataNumbers);
	const data = {
		labels: dataLabel,
		datasets: [
			{
				label: "Revenus/Depenses",
				data: dataNumbers,
				backgroundColor: backgroundColor,
			},
		],
	};
	return <Bar data={data} width={400} height={200} options={options} />;
}
function YobattaBarRevenue(props) {
	const { dataLabel, dataNumbers, backgroundColor } = props;
	console.log(dataNumbers);
	const data = {
		labels: dataLabel,
		datasets: [
			{
				label: "$",
				data: dataNumbers,
				backgroundColor: backgroundColor,
			},
		],
	};
	return <Bar data={data} width={400} height={200} options={yobattaOptions} />;
}
function FicelleBarRevenue(props) {
	const { dataLabel, dataNumbers, backgroundColor } = props;
	console.log(dataNumbers);
	const data = {
		labels: dataLabel,
		datasets: [
			{
				label: "$",
				data: dataNumbers,
				backgroundColor: backgroundColor,
			},
		],
	};
	return <Bar data={data} width={400} height={200} options={yobattaOptions} />;
}

function BarChart() {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);
	//const labels = ["2022", "2023", "2024", "2025", "2026"];
	const data = {
		labels,
		datasets: [
			{
				label: "CA annuel",
				data: ["1000", "200"],
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};
	// const options = {
	// 	responsive: true,
	// 	plugins: {
	// 		legend: {
	// 			position: "top",
	// 		},
	// 		// title: {
	// 		// 	display: true,
	// 		// 	text: "CA annuel",
	// 		// },
	// 	},
	// };
	return <Bar data={data} options={options} />;
}

//export default BarChart;
export {
	BarChart,
	BarComparison,
	BarRevenue,
	HomeBarRevenue,
	YobattaBarRevenue,
	FicelleBarRevenue,
};
