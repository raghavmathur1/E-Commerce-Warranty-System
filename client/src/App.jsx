import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Dashboard/Dashboard";
import Landing from "./Pages/Landing/Landing";
function App() {
	return (
		<BrowserRouter>
			<wc-toast position="top-right"></wc-toast>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/dashboard" element={<Home />}></Route>
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
