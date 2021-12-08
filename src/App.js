
import React from 'react'
import './App.css';
import Login from "./pages/Login";
import Select from "./pages/Select";
import Boxes from "./pages/Boxes";
import GetSigns from "./pages/GetSigns";
import CompareSigns from "./pages/CompareSigns";
import Debug from "./pages/Debug";
import Header from "./elements/Header";
import {Route, BrowserRouter} from "react-router-dom";;

const App = () => {
	return (
		<div className="fnb">
			<Header />
			<BrowserRouter>
				<Route exact path="/" component={Login} />
				<Route exact path="/select" component={Select} />
				<Route exact path="/boxes" component={Boxes} />
				<Route exact path="/signs" component={GetSigns} />
				<Route exact path="/signs/compare" component={CompareSigns} />
				<Route exact path="/debug" component={Debug} />
			</BrowserRouter>
		</div>
	);
}

export default App;