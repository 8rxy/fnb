import logo from "./square.png"
import {set_employee} from "../redux/ducks/selectedBoxDetails";
import {useSelector, useDispatch} from "react-redux";




export default function Header() {
	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

	function showEmployee() {
		if (typeof selectedBoxDetails.employee != 'undefined' && selectedBoxDetails.employee !== "") {
			return " | employee: " + selectedBoxDetails.employee;
		}
	}
	
	function showBox() {
		if (typeof selectedBoxDetails.boxID != 'undefined') {
			return " | box: " + selectedBoxDetails.boxID;
		}
	}

	return(
		<div id="banner">
			<div id="banner-content">
				<img src={logo} alt="logo" />
				
			</div>
			<div id="banner-text">
				<p>FNB {showEmployee()} {showBox()}</p>
			</div>
		</div>
	)
}