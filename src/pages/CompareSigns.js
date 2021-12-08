import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import React, { useState } from  "react";
import {v4 as uuidv4} from "uuid";
import TransactionView from "../elements/TransactionView";
import {useHistory} from "react-router-dom";

import axios from "axios";

export default function CompareSigns() {

	
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
		} else {
			if (selectedBoxDetails.availableOwners.length === 0) {
				alert("error in grabbing signature info");
				history.push("/boxes");
			}
		}
	}


	const [transactionID, setTransactionID] = useState(undefined);

	const [open, setOpen] = React.useState(false); // for transactions view
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [previousSigns, setPreviousSigns] = useState([]); // acquires previous signatures

	const [transactionData, setTransactionData] = useState({});
	const [signatureData, setSignatureData] = useState({});

	React.useEffect(() => {
		setTransactionID(uuidv4());
	}, [])

	React.useEffect(() => { // acquire previous signatures of attendees
		setPreviousSigns([]);
		selectedBoxDetails.signs.map((signee) => {
			axios.get(`http://localhost/backend/api/owner_sign.php?id=${signee.CIF}`).then(res => {
				if (typeof res.data.data != 'undefined') {
					res.data.data.map((signature) => {
						setPreviousSigns(oldArray => [...oldArray, {"name": signee.name, "CIF": signee.CIF, "timestamp": signature.timestamp, "sign": signature.png}]);
					});
				}
			}).catch(err => {
				console.log(err);
				alert("axios error: " + err);
			}); 
		})
	}, []);

	function handleTransaction(approval) {
		setTransactionData({
			transactionID: transactionID,
			boxID: selectedBoxDetails.boxID,
			employee: selectedBoxDetails.employee,
			presentOwners: selectedBoxDetails.availableOwners.map(a => a).join("|"),
			CIFs: selectedBoxDetails.signs.map(a => a.CIF).join("|"),
			presentGuests: selectedBoxDetails.guests.map(a => a).join("|"),
			approved: approval
		});

		let signsTemp = [];
		selectedBoxDetails.signs.map((signee) => {
			signsTemp.push({
				"signatureID": uuidv4(),
				"transactionID": transactionID,
				"boxID": selectedBoxDetails.boxID,
				"isOwner": signee.CIF === "" ? 0 : 1,
				"CIF": signee.CIF,
				"name": signee.name,
				"png": signee.sign
			})
		})
		setSignatureData(signsTemp);
		handleOpen();
	}

	function showPreviousSigns(currentCIF) {
		if (currentCIF !== "" && currentCIF !== 0) {
			let filtered = previousSigns.filter((entry) => entry.CIF === currentCIF);
			if (filtered.length === 0 && currentCIF !== "" && currentCIF !== 0) {
				return <Grid item xs={4} sx={{m: "50px"}}>
					no previous signatures
				</Grid>
			} else {
				return filtered.map((entry) => {
					return <Grid item xs={3} sx={{ml: "20px"}}>
					
						<img alt="loading failed" src={entry.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
						{entry.timestamp}
					</Grid>
				})
			}
		}
	}

	function showName(currentOwner) {
		if (currentOwner.CIF !== "" && currentOwner.CIF !== 0) {
			return <Grid item xs={12} sx={{ fontWeight: "bold"}}>{currentOwner.name}</Grid>
		} else {
			return <Grid item xs={12} sx={{ fontWeight: "bold"}}>{currentOwner.name} (guest)</Grid>
		}
	}

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Box sx={{
						display: 'flex',
						flexDirection: 'column',
					}}>
						{selectedBoxDetails.signs.map((owner) => {
							return <div>
								<Paper elevation={3} sx={{p: 1}}>
									<Grid container spacing={3} columnSpacing={20}>
										{showName(owner)}
										<Grid item xs={1} sx={{mr: "133px"}}>
											<img alt="loading failed" src={owner.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
											Current
										</Grid>
										
										{showPreviousSigns(owner.CIF)}

									</Grid>
								</Paper>
							</div>
						})}
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Button sx={{ml: 4}} onClick={() => handleTransaction(1)} variant={'contained'} size={'large'}>approve</Button>
					<Button sx={{ml: 4}} onClick={() => handleTransaction(0)} to={'/boxes'} size={'large'}>deny</Button>
				</Grid>
				<TransactionView transactionData={transactionData} signatureData={signatureData} open={open} handleClose={handleClose}/>
			</Grid>
		</div>
	);
}
