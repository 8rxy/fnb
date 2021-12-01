/* TODO:
 * reset login data after submit
 */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
//import history from "../utils/history";
import {TextField} from "@mui/material";
import axios from "axios";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function TransactionView(props) {

	const [payload, setPayload] = useState({});
	const [notes, setNotes] = useState("");

	const handleNotes = (e) => {
		setNotes(e.target.value);
	}

	const handleSubmit = () => {
		setPayload({
			transactionId: props.logData.transactionId,
			box: props.logData.boxId,
			dateNtime: Date(),
			owners: props.logData.owners,
			guests: props.logData.guests,
			notes: notes
		});

		axios.post('http://localhost/backend/api/transaction/add_transaction.php', {
			'transactionId': props.logData.transactionID,
			'employee': props.logData.employee,
			'owners': props.logData.owners,
			'deceasedGuests': props.logData.guests,
			'notes': notes,
			'boxId': props.logData.box
		}, 
		{
			headers: {
				'Content-Type': 'application/json'
			}
		//}).then(res => {
			//history.push('/boxes');
		}).catch(err => {
			console.log("err", err);
			alert(err);
		})

		window.location.replace("/");

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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Transaction Details
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Transaction ID: {props.logData.transactionID}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Box ID: {props.logData.box}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Data & time: {Date()}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Owners present: {props.logData.owners}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Guests present: {props.logData.guests}
					</Typography>
					<TextField
						id = "standard-multiline-static"
						label = "Notes (optional)"
						//placeholder = "(optional)"
						multiline
						rows = {4}
						value = {notes}
						onChange = {(e) => handleNotes(e)}
						variant = "outlined"
						fullWidth
						sx = {{mt: 2}}
					/>
					<Button variant={"contained"} onClick={handleSubmit} sx={{mt: 2}}>Finish</Button>
				</Box>
			</Modal>
		</div>
	);
}
