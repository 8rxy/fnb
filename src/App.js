import './App.css';
import Login from "./pages/Login";
import Select from "./pages/Select";
import { createBrowserHistory } from 'history'
//import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

const history = createBrowserHistory()

function App() {
	return (
		<div className="fnb">
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/select" component={Select} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;