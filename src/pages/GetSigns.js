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
import RadioButtonsGuests from "../elements/RadioButtonsGuests";
import RadioButtons from "../elements/RadioButtons";
import img from "../elements/sign-background.png";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {set_available_owners, set_guests, set_signs} from "../redux/ducks/selectedBoxDetails";
import {Link} from "react-router-dom";
import HandBack from "../elements/HandBack"; // popup window


import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AltRoute } from "@mui/icons-material";

export default function GetSigns() {

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);
	const [boxAllOwners, setBoxAllOwners] = React.useState([]);
	const [availableOwnersIds, setAvailableOwnersIds] = useState([]);
	const [availableOwners, setAvailableOwners] = useState([]);
	const [availableGuests, setAvailableGuests] = useState([]);
	const [selectedOwner, setSelectedOwner] = useState(undefined);
	const [newAvailableOwners, setNewAvailableOwners] = useState([]);

	const [people, setPeople] = useState([]); // handles whether a signature has been given yet
	const [selectedPerson, setSelectedPerson] = useState("");

	const [refresh, setRefresh] = useState(0); // to force the radio button list to update

	const [collected, setCollected] = useState(false); // whether all signatures have been collected

	const [marked, setMarked] = useState(0); // whether canvas has been drawn on

	const canvasRef = useRef(null);
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	let tempArr = [];
	let tempDetails = [];
	React.useEffect(() => {
		//alert("passed in : " + selectedBoxDetails.availableOwners);
		//setAvailableOwnersIds(selectedBoxDetails.availableOwners);
		if (typeof selectedBoxDetails.guests == 'undefined') {
			dispatch(set_guests(""));
		}
		setAvailableGuests(selectedBoxDetails.guests);
		//alert("checking box: " + selectedBoxDetails.boxID);
		axios.get(`http://localhost/backend/api/owners_for_single_box.php?id=${selectedBoxDetails.boxID}`).then(res => {
			//setBoxAllOwners(res.data.data.owners);
			selectedBoxDetails.availableOwners.map((ownerName) => {
				res.data.data.owners.map((owner) => {
					if (owner.name === ownerName) {
						tempArr.push(owner);
						tempDetails.push({"name": owner.name, "CIF": owner.CIF, "status": 0});
					}
				});
			});
			setAvailableOwners(tempArr);

			

			selectedBoxDetails.guests.map((guest) => {
				tempDetails.push({"name": guest, "CIF": "", "status": 0});
			});

			setPeople(tempDetails);
			
			
			/*
			// create collective list for radio buttons
			let name = [];
			selectedBoxDetails.availableOwners.map((owner) => {
				name.push(owner);
			});
			selectedBoxDetails.guests.map((guest) => {
				name.push(guest);
			});

			//alert("length: " + tempNames.length);
			let status = Array(name.length).fill(0);
			setPeople({name, status});
			*/
			
		}).catch(err => {
			console.log(err);
			alert("axios error: " + err);
		}); 
	}, []);

	//React.useEffect(() => {
	//	dispatch(set_available_owners(newAvailableOwners));
	//}, [newAvailableOwners]) // end array means use this effect only if variable changes

	const handleAdd = () => {
		/*
		availableOwners.map((owner) => {
			if (owner.name == selectedOwner) {
				owner.currentSign = canvasRef.current.getDataURL("png", img, "white");
				setNewAvailableOwners([...newAvailableOwners, owner]);

			}
		})*/

		people.map((person) => {
			if (person.name == selectedPerson) {
				person.sign = canvasRef.current.getDataURL("png", img, "white");
				person.status = 1;
				//setNewAvailableOwners([...newAvailableOwners, owner]);

			}
		});	

		canvasRef.current.clear();
		setRefresh(Math.random());
	}

	const handleRadioSelect = (e) => {
		canvasRef.current.clear();
		setSelectedPerson(e.target.value);
	}

	function resetCanvas() {
		canvasRef.current.clear();
	}

	function isCanvasEmpty() {
		return marked === 0;
	}



	React.useEffect(() => {
		if (selectedPerson !== "") {
			setCollected(true);

			people.map((person) => {
				if (person.status === 0) {
					setCollected(false);
				}
			});
		}

	}, [refresh]);


	React.useEffect(() => { // replace with handback window later
		dispatch(set_signs(people));
	}, [people]);

	function canvasAdd() {
		if (selectedPerson === "") {
			return <Button disabled size={"medium"} sx={{mr: 15, mt: 3}} variant={"contained"}>add</Button>
		} else {
			return <Button onClick={handleAdd} size={"medium"} sx={{mr: 15, mt: 3}} variant={"contained"}>add</Button>

		}


	}

	function submitButton() {
		if (collected) {
			//return <Button component={Link} to={"/signs/compare"} size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>submit</Button>
			return <Button onClick={() => handleOpen()} size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>submit</Button>
		} else {
			return <Button disabled size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>submit</Button>
		}
	}

	function handleSubmit() {
		return <HandBack open={open} handleClose={handleClose} />
	}



	
	return (
		<div>
			<p>availableOwners: {JSON.stringify(availableOwners)}</p>
			<p>availableGuests: {JSON.stringify(availableGuests)}</p>
			<p>people: {JSON.stringify(people)}</p>
			<p>selectedPerson: {JSON.stringify(selectedPerson)}</p>
			<p>collected: {JSON.stringify(collected)}</p>
			

			<Grid container>
				<Grid item xs={4} sx={{pt: 15, pl: 15}}>
					<Grid item xs={12}>
						{/*
						<RadioButtonsGroup handleRadioSelect={handleRadioSelect} buttonItems={availableOwners}/>
						<RadioButtonsGuests handleRadioSelect={handleRadioSelect} buttonItems={availableGuests}/>
						*/}
						{/*
						<FormControl component="fieldset">
							<RadioGroup	name="radio-buttons-group">
								
								{people.name.map((person) => {
									return <FormControlLabel onClick={(e) => handleRadioSelect(e)} value={person} control={<Radio/>} label={person}/>
								})}
							</RadioGroup>
						</FormControl>
						*/}
						<RadioButtons handleRadioSelect={handleRadioSelect} buttonItems={people} update={refresh}/>


					</Grid>
					<Grid item xs={12} sx={{pl: 0}} align={"left"}>
						{submitButton()}
					</Grid>
				</Grid>
				<Grid item xs={8} align={"right"}>
					<Grid item xs={12} sx={{pt: 15, pr: 15}}>
						<CanvasDraw ref={canvasRef} brushRadius={1} lazyRadius={0} canvasHeight={300} canvasWidth={600} imgSrc={img} />
					</Grid>
					<Grid item xs={12}>
						<Button onClick={resetCanvas} size={"medium"} sx={{mr: 5, mt: 3}} variant={"contained"}>clear</Button>
						{canvasAdd()}
					</Grid>
				</Grid>
			</Grid>

			<HandBack open={open} handleClose={handleClose} />
		</div>
	);
}