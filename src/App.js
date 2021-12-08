/* TODO:
 * eventual font? beaufort bold (o aly check bank website)
 * add descriptions to everything
 * maybe add info header of employee, box, blah blah
 * add permanent reset button
 */

import React from 'react'
import './App.css';
import Login from "./pages/Login";
import Select from "./pages/Select";
import Boxes from "./pages/Boxes";
import GetSigns from "./pages/GetSigns";
import CompareSigns from "./pages/CompareSigns";
import Debug from "./pages/Debug";
import Header from "./elements/Header";
import {
	Router,
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

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
				

				{/*checkSession()*/}
					

			</BrowserRouter>
		</div>
	);
}

export default App;