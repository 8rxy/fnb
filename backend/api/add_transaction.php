<?php
// called by TransactionView.js

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../models/Transaction.php";

// instantiate db & connect
$database = new Database();
$db = $database -> connect();

// instantiate transaction object
$transaction = new Transaction($db);

// get raw posted data
$data = json_decode(file_get_contents("php://input"));

$transaction -> transactionID = $data -> transactionID;
$transaction -> boxID = $data -> boxID;
$transaction -> employee = $data -> employee;
$transaction -> presentOwners = $data -> presentOwners;
$transaction -> CIFs = $data -> CIFs;
$transaction -> presentGuests = $data -> presentGuests;
$transaction -> approved = $data -> approved;
$transaction -> notes = $data -> notes;

// create transaction
if ($transaction -> add_transaction()) {
	echo json_encode(
		array("message" => "transaction added")
	);
} else {
	echo json_encode(
		array("message" => "transaction failed")
	);
}

//echo "i was given" + $data;
