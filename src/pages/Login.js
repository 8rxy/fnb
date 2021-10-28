/* TODO:
 * login button more like a button
 * have login grayed out until both fields are filled
 * make the page actually do stuff
 */

import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Select from "./Select";

const Login = () => {
	return (
		<div>
			<h2>Deposit Box System</h2>
				<div class="login">
				<form>
					<label for="username">Username:</label><br />
					<input type="text" id="username" name="username" /><br />
					<label for="password">Password:</label><br />
					<input type="text" id="password" name="password" />
				</form> 

				

				</div>

				<Link to="/select">login</Link>
			

		</div>
	);
}

export default Login;