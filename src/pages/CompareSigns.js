/* TODO:
 * auto scale signature window, maybe add border
 * confirmation window for approve/deny
 * acquire login data to set employee or maybe do that earlier
 * pretty sure database only keeps 1 signature backwards
 * rename transaction guests field
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import selectedBoxDetails from "../redux/ducks/selectedBoxDetails";
import React, { useState } from  "react";
//import history from "./utils/history";
import {v4 as uuidv4} from 'uuid';
import TransactionView from "../elements/TransactionView";

export default function CompareSigns() {

	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

	const [availableOwners, setAvailableOwners] = useState([]);
	const [transactionID, setTransactionID] = useState(undefined);
	const [logData, setLogData] = useState({});
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setAvailableOwners(selectedBoxDetails.availableOwners);
		setTransactionID(uuidv4());
	}, [])

	const handleDeny = () => {
	//	history.push("/boxes");
		window.location.replace("/");
	}

	const handleApprove = () => {
		setLogData({
			transactionID: transactionID,
			box: selectedBoxDetails.boxId,
			employee: "william amminger",
			owners: selectedBoxDetails.availableOwners.map(a => a.name).join(", "),
			guests: selectedBoxDetails.guests.map(a => a).join(", ")
		});
		handleOpen();
	}


	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap', '& > :not(style)': {
						m: 1,
						width: 728,
						height: 228,
					},
				}}>
					{availableOwners.map((owner) => {
						return <Paper elevation={3} sx={{p: 1}}>
							<Grid container spacing={2}>
								<Grid item xs={12}>{owner.name}</Grid>
								<Grid item xs={6}>
									<img src={owner.sign} style={{width: '150px', height: '150px'}}/>
									Previous
								</Grid>
								<Grid item xs={6}>
									<img src={owner.currentSign} style={{width: '150px', height: '150px'}}/>
									Current
								</Grid>
							</Grid>
						</Paper>
					})}
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Button sx={{ml: 4}} onClick={handleApprove} variant={'contained'} size={'large'}>Approve</Button>
				<Button sx={{ml: 4}} onClick={handleDeny} to={'/boxes'} size={'large'}>Deny</Button>
			</Grid>
			<TransactionView logData={logData} open={open} handleClose={handleClose}/>
		</Grid>
	);
}
