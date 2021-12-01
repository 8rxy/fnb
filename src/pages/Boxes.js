/* TODO:
 * add notes column
 * redirect if no login credidentials
 */

import React from "react";

import {useDispatch} from "react-redux";
import {useState} from "react";
import {set_box_id} from "../redux/ducks/selectedBoxDetails";

import {Button} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";

import axios from 'axios';

import Modal from "../elements/Modal"; // popup window
import ToolbarGrid from "../elements/ToolbarGrid";




export default function Boxes() {

	// dispatches action to change a state in redux store
	const dispatch = useDispatch(); 

	const [open, setOpen] = React.useState(false);
	const [owners, setOwners] = React.useState([]); // empty array

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// create view?
	const handleView = (details) => {
		handleOpen();
		setOwners(details.owners);
		dispatch(set_box_id(details.boxid));
	}

	const [columns, setColumns] = useState([
		{
			field: "boxid",
			headerName: "Box ID",
			flex: 1, // comparative width
			//headerClassName: "super-app-theme--header" // unsure
		},
		{
			field: "names",
			headerName: "Owners",
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
					icon = {<Button variant={"text"}>open</Button>}
					label = "open"
					onClick = {() => {handleView(params.row)}}
				/>
			]
		}
	])

	const [rows, setRows] = useState([
		//{
		//	id: 1,
		//	boxid: '1',
		//	names: ["kamal", "amal", "nimal"],
		//	owners: [{id: 1, name: "amal", sign: "link1"}, {id: 2, name: "kamal", sign: "link2"}]
		//}
	])

	React.useEffect(() => {
		axios.get("http://localhost/backend/api/box/all_owners.php").then(res => {
			setRows(res.data.data);
		}).catch(err => {
			console.log(err); // ! add more useful alert
			alert(err)
		});
	}, []);

	// basic modal 
	return (
		<div>
			<ToolbarGrid columns={columns} rows={rows}/>
			<Modal open={open} handleClose={handleClose} owners={owners}/>
		</div>
	)
}