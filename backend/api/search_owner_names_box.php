<?php
// not called by anything, made earlier for testing, most likely doesn't work anymore

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/Database.php";
include_once "../models/Owner.php";

require_once "../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv -> load();

// instantiate db & connect
$database = new Database($_ENV['DB_HOST'], $_ENV['DB_NAME'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);
$db = $database -> connect();

// instantiate owner object
$owner = new Owner($db);
$owner -> name = isset($_GET['name']) ? $_GET['name'] : die();

// owner query
$result = $owner -> search_owners_by_name();

// get row count
$num = $result->rowCount();

// check if there are any boxes
if ($num > 0) {

	$owners_with_boxes = array();

	while ($row = $result -> fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$fullOwnerObj = array(
			"id" => $idowner,
			"name" => $name,
			"sign" => $signaturelink
		);
		$isExists = false;
		// checking if the box id already exists
		foreach ($owners_with_boxes as $key => $item) {
			if (isset($item['boxid']) && $item['boxid'] == $idbox) {
				array_push($owners_with_boxes[$key]['names'], $name);
				array_push($owners_with_boxes[$key]['owners'], $fullOwnerObj);
				$isExists = true;
				break;
			}
		}

		if (!$isExists) {
			array_push($owners_with_boxes, array(
				'boxid' => $idbox,
				'names' => array($name),
				'owners' => array($fullOwnerObj)
			));
		}
	}

	$box_arr['data'] = $owners_with_boxes;

	echo json_encode($box_arr);
} else {
	echo json_encode(
		array('message' => 'No boxes found')
	);
}
