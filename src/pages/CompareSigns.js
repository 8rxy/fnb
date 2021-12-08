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
import {v4 as uuidv4} from "uuid";
import TransactionView from "../elements/TransactionView";

import axios from "axios";
import { AltRoute, ApprovalOutlined } from '@mui/icons-material';

export default function CompareSigns() {


	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);
	

	const [availableOwners, setAvailableOwners] = useState([]);
	const [transactionID, setTransactionID] = useState(undefined);
	const [logData, setLogData] = useState({});
	const [open, setOpen] = React.useState(false);


	const [previousSigns, setPreviousSigns] = useState([]);
	const [approved, setApproved] = useState(undefined);

	const [transactionData, setTransactionData] = useState({});
	const [signatureData, setSignatureData] = useState({});

	React.useEffect(() => {
		setAvailableOwners(selectedBoxDetails.availableOwners);
		setTransactionID(uuidv4());
	}, [])


	React.useEffect(() => {
		setPreviousSigns([]);
		selectedBoxDetails.signs.map((signee) => {
			axios.get(`http://localhost/backend/api/owner_sign.php?id=${signee.CIF}`).then(res => {
				if (typeof res.data.data != 'undefined') {
					res.data.data.map((signature) => {
						//signsTemp.push({"name": signee.name, "CIF": signee.CIF, "timestamp": signature.timestamp, "sign": signature.png});
						setPreviousSigns(oldArray => [...oldArray, {"name": signee.name, "CIF": signee.CIF, "timestamp": signature.timestamp, "sign": signature.png}]);
						//alert(JSON.stringify(signsTemp));
					});
				}
			}).catch(err => {
				console.log(err);
				alert("axios error: " + err);
			}); 
		})
		//alert(JSON.stringify(signsTemp));
		//setPreviousSigns(signsTemp);
	}, []);

	const handleDeny = () => {
		//history.push("/boxes");
		//window.location.replace("/");
		setApproved(false);
		alert(approved);
		handleTransaction();
	}

	const handleApprove = () => {
		setApproved(true);
		
		alert(approved);
		if (typeof approved != 'undefined') {
			handleTransaction();
		}
		
	}

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



	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	function handlePreviousSigns(currentCIF) {
		let filtered = previousSigns.filter((entry) => entry.CIF === currentCIF);

		if (filtered.length === 0 && currentCIF !== "" && currentCIF !== 0) {
			return <Grid item xs={4} sx={{m: "50px"}}>
				no previous signatures
			</Grid>
		} else {
			return filtered.map((entry) => {
				return <Grid item xs={3} sx={{ml: "20px"}}>
				
					<img src={entry.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
					{entry.timestamp}
				</Grid>
				/*return <div>
					<Grid item xs={1} sx={{ml: "250px"}}>
				
						<img src={entry.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
				
					</Grid>
					{entry.timestamp}
				</div>*/
			})
		}
	}

	return (
		<div>
		<p>available owners: {JSON.stringify(selectedBoxDetails.availableOwners)}</p>
		<p>available guests: {JSON.stringify(selectedBoxDetails.guests)}</p>
		<p>state signs: {JSON.stringify(selectedBoxDetails.signs)}</p>
		<p>previous: {JSON.stringify(previousSigns)}</p>
		<p>transaction id: {JSON.stringify(transactionID)}</p>

		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					/*flexWrap: 'wrap', '& > :not(style)': {
						m: 1,
						width: 1000,
						height: 228,
					},*/
				}}>
					{selectedBoxDetails.signs.map((owner) => {
						return <div>
							<Paper elevation={3} sx={{p: 1}}>
								<Grid container spacing={3} columnSpacing={20}>
									<Grid item xs={12} sx={{ fontWeight: 'bold' }}>{owner.name}</Grid>
									<Grid item xs={1} sx={{mr: "133px"}}>
										<img src={owner.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
										Current
									</Grid>
									
									{/*filtered = previousSigns.filter((entry) => entry.CIF === owner.CIF);
									previousSigns.map((entry) => {
										return <Grid item xs={1} sx={{ml: "250px"}}>
										
											<img src={entry.sign} style={{border: "1px solid #000", width: '300px', height: '150px'}}/>
											{JSON.stringify(entry.timestamp)}
										</Grid>
									})*/}

									{handlePreviousSigns(owner.CIF)}

									

								</Grid>
							</Paper>
						</div>
					})}
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Button sx={{ml: 4}} onClick={() => handleTransaction(true)} variant={'contained'} size={'large'}>approve</Button>
				<Button sx={{ml: 4}} onClick={() => handleTransaction(false)} to={'/boxes'} size={'large'}>deny</Button>
			</Grid>
			<TransactionView transactionData={transactionData} signatureData={signatureData} open={open} handleClose={handleClose}/>
		</Grid>
		</div>
	);
}
