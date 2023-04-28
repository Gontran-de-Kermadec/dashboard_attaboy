//import React, { useEffect, useState } from "react";
import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

//const [data, setData] = useState([]);
export let annualCA;

export const getAnnualCA = () => {
	const startDate = new Date("04-01-2023");
	const endDate = new Date("04-30-2023");
	const q = query(
		collection(db, "ventes"),
		where("timestamp", ">=", startDate),
		where("timestamp", "<=", endDate)
	);
	//const unsubscribe =
	let total = 0;
	onSnapshot(q, (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// total.push(doc.data().total);
			total += doc.data().total;
		});
		console.log(total);
		//annualCA = total;
	});
	return total;
};

// export const todayDate = () => {
// 	const
// 	return new Date();
// }

export const todayDate = (date) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
