import React from "react";
import Sidebar from "../components/Sidebar";
import CaisseForm from "../components/CaisseForm";

function Caisse() {
	return (
		<>
			<div className="flex">
				<Sidebar />
				<div className="caisse__container">
					<CaisseForm />
				</div>
			</div>
		</>
	);
}

export default Caisse;
