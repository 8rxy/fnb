import './App.css';
import Login from "./pages/Login";
import Select from "./pages/Select";

//import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
	return (
		<div className="fnb">
			<Router>
				<Route exact path="/" component={Login} />
				<Route path="/select" component={Select} />
			</Router>
		</div>
	);
}

export default App;