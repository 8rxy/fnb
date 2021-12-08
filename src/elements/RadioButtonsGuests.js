
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function RadioButtonsGuests(props) {

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Guests</FormLabel>
			<RadioGroup
				aria-label="guests"
				name="radio-buttons-group"
			>
				{props.buttonItems.map((item) => {
					return <FormControlLabel onClick={(e) => props.handleRadioSelect(e)} value={item} control={<Radio/>} label={item}/>
				})}
			</RadioGroup>
		</FormControl>
	);
}
