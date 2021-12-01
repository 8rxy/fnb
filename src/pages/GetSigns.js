/* TODO:
 * redirect if no information was passed from modal?
 * prevent selection of owner & guest at same time
 * disable add button until canvas has been marked
 * make reset button canvas next to add
 * disable multiple signatures of the same person or create a completion indicator
 * prevent submit until every signature has been collected
 * remove guests text if there are no guests
 */

import React, {useState, useRef} from "react";
import CanvasDraw from "react-canvas-draw";
import {Button, Grid} from "@mui/material";
import RadioButtonsGroup from "../elements/RadioButtonsGroup";
import img from "../elements/sign-background.png";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {set_available_owners} from "../redux/ducks/selectedBoxDetails";
import {Link} from "react-router-dom";
import RadioButtonsGuests from "../elements/RadioButtonsGuests";

export default function GetSigns() {

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);
	const [boxAllOwners, setBoxAllOwners] = React.useState([]);
	const [availableOwnersIds, setAvailableOwnersIds] = useState([]);
	const [availableOwners, setAvailableOwners] = useState([]);
	const [availableGuests, setAvailableGuests] = useState([]);
	const [selectedOwner, setSelectedOwner] = useState(undefined);
	const [newAvailableOwners, setNewAvailableOwners] = useState([]);

	const canvasRef = useRef(null);
	const dispatch = useDispatch();

	let tempArr = [];
	React.useEffect(() => {
		setAvailableOwnersIds(selectedBoxDetails.availableOwners);
		setAvailableGuests(selectedBoxDetails.guests);
		axios.get(`http://localhost/backend/api/box/owners_for_single_box.php?id=${selectedBoxDetails.boxId}`).then(res => {
			setBoxAllOwners(res.data.data.owners);
			selectedBoxDetails.availableOwners.map((ownerId) => {
				res.data.data.owners.map((owner) => {
					if (owner.id === ownerId) {
						tempArr.push(owner);
					}
				});
			});
			setAvailableOwners(tempArr);
		}).catch(err => {
			console.log(err); // also replace
		}); 
	}, []);

	React.useEffect(() => {
		dispatch(set_available_owners(newAvailableOwners));
	}, [newAvailableOwners]) // use this effect only if variable changes

	const handleAdd = () => {
		availableOwners.map((owner) => {
			if (owner.id == selectedOwner) {
				owner.currentSign = canvasRef.current.getDataURL("png", img, "white");
				setNewAvailableOwners([...newAvailableOwners, owner]);
			}
		})
		canvasRef.current.clear();
	}

	const handleRadioSelect = (e) => {
		canvasRef.current.clear();
		setSelectedOwner(e.target.value);
	}


	return (
		<Grid container>
			<Grid item xs={4} sx={{pt: 15, pl: 15}}>
				<Grid item xs={12}>
					<RadioButtonsGroup handleRadioSelect={handleRadioSelect} buttonItems={availableOwners}/>
					<RadioButtonsGuests handleRadioSelect={handleRadioSelect} buttonItems={availableGuests}/>
				</Grid>
				<Grid item xs={12} sx={{pl: 0}} align={"left"}>
					<Button component={Link} to={"/signs/compare"} size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>Submit</Button>
				</Grid>
			</Grid>
			<Grid item xs={8} align={"right"}>
				<Grid item xs={12} sx={{pt: 15, pr: 15}}>
					<CanvasDraw ref={canvasRef} brushRadius={1} lazyRadius={0} canvasHeight={300} canvasWidth={600} imgSrc={img}/>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={handleAdd} size={"medium"} sx={{mr: 15, mt: 3}} variant={"contained"}>Add</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}