/* TODO:
 * make authentication, window replace prolly needs to be a link to
 */

import React, { useState } from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";


const Login = () => {

	// holds the username & password variables
	const [login, setLogin] = useState({username: "", password: ""});

	function loginButton() {
		//return <Link to="/select">login</Link>;
		if (login.username !== "" && login.password !== "") {
			return <button onClick={() => tryLogin()}>login</button>
		} else {
			return <button class="disabled">login</button>
		}
	}

	// handles behavior for successful & unsuccessful login
	function tryLogin() {
		if (auth(login.username, login.password)) {
			window.location.replace("/boxes");
		} else {
			alert("incorrect login information");
		}
	}

	// to be replaced later
	function auth(user, pass) {
		return (user === "test" && pass === "test");
	}


	return (
		<div>
			<h2>Deposit Box System</h2>
				<div class="login">
					
					{/*<form>
						<label for="username">Login:</label><br />
						<input 
							type="text"
							id="username"
							name="username"
							value={login.username}
							onChange={e => setLogin({...login, username: e.target.value})}
						/><br />
						<label for="password">Password:</label><br />
						<input
							type="password"
							id="password"
							name="password"
							value={login.password}
							onChange={e => setLogin({...login, password: e.target.value})}
						/>

					</form>*/}

					{/*<TextField sx={{m: 2}} fullWidth label="Username" variant="outlined"/>*/}
					{/*<TextField sx={{m: 2}} fullWidth label="Password" type="password" variant="outlined"/>*/}

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