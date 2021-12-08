
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function renderIcon(stat) {
	if (stat === 0) {
		<PendingActionsIcon />
	} else {
		<AssignmentTurnedInIcon />
	}
}

export default function RadioButtons(props) {

	return (
		<FormControl component="fieldset">
			<RadioGroup name="radio-buttons-group" >{/*defaultValue={props.buttonItems[0].name}>*/}
				{props.buttonItems.map((item) => {
					if (item.status === 0) {
						return <div>
							<FormControlLabel style={{mt: "30px"}} onClick={(e) => props.handleRadioSelect(e)} value={item.name} control={<Radio/>} label={item.name}/>
							<PendingActionsIcon />
						</div>
					} else {
						return <div>
							<FormControlLabel style={{mt: "30px"}} onClick={(e) => props.handleRadioSelect(e)} value={item.name} control={<Radio/>} label={item.name}/>
							<AssignmentTurnedInIcon />
						</div>
					}
					 
				})}
			</RadioGroup>
		</FormControl>
	);
}
