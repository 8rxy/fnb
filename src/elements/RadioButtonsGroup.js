
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup(props) {

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Owners</FormLabel>
			<RadioGroup
				aria-label="owners"
				name="radio-buttons-group"
			>
				{props.buttonItems.map((item) => {
					return <FormControlLabel onClick={(e) => props.handleRadioSelect(e)} value={item.id} control={<Radio/>} label={item.name}/>
				})}
			</RadioGroup>
		</FormControl>
	);
}
