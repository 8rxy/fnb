/* TODO:
 * make the page actually do stuff
 */

import React, { useState } from 'react';


const Login = () => {

	// holds the username & password variables
	const [login, setLogin] = useState({username: "", password: ""});

	function loginButton() {
		//return <Link to="/select">login</Link>;
		if (login.username != "" && login.password != "") {
			return <button onClick={() => tryLogin() }>login</button>
		} else {
			return <button class="disabled">login</button>
		}
	}

	// handles behavior for successful & unsuccessful login
	function tryLogin() {
		if (auth(login.username, login.password)) {
			window.location.replace("/select");
		} else {
			alert("login failed");
		}
	}

	// to be replaced later
	function auth(user, pass) {
		return (user == "bepis" && pass == "bepis");
	}


	return (
		<div>
			<h2>Deposit Box System</h2>
				<div class="login">
					<form>
						<label for="username">Username:</label><br />
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

					</form> 

				</div>

				{loginButton()}

				{/*<p>{JSON.stringify(login)}</p> -->*/}
			

		</div>
	);
}

export default Login;