// dialog box to ask for owners present & names of guests

/* TODO:
 * stop checkmarks from showing in textfield
 * make text size of owners & guests the same
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


import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {set_available_owners} from "../redux/ducks/selectedBoxDetails";



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

// what dis? (for Select)
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

// & what dis? (for MenuItem)
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

	function submitButton() {
		if (personName.length !== 0) {
			//return <Button onClick={handleSubmit} component={Link} to={"/signs"} sx={{m:1}} size={"medium"}>submit</Button>
			return <Button onClick={handleSubmit} component={Link} to={"/signs"} sx={{m:1}} size={"medium"} variant="contained">submit</Button>
		} else {
			//return <Button class="disabled" sx={{m:1}} size={"medium"}>submit</Button>
			return <Button sx={{m:1}} size={"medium"} variant="contained" disabled>submit</Button>
		}
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

	const handleSubmit = () => {
		dispatch(set_available_owners(personName));
	}

	return (
		<div>
			<Modal
				open = {props.open}
				onClose = {props.handleClose}
				aria-labelledby = "modal-modal-title"
				aria-describedby = "modal-modal-description"
			>
				
				<Box sx={style}>
					{/*<p>i have been passed {JSON.stringify(props.owners)}</p>*/}
					
					<FormControl sx={{m: 1, width: "100%"}}>
						<label for="multiple-name">Owners</label><br />
						<InputLabel id="multiple-name-label"/>{/*Owners</InputLabel>*/}
						<Select
							labelId = "multiple-name-label"
							id = "multiple-name"
							multiple
							value = {personName}
							onChange = {handleChange}
							//input = {<OutlinedInput label = "Owners"/>}
							//renderValue = {(selected) => selected.join(', ')} // [_]
							

							MenuProps = {MenuProps}

						>
							{props.owners.map((owner) => (
								<MenuItem
									key = {owner.id} // why does this do nothing
									value = {owner.id}
									test = {owner.name}
									style = {getStyles(owner.name, personName, theme)}
								>
									<Checkbox checked={personName.indexOf(owner.id) > -1}/>
									{/*<ListItemText primary={owner.name} />*/}
									{owner.name}
								</MenuItem>
							))}
							
						</Select>
					</FormControl>
					<Typography id="modal-modal-title" variant="h6" component="h6">
						Guests
					</Typography>
					<GuestView/>

					{/*<Button onClick={handleSubmit} component={Link} to={"/signs"} sx={{m:1}} variant={'outlined'} size={'medium'}>submit</Button>*/}
					{submitButton()}

					{/*<p>personName: {JSON.stringify(personName)}</p>*/}
				</Box>
			</Modal>

			
		</div>

		
	);
}
