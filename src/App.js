import { Route, Routes } from "react-router-dom";
import "./App.css";

// import Sidebar from "./components/Sidebar";
import Caisse from "./pages/Caisse";
import Home from "./pages/Home";
import Revenus from "./pages/Revenus";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/revenus" element={<Revenus />} />
				<Route path="/caisse" element={<Caisse />} />
			</Routes>
			{/* <div className="App">
				<Home />
				<Sidebar />
			</div> */}
		</>
	);
}

export default App;
