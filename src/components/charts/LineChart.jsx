import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { weeklyCA } from "../../data/sample";

function LineChart() {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);
	let labelWeek = [];
	let revenueWeek = [];
	weeklyCA.map((x) => {
		labelWeek = [...labelWeek, x.week];
		revenueWeek = [...revenueWeek, x.revenue];
		console.log(labelWeek);
		return "";
	});
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	];

	const data = {
		labels: labelWeek,
		datasets: [
			{
				label: "Chiffres hebdomadaire",
				data: revenueWeek,
				// data: ["10", "20", "30", "40"],
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			// {
			// 	label: "Dataset 2",
			// 	data: ["15", "20", "50"],
			// 	borderColor: "rgb(53, 162, 235)",
			// 	backgroundColor: "rgba(53, 162, 235, 0.5)",
			// },
		],
	};
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Chart.js Line Chart",
			},
		},
	};
	return <Line data={data} options={options} />;
}

export default LineChart;
