/* TODO:
 * empty selected person list upon closing modal window
 */

// selection stuff: 
// https://mui.com/components/selects/
// https://mui.com/api/select/
// https://mui.com/api/menu-item/#demos


import React, { useState } from 'react';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import GuestView from "./GuestView";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import {
	Router,
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory
} from "react-router-dom";
import {useDispatch} from "react-redux";
import {set_available_owners, set_box_id} from "../redux/ducks/selectedBoxDetails";


// for Box
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}

// for Select
const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

// for MenuItem
function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function BasicModal(props) {

	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

	const dispatch = useDispatch();
	let history = useHistory();

	function submitButton() {
		if (personName.length !== 0) { 
			return <Button onClick={handleSubmit} sx={{m:1}} size={"medium"} variant="contained">submit</Button>
			//return <button onClick={() => handleSubmit()}>submit</button>
		} else {
			return <Button sx={{m:1}} size={"medium"} variant="contained" disabled>submit</Button>
			//return <button className="disabled">submit</button>
		}
	}

	//const handleSubmit = () => {
	function handleSubmit() {
		dispatch(set_available_owners(personName));
		
		history.push("/signs");
	}
	
	const handleChange = (event) => {
		const {
			target: {value},
		} = event;
		setPersonName(
			// on autofill we get a the stringified value.
			typeof value === "string" ? value.split(',') : value,
		);
	};

	return (
		<div>
			<Modal
				open = {props.open}
				onClose = {
					//setPersonName([]), // reset selected people on window close // also crashes
					props.handleClose
				}
				aria-labelledby = "modal-modal-title"
				aria-describedby = "modal-modal-description"

			>
				
				<Box sx={style}>
					{/*<p>i have been passed {JSON.stringify(props.owners)}</p>*/}
					
					<FormControl sx={{width: "100%", mb: "20px"}}>

						<Typography id="modal-modal-title" variant="h6" component="h6">
							Owners
						</Typography>
						
						<Select
							labelId = "multiple-name-label"
							id = "multiple-name"
							multiple
							value = {personName}
							onChange = {handleChange}
							//input = {<OutlinedInput label = "Owners"/>}
							renderValue = {(selected) => selected.join(', ')} // [_]
							MenuProps = {MenuProps}
						>
							{props.owners.map((owner) => (
								<MenuItem
									key = {owner} // why does this do nothing
									value = {owner}
									test = {owner}
									style = {getStyles(owner, personName, theme)}
								>
									<Checkbox checked={personName.indexOf(owner) > -1}/>
									{<ListItemText primary={owner} />}
									{/*owner*/}
								</MenuItem>
							))}
							
						</Select>
					</FormControl>
					<Typography id="modal-modal-title" variant="h6" component="h6">
						Guests
					</Typography>
					<GuestView />

					
					{submitButton()}

					{/*<p>personName: {JSON.stringify(personName)}</p>*/}
				</Box>
			</Modal>
			
		</div>

	);
}
