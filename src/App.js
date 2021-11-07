
import React from 'react'
import './App.css';
import Login from "./pages/Login";
import Select from "./pages/Select";
import { createBrowserHistory } from 'history';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import axios;

// from https://www.techiediaries.com/php-react-rest-api-crud-tutorial/
function componentDidMount() { 
	const url = '/apis/main.php'
	axios.get(url).then(response => response.data).then((data) => {
		this.setState({ main: data })
		console.log(this.state.main)
	})
}

const App = () => {

	return (
		<div className="fnb">
			<Router>
				<Route exact path="/" component={Login} />
				<Route exact path="/select" component={Select} />
			</Router>
		</div>
	);
}



export default App;