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
			<p>
				this is the login
			</p>
			<Router>
				<Link to="/select">
					go to select page
				</Link>

				<Switch>
					<Route exact path="/select" component={Select}/>
        		</Switch>
			</Router>
		</div>
	);
}

export default Login;
