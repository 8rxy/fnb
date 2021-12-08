/* TODO:
 * redirect if no login credidentials
 * make handle close reset box id
 */

import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {set_box_id} from "../redux/ducks/selectedBoxDetails";

import {alertTitleClasses, Button} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import axios from 'axios';

import Modal from "../elements/Modal"; // popup window
import ToolbarGrid from "../elements/ToolbarGrid";
import {
	Router,
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";




export default function Boxes() {



	// redirects if not logged in
	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

/*
	if (sessionInfo.employee == null) {
		//alert("please log in");
		alert("input: " + sessionInfo.employee)
		//<Redirect to='/' />
		window.location.replace("/");
	}

*/
	
	// dispatches action to change a state in redux store
	const dispatch = useDispatch(); 

	const [open, setOpen] = React.useState(false);
	const [owners, setOwners] = React.useState([]);
	const [CIFs, setCIFs] = React.useState([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// create view?
	const handleView = (details) => {
		handleOpen();
		setOwners(details.owners);
		//setCIFs(details.CIFs)
		dispatch(set_box_id(details.boxID));
		//alert("dispatched box id: " + details.boxID);
	}

	const [columns, setColumns] = useState([
		{
			field: "boxID",
			headerName: "Box ID",
			flex: 1, // comparative width
			headerClassName: "super-app-theme--header" // unsure
		},
		{
			field: "owners",
			headerName: "Owners",
			flex: 3,
			headerClassName: "super-app-theme--header"
		},
		{
			field: "CIFs",
			headerName: "CIFs",
			flex: 2,
			headerClassName: "super-app-theme--header"
		},
		{
			field: "notes",
			headerName: "Notes",
			flex: 3, 
			headerClassName: "super-app-theme--header"
		},
		// look into a way of getting notes
		{
			field: "view",
			headerName: " ", // maybe can remove
			flex: 1,
			type: "actions", // this a thing?
			getActions: (params) => [
				<GridActionsCellItem
					//icon = {<Button variant={"text"}>open</Button>}
					icon = {<OpenInNewIcon />}
					label = "open"
					onClick = {() => {handleView(params.row)}}
				/>
			]
		}
	])

	const [rows, setRows] = useState([])

	React.useEffect(() => {
		axios.get("http://localhost/backend/api/owners_all.php").then(res => {
			setRows(res.data.data);
		}).catch(err => {
			console.log(err);
			alert("axios error: " + err);
		});
	}, []);

	// basic modal 
	return (
		<div>
			{/*displaySessionInfo()*/}
			<ToolbarGrid columns={columns} rows={rows} />
			<Modal open={open} handleClose={handleClose} owners={owners} />
		</div>
	)
}