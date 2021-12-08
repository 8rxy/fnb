<?php
// called by Boxes.js

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/Database.php";
include_once "../models/Box.php"; // get owners methods


// instantiate db & connect
$database = new Database();
$db = $database -> connect();

// instantiate box object
$box = new Box($db);

// box query
$result = $box -> get_box_owners();

// get row count
$num = $result -> rowCount();

// check if there are any boxes
if ($num > 0) {

	$owners_for_boxes = array();

	while ($row = $result -> fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$fullOwnerObj = array(
			"id" => $boxID,
			"boxID" => $boxID,
			"active" => $active,
			"owners" => explode("|", $owners),
			"CIFs" => explode("|", $CIFs),
			"notes" => $notes
		);

		array_push($owners_for_boxes, $fullOwnerObj);
	}


	$box_arr['data'] = $owners_for_boxes;
	echo json_encode($box_arr);


} else {
	echo json_encode(
		array("message" => "no boxes found")
	);
}
