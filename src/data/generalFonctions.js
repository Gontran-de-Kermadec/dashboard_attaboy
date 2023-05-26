import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const ratioComparedToRevenue = (revenue, expense) => {
	console.log(expense, revenue);
	const ratio = (expense / revenue) * 100;
	return Math.round(ratio);
};

export const displayScoreColor = (value) => {
	let color;
	if (Number(value) > 60) {
		console.log("pas bon");
		color = "#D63838";
	} else if (Number(value) > 30 && Number(value) < 60) {
		color = "#F35815";
	} else {
		color = "#01790d";
	}
	return color;
};

export const getLastDayRevenue = (restaurant, year, lastDay, constToSet) => {
	const lastDayRequest = query(
		// collection(db, `ventes/${activeRestaurant}/${currentYear}`),
		collection(db, `ventes/${restaurant}/${year}`),
		where("timestamp", "==", lastDay)
		// where("timestamp", "==", previousDay)
	);
	let lastDayRevenue = 0;
	console.log(lastDayRequest);
	onSnapshot(lastDayRequest, (querySnapshot) => {
		if (querySnapshot.empty) {
			console.log("pas de revenus hier");
			constToSet(0);
		} else {
			console.log("des reveues");
			querySnapshot.forEach((doc) => {
				console.log(doc.data().sourcesOfRevenues);
				lastDayRevenue = doc.data().total;
			});
			constToSet(lastDayRevenue);
		}
	});
};

export const hex2rgba = (hex, alpha = 1) => {
	const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
	return `rgba(${r},${g},${b},${alpha})`;
};

export const removeTaxes = (amount) => {
	return amount - amount * (15 / 100);
};
export const removeUberFees = (amount) => {
	const minusFees = amount - amount * (30 / 100);
	const minusTaxes = minusFees - minusFees * (15 / 100);
	return minusTaxes;
};
export const removeDoordashFees = (amount) => {
	return amount - amount * (25 / 100);
};
export const removeRestoLocoFees = (amount) => {
	return amount - amount * (20 / 100);
};
