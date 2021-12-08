import React, { useState } from 'react';
import {Button, TextField} from "@mui/material";
import {set_employee} from "../redux/ducks/selectedBoxDetails";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const Login = () => {
	let history = useHistory();

	const dispatch = useDispatch();

	// holds the username & password variables
	const [login, setLogin] = useState({username: "", password: ""});

	function loginButton() {
		if (login.username !== "" && login.password !== "") {
			return <Button onClick={tryLogin} sx={{m:1, mt: 5}} size={"medium"} variant="contained">login</Button>
		} else {
			return <Button sx={{m:1, mt: 5}} size={"medium"} variant="contained" disabled>login</Button>
		}
	}

	// handles behavior for successful & unsuccessful login
	function tryLogin() {
		if (auth(login.username, login.password)) {
			dispatch(set_employee(login.username));
			history.push("/boxes");
		} else {
			alert("incorrect login information");
		}
	}

	// replace later
	function auth(user, pass) {
		return (user === "tester" && pass === "test");
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
		</div>
	);
}

export default Login;