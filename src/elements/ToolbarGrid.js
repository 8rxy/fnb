import { bottomNavigationActionClasses } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton} from "@mui/x-data-grid";
import { useDemoData } from '@mui/x-data-grid-generator';
import Stack from '@mui/material/Stack';


function CustomToolbar(props) {
	return (
		<GridToolbarContainer {...props}> 
			<GridToolbarFilterButton />
			<GridToolbarColumnsButton />
		</GridToolbarContainer>
	);
}

export default function ToolbarGrid(props) {


	return (
		// -40 for headers
		<div style={{height: window.innerHeight - 40, width: "100%" }}>
			<DataGrid
				columns = {props.columns}
				rows = {props.rows}
				components = {{
					Toolbar: CustomToolbar,
					NoRowsOverlay: () => (
						<Stack height="100%" alignItems="center" justifyContent="center">
							no data found - likely a connection error
						</Stack>
					),
					NoResultsOverlay: () => (
						<Stack height="100%" alignItems="center" justifyContent="center">
							local filter returns no result
						</Stack>
				)}}
				//autoHeight
				//autoPageSize
				//disableColumnSelector
				//disableDensitySelector
				//loading

			/>
		</div>
	);
}
