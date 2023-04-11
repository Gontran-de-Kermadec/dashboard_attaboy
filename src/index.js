import React from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
// import { firebase } from "firebase";
// firebase.initializeApp({
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// });
// console.log("hhhhhh" + firebase);
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
