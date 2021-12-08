<?php
// called by CompareSigns.js


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/Database.php";
include_once "../models/Signature.php";


// instantiate db & connect
$database = new Database();
$db = $database -> connect();

// instantiate box object
$signs = new Signature($db);

if (isset($_GET['id'])) {
	$signs -> CIF = $_GET['id'];
} else  {
	echo "error: no CIF value set";
	die();
}

// box query
$result = $signs -> get_signatures();

// get row count
$num = $result -> rowCount();

// check if there are any boxes
if ($num > 0) {
	$signatureObj = array();
	//timestamp, CIF, name, png FROM signatures WHERE CIF = ?";

	while ($row = $result -> fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		array_push($signatureObj, $row);
	}

	$sign_arr['data'] = $signatureObj;
	echo json_encode($sign_arr);
} else {
	echo json_encode(
		array("message" => "no signatures for owner")
	);
}
