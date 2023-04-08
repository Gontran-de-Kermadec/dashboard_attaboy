import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function PieChart() {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const chartOptions = {
		cutout: "80%",
		plugins: {
			legend: {
				position: "bottom",
			},
			title: {
				display: true,
				text: "Source CA",
			},
		},
	};
	const data = {
		labels: ["Mev", "Uber", "Doordash", "Resto Loco"],
		datasets: [
			{
				label: "CA",
				data: [1200, 1900, 200, 300],
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					// "rgba(153, 102, 255, 0.2)",
					// "rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					// "rgba(153, 102, 255, 1)",
					// "rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
				hoverOffset: 5,
			},
		],
	};
	return <Doughnut data={data} options={chartOptions} />;
	// return <Doughnut data={data} options={{ cutout: "80%" }} />;
}

export default PieChart;
