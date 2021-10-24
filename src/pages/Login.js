import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Select from "./Select";

function Login() {
	return (
		<div>
			<header>
			<p>
				this is the login
			</p>
			<Router>
				<Link to="/select">
					text?
				</Link>
				
			</Router>
			</header>
		</div>
	);
}

export default Login;
