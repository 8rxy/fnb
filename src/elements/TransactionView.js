import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import {TextField} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import {set_debug} from "../redux/ducks/selectedBoxDetails";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

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

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);
	const dispatch = useDispatch();
	let history = useHistory();

	const [notes, setNotes] = useState("");

	const handleNotes = (e) => {
		setNotes(e.target.value);
	}

	const handleSubmit = () => {
		axios.post(`http://localhost/backend/api/add_transaction.php`, {
			"transactionID": props.transactionData.transactionID,
			"boxID": props.transactionData.boxID,
			"employee": props.transactionData.employee,
			"presentOwners": props.transactionData.presentOwners,
			"CIFs": props.transactionData.CIFs,
			"presentGuests": props.transactionData.presentGuests,
			"approved": props.transactionData.approved,
			"notes": notes,
		}, 
		{
			headers: {
				'Content-Type': 'application/json'
			}
		//}).then(res => {
		//	dispatch(set_debug(res));
		}).catch(err => {
			console.log("err", err);
			alert("Axios error posting the transaction. " + err);
		})

		props.signatureData.map((sign) => {
			axios.post(`http://localhost/backend/api/add_signature.php`, {
				"signatureID": sign.signatureID,
				"transactionID": sign.transactionID,
				"boxID": sign.boxID,
				"isOwner": sign.isOwner,
				"CIF": sign.CIF,
				"name": sign.name,
				"png": sign.png,
			}, 
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}).catch(err => {
				console.log("err", err);
				alert("Axios error posting the signature for " + sign.name + ". " + err);
			})
		})

		window.location.replace("/");
		//history.push("/debug");
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
						Transaction {props.transactionData.approved ? "approved" : "denied"}.
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Transaction ID: {props.transactionData.transactionID}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Box ID: {props.transactionData.boxID}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Data & time: {Date()}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Owners present: {selectedBoxDetails.availableOwners.map(a => a).join(", ")}
					</Typography>
					<Typography id="modal-modal-description" sx={{mt: 2}}>
						Guests present: {selectedBoxDetails.guests.map(a => a).join(", ")}
					</Typography>
					<TextField
						id = "standard-multiline-static"
						label = "Notes (optional)"
						multiline
						rows = {4}
						value = {notes}
						onChange = {(e) => handleNotes(e)}
						variant = "outlined"
						fullWidth
						sx = {{mt: 2}}
					/>
					<Button variant={"contained"} onClick={handleSubmit} sx={{mt: 2}}>finish</Button>
				</Box>
			</Modal>
		</div>
	);
}
