import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {set_box_id} from "../redux/ducks/selectedBoxDetails";

import {GridActionsCellItem} from "@mui/x-data-grid";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import axios from 'axios';

import Modal from "../elements/Modal"; // popup window
import ToolbarGrid from "../elements/ToolbarGrid";


export default function Boxes() {
	const selectedBoxDetails = useSelector((state) => state.selectedBoxDetails);

	// redirects if not logged in
	if (typeof selectedBoxDetails.employee == 'undefined' || selectedBoxDetails.employee === "") {
		alert("please log in");
		window.location.replace("/");
	}
	
	// dispatches action to change a state in redux store
	const dispatch = useDispatch(); 

	const [open, setOpen] = React.useState(false);
	const [owners, setOwners] = React.useState([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleView = (details) => {
		handleOpen();
		setOwners(details.owners);
		dispatch(set_box_id(details.boxID));
	}

	const [columns, setColumns] = useState([
		{
			field: "boxID",
			headerName: "Box ID",
			flex: 1, // comparative width
			headerClassName: "super-app-theme--header"
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
		{
			field: "view",
			headerName: " ",
			flex: 1,
			type: "actions",
			getActions: (params) => [
				<GridActionsCellItem
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
			<ToolbarGrid columns={columns} rows={rows} />
			<Modal open={open} handleClose={handleClose} owners={owners} />
		</div>
	)
}