
// TODO: maybe update toolbar position resize?

import { bottomNavigationActionClasses } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from '@mui/x-data-grid-generator';

export default function ToolbarGrid(props) {
	const { data } = useDemoData({
		dataSet: "Commodity",
		rowLength: 100,
		maxColumns: 6,
	});

	return (
		<div style={{height: window.innerHeight, width: "100%" }}>
			<DataGrid
				columns = {props.columns}
				rows = {props.rows}
				components = {{Toolbar: GridToolbar,}}
			/>
		</div>
	);
}
