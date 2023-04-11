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
export const getData = async () => {
	let allTotal = 0;
	// const docSnap = await getDoc(docRef);
	// if (docSnap.exists()) {
	// 	console.log("Document data:", docSnap.data());
	// } else {
	// 	// docSnap.data() will be undefined in this case
	// 	console.log("No such document!");
	// }
	const startOfToday = new Date();
	const startDate = new Date("04-01-2023");
	const endDate = new Date("04-30-2023");
	//startOfToday.setUTCHours(0, 0, 0, 0);
	//let time = new Date(2023, 3, 5);
	let time = new Date("04-02-2023");
	//console.log(startOfToday);
	console.log(time);
	//firebase.firestore().collection("cities").where("timestamp", ">", start)

	const q = query(
		collection(db, "ventes")
		//where("date", "==", "Monday 27 March 2023 13")
	);
	const q2 = query(
		collection(db, "ventes"),
		where("timestamp", "<", startOfToday)
	);
	const q3 = query(collection(db, "ventes"), where("timestamp", "==", time));
	const q4 = query(
		collection(db, "ventes"),
		where("timestamp", ">=", startDate),
		where("timestamp", "<=", endDate)
	);

	const querySnapshot = await getDocs(q4);
	onSnapshot(querySnapshot.query, (snapShot) => {
		snapShot.forEach((doc) => {
			console.log(doc.data());
			allTotal += doc.data().total;
		});
	});
	// querySnapshot.forEach((doc) => {
	// 	// doc.data() is never undefined for query doc snapshots
	// 	// console.log(doc.id, " => ", doc.data());
	// 	console.log(doc.data());
	// 	//const result = doc.data().total;
	// 	//setData(result);
	// 	//setData((data) => [...data, result]);
	// 	// allTotal.push(doc.data().total);
	// 	allTotal += doc.data().total;
	// 	// console.log(doc.id, " => ", doc.data());
	// });
	console.log(allTotal);
	annualCA = allTotal;
	//setData(allTotal);
	//annualRevenue();
	// annualCA = allTotal.reduce((accumulator, currentValue) => {
	// 	console.log(accumulator.total);
	// 	return accumulator.total + currentValue.total;
	// });
	// console.log(annualCA);
};
// getData();

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
