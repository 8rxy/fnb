
import React, {useState} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import GuestView from "./GuestView";
import {FormControl, MenuItem, Select} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import {useHistory} from "react-router-dom";
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
	const [personName, setPersonName] = useState([]);

	const dispatch = useDispatch();
	let history = useHistory();

	function submitButton() {
		if (personName.length !== 0) { 
			return <Button onClick={handleSubmit} sx={{m:1}} size={"medium"} variant="contained">submit</Button>
		} else {
			return <Button sx={{m:1}} size={"medium"} variant="contained" disabled>submit</Button>
		}
	}

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

	function resetSelection() { // reset box & owner selection info when closing window
		props.handleClose()
		setPersonName([]);
		dispatch(set_box_id(""));
	}

	return (
		<div>
			<Modal
				open = {props.open}
				onClose = {() => resetSelection()}
				aria-labelledby = "modal-modal-title"
				aria-describedby = "modal-modal-description"

			>
				<Box sx={style}>
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
							renderValue = {(selected) => selected.join(', ')} // [_]
							MenuProps = {MenuProps}
						>
							{props.owners.map((owner) => (
								<MenuItem
									key = {owner}
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
				</Box>
			</Modal>
		</div>
	);
}
