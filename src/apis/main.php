<?php


	// im not entirely sure what this file does yet, maybe login? connect?
	// taken from https://www.techiediaries.com/php-react-rest-api-crud-tutorial/
	
	$host = "localhost:3306"; 
	$user = "root"; 
	$password = "Mnbvcxzaq1`"; 
	$dbname = "reactdb"; 
	//$id = ""; // idk what this does

	try {
		$con = mysqli_connect($host, $user, $password,$dbname);
	} catch(PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}

	$method = $_SERVER['REQUEST_METHOD'];
	//  $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}
	

	switch ($method) {
		case 'GET':
			$id = $_GET['id'];
			$sql = "select * from bruh".($id?" where id=$id":'');
		break;
		case 'POST':
			$boxID = $_POST["boxID"];
			$active = $_POST["active"];
			$owners = $_POST["owners"];
			$CIFs = $_POST["CIFs"];
			$notes = $_POST["notes"];

			$sql = "insert into bruh (boxID, active, owners, CIFs, notes) values ('$boxID', '$active', '$owners', '$CIFs', '$notes')"; 
		break;
	}

	// run SQL statement
	$result = mysqli_query($con, $sql);

	// die if SQL statement failed
	if (!$result) {
		http_response_code(404);
		die(mysqli_error($con));
	}

	if ($method == 'GET') {
		if (!$id) echo '[';
		for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
			echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
		}
		if (!$id) echo ']';
	} elseif ($method == 'POST') {
		echo json_encode($result);
	} else {
		echo mysqli_affected_rows($con);
	}

	$con->close();
 ?>