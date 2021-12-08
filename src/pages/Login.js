/* TODO:
 * make authentication
 */

import React, { useState } from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
//import {set_employee} from "../redux/ducks/sessionInfo";
import {set_employee} from "../redux/ducks/selectedBoxDetails";
import {useSelector, useDispatch} from "react-redux";
import {
	Router,
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory
} from "react-router-dom";


const Login = () => {
	let history = useHistory();

	const dispatch = useDispatch();
	//const sessionInfo = useSelector((state) => state.sessionInfo);
	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

	// holds the username & password variables
	const [login, setLogin] = useState({username: "", password: ""});

	function loginButton() {
		//return <Link to="/select">login</Link>;
		if (login.username !== "" && login.password !== "") {
			//return <button onClick={() => tryLogin()}>login</button>
			return <Button onClick={tryLogin} sx={{m:1, mt: 5}} size={"medium"} variant="contained">login</Button>
		} else {
			//return <button className="disabled">login</button>
			return <Button sx={{m:1, mt: 5}} size={"medium"} variant="contained" disabled>login</Button>
		}
	}

	// handles behavior for successful & unsuccessful login
	function tryLogin() {
		if (auth(login.username, login.password)) {
			dispatch(set_employee(login.username));
			//window.location.replace("/boxes"); // doesnt retain state
			//<Redirect to='/boxes' /> // doesnt work
			history.push("/boxes");
		} else {
			alert("incorrect login information");
		}
	}

	// replace later
	function auth(user, pass) {
		return (user === "test" && pass === "test");
	}


	return (
		<div>
			<h2>Deposit Box System</h2>
				<div className="login">

					<TextField
						id = "username"
						name = "username"
						value = {login.username}
						onChange = {e => setLogin({...login, username: e.target.value})}
						fullWidth
						label = "Username"
						variant = "outlined"
						
					/>
					<TextField
						id = "password"
						name = "password"
						value = {login.password}
						onChange={e => setLogin({...login, password: e.target.value})}
						fullWidth
						label = "Password"
						variant = "outlined"
						type="password"
						sx={{mt: 2}}
					/>

				</div>

				{loginButton()}

				{/*<p>{JSON.stringify(login)}</p>*/}

		</div>
	);
}

export default Login;