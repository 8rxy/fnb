// chip is used to control arrays of data

import React, {useState} from "react";
import Chips, {Chip} from "react-chips";
import {Grid, OutlinedInput} from "@mui/material";
import {set_guests} from "../redux/ducks/selectedBoxDetails";
import {useDispatch} from "react-redux";

export default function GuestView() {

	const [chips, setChips] = useState([]);

	const dispatch = useDispatch();

	const onChange = (chips) => {
		setChips(chips);
	}

	React.useEffect(() => {
		dispatch(set_guests(chips));
	})

	return (
		<Grid container>
			<Grid item xs={12}>
				<Chips
					value = {chips}
					onChange = {(e) => onChange(e)}
					placeholder = {"type the name & press 'enter' to add"}
					createChipKeys = {[13]} // specific code for the enter key
					//input = {<OutlinedInput label = "Owners"/>}
				/>
			</Grid>
		</Grid>
	);
}