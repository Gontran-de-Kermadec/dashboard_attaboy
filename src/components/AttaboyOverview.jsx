import React from "react";

function AttaboyOverview(props) {
	const {
		totalAttaboyRevenue,
		totalAttaboyExpenses,
		attaboySalary,
		attaboyOrders,
		attaboyOthers,
	} = props;
	const ratioComparedToRevenue = (revenue, expense) => {
		const ratio = (expense / revenue) * 100;
		return Math.round(ratio);
	};
	return (
		<>
			<div>
				<p>CA: ${totalAttaboyRevenue}</p>
				<p>Depenses: ${totalAttaboyExpenses}</p>
			</div>
			<div>
				<p>CA hier</p>
			</div>
			<div>
				<p>masse salariale: ${attaboySalary}</p>
				<p>
					Ratio masse salariale:{" "}
					{ratioComparedToRevenue(totalAttaboyRevenue, attaboySalary)}%
				</p>
				<p>commandes: ${attaboyOrders}</p>
				<p>
					Ratio commandes:
					{ratioComparedToRevenue(totalAttaboyRevenue, attaboyOrders)}%
				</p>
				<p>La restan: ${attaboyOthers}</p>
				<p>
					ratio La restan:{" "}
					{ratioComparedToRevenue(totalAttaboyRevenue, attaboyOthers)}%
				</p>
			</div>
			<div>
				<p>ticket moyen</p>
				<p>nombres de ticket</p>
			</div>
		</>
	);
}

export default AttaboyOverview;
