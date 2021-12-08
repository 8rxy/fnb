import selectedBoxDetails from "../redux/ducks/selectedBoxDetails";

import {useSelector, useDispatch} from "react-redux";
export default function Debug() {

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);



	
	return (
		<div>
			<p>state variable data</p>
			<p>available owners: {JSON.stringify(selectedBoxDetails.availableOwners)}</p>
			<p>box id: {JSON.stringify(selectedBoxDetails.boxID)}</p>
			<p>guests: {JSON.stringify(selectedBoxDetails.guests)}</p>
			<p>employee: {JSON.stringify(selectedBoxDetails.employee)}</p>
			<p>global signature data: {JSON.stringify(selectedBoxDetails.signs)}</p>
			<p>php output: {JSON.stringify(selectedBoxDetails.debug)}</p>




		</div>
	);
}
