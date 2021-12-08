<?php
// called by TransactionView.js

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include_once "../config/Database.php";
include_once "../models/Signature.php";

// instantiate db & connect
$database = new Database();
$db = $database -> connect();

// instantiate transaction object
$signature = new Signature($db);

// get raw posted data
$data = json_decode(file_get_contents("php://input"));

$signature -> signatureID = $data -> signatureID;
$signature -> transactionID = $data -> transactionID;
$signature -> boxID = $data -> boxID;
$signature -> isOwner = $data -> isOwner;
$signature -> CIF = (int) $data -> CIF;
$signature -> name = $data -> name;
$signature -> png = $data -> png;

// create transaction
if ($signature -> add_signature()) {
	echo json_encode(
		array("message" => "signature added")
	);
} else {
	echo json_encode(
		array("message" => "signature failed")
	);
}
