import React from "react";

import Papa from "papaparse"; 
import { readString } from "react-papaparse";
import exampleTable from "./safe_deposit_boxes.csv"

var boxes = ["this is the default value"];
console.log(typeof boxes)

// makeshift from https://stackoverflow.com/questions/42628426/read-local-csv-with-relative-path-in-reactjs
const papaConfig = {
	complete: (results, file) => {
		console.log('Parsing complete:', results, file);
		console.log(typeof results);
		boxes = results
	},
	download: true,
	error: (error, file) => {
	  console.log('Error while parsing:', error, file);
	},
};
readString(exampleTable, papaConfig);

const Select = () => {
	return (
		
		<div>
			<header>
			<p>
				this is the select
			</p>
			</header>

			<ul>
				{boxes.map((boxes) => (
		  			<li key={boxes}>{boxes}</li>
				))}
	  		</ul>



		</div>
	);
}

export default Select;





