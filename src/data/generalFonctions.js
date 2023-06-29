import {
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebaseConfig";

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

export const genericSalesRequest = (restaurant, year, startDate, endDate) => {
	const request = query(
		collection(db, `ventes/${restaurant}/${year}`),
		where("timestamp", ">=", startDate),
		where("timestamp", "<=", endDate)
	);
	return request;
};
export const genericExpensesRequest = (
	restaurant,
	expenseType,
	startDate,
	endDate
) => {
	const request = query(
		collection(db, `depenses/${restaurant}/${expenseType}`),
		where("timestamp", ">=", startDate),
		where("timestamp", "<=", endDate)
	);
	return request;
};

export const getLastDayRevenue = (restaurant, year, lastDay, constToSet) => {
	const lastDayRequest = query(
		collection(db, `ventes/${restaurant}/${year}`),
		where("timestamp", "==", lastDay)
	);
	let lastDayRevenue = 0;
	console.log(lastDayRequest);
	onSnapshot(lastDayRequest, (querySnapshot) => {
		if (querySnapshot.empty) {
			console.log("pas de revenus hier");
			constToSet(0);
		} else {
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

export const checkUserLoggedIn = (context, relocate) => {
	//useEffect(() => {
	onAuthStateChanged(auth, (user) => {
		console.log(user);
		if (user) {
			console.log("user");
			//setUserLoggedIn(true);
			context(true);
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			//const uid = user.uid;
			// ...
		} else {
			console.log("no user relocate");
			//setUserLoggedIn(false);
			context(false);
			relocate("/", { replace: true });
			// navigate("/", { replace: true });
		}
	});
	//	}, [setUserLoggedIn]);
};
