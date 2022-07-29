import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Landing from "./Pages/Landing/Landing";
import Topbar from "./Components/Topbar";
function App() {
	return (
		<BrowserRouter>
			<wc-toast></wc-toast>

			{/* <Topbar /> */}
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/dashboard/*" element={<Dashboard />}></Route>
				<Route
					path="/consumer/signup"
					element={<Signup user="consumer" />}
				></Route>
				<Route
					path="/retailer/signup"
					element={<Signup user="retailer" />}
				></Route>
				<Route
					path="/consumer/login"
					element={<Login user="consumer" />}
				></Route>
				<Route
					path="/retailer/login"
					element={<Login user="retailer" />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
