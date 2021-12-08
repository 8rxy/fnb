import logo from "./square.png"
import {useSelector} from "react-redux";

export default function Header() {
	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

	function showEmployee() {
		if (typeof selectedBoxDetails.employee != 'undefined' && selectedBoxDetails.employee !== "") {
			return " | Employee: " + selectedBoxDetails.employee;
		}
	}
	
	function showBox() {
		if (typeof selectedBoxDetails.boxID != 'undefined' && selectedBoxDetails.boxID !== "") {
			return " | Box: " + selectedBoxDetails.boxID;
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