<?php
// called by GetSigns.js

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/Database.php";
include_once "../models/Box.php";


// instantiate db & connect
$database = new Database();
$db = $database -> connect();

// instantiate box object
$box = new Box($db);

//$box -> idbox = isset($_GET['id']) ? $_GET['id'] : die();
if (isset($_GET['id'])) {
	$box -> boxID = $_GET['id'];
} else  {
	echo "error: no box id value set";
	die();
}


// box query
$result = $box -> get_owners_for_box();

// get row count
$num = $result -> rowCount();

// check if there are any boxes
if ($num > 0) {

	$owners_for_box = array(
		"boxID" => $box -> boxID,
		"owners" => array(),
	);

	// loop should only run once
	while ($row = $result -> fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$names = explode("|", $owners);
		$ids = explode("|", $CIFs);
		$size = count($names);
		if ($size != count($ids)) {
			echo "error: parsed amount of owner names & CIFS do not match";
			die();
		}

		$fullOwnerObj = array();

		for ($i = 0; $i < $size; ++$i) {
			//array_push($fullOwnerObj, array(
			//	"name" => $names[$i],
			//	"CIF" => $ids[$i]));
			array_push($owners_for_box['owners'], array(
				"name" => $names[$i],
				"CIF" => $ids[$i]));
		}
		//array_push($owners_for_box['owners'], $fullOwnerObj);
	}

	$box_arr['data'] = $owners_for_box;
	echo json_encode($box_arr);
} else {
	echo json_encode(
		array("message" => "box not found")
	);
}
