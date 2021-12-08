import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {Button, Grid} from "@mui/material";
// for Box
const style = {
	position: 'absolute',
	top: '10%',
	left: '12%',
	transform: 'translate(-50%, -50%)',
	width: '10%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}


export default function HandBack(props) {
	return (
		<div>
			<Modal
				open = {props.open}
				onClose = {props.handleClose}
				aria-labelledby = "modal-modal-title"
				aria-describedby = "modal-modal-description"
			>
				
				<Box sx={style}>
					
					<p>Please hand the device back to the employee.</p>
					<Button size={"medium"} sx={{m: 3}} variant={"outlined"} />
					<Button component={Link} to={"/signs/compare"} size={"medium"} sx={{m: 3}} variant={"outlined"} />
					<Button size={"medium"} sx={{m: 3}} variant={"outlined"} />
				</Box>
			</Modal>
			
		</div>

	);
}
