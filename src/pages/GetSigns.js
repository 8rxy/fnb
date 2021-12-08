/* TODO:
 * have default value
 * disable add button until canvas has been marked
 * move to next person upon add
 */

import React, {useState, useRef} from "react";
import CanvasDraw from "react-canvas-draw";
import {Button, Grid} from "@mui/material";
import RadioButtons from "../elements/RadioButtons";
import img from "../elements/sign-background.png";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {set_guests, set_signs} from "../redux/ducks/selectedBoxDetails";
import HandBack from "../elements/HandBack"; // popup window
import {useHistory} from "react-router-dom";

export default function GetSigns() {

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);
	let history = useHistory();

	// redirects if not logged in
	if (typeof selectedBoxDetails.employee == 'undefined' || selectedBoxDetails.employee === "") {
		alert("please log in");
		window.location.replace("/");
	} else {
		// redirects if no boxes has been selected yet
		if (typeof selectedBoxDetails.boxID == 'undefined' || selectedBoxDetails.boxID === "") {
			alert("please select a box 1st");
			history.push("/boxes");
		}
	}


	const [people, setPeople] = useState([]); // handles whether a signature has been given yet
	const [selectedPerson, setSelectedPerson] = useState("");
	const [refresh, setRefresh] = useState(0); // to force the radio button list to update
	const [collected, setCollected] = useState(false); // whether all signatures have been collected

	const canvasRef = useRef(null);
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	let tempDetails = [];
	React.useEffect(() => {
		if (typeof selectedBoxDetails.guests == 'undefined') {
			dispatch(set_guests(""));
		}
		axios.get(`http://localhost/backend/api/owners_for_single_box.php?id=${selectedBoxDetails.boxID}`).then(res => {
			//setBoxAllOwners(res.data.data.owners);
			selectedBoxDetails.availableOwners.map((ownerName) => {
				res.data.data.owners.map((owner) => {
					if (owner.name === ownerName) {
						tempDetails.push({"name": owner.name, "CIF": owner.CIF, "status": 0});
					}
				});
			});

			selectedBoxDetails.guests.map((guest) => {
				tempDetails.push({"name": guest, "CIF": "", "status": 0});
			});

			setPeople(tempDetails);
		}).catch(err => {
			console.log(err);
			alert("axios error: " + err);
		}); 
	}, []);

	const handleAdd = () => {
		people.map((person) => {
			if (person.name === selectedPerson) {
				person.sign = canvasRef.current.getDataURL("png", img, "white");
				person.status = 1;
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

	React.useEffect(() => { // every canvas refresh check if all signatures have been collected
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
			return <Button onClick={() => handleOpen()} size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>submit</Button>
		} else {
			return <Button disabled size={"medium"} sx={{mr: 14, mt: 3}} variant={"contained"}>submit</Button>
		}
	}

	return (
		<div>
			<Grid container>
				<Grid item xs={4} sx={{pt: 15, pl: 15}}>
					<Grid item xs={12}>
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