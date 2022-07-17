import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
function App() {
	return (
		<BrowserRouter>
			<wc-toast position="top-right"></wc-toast>
			<Routes>
				{/* <Route path="/" element={<Landing />}></Route> */}
				<Route path="/signup" element={<Signup />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
