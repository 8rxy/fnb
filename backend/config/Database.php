<?php

class Database {
	/*
DB_HOST=localhost
DB_NAME=fnb
DB_USERNAME=root
DB_PASSWORD=test
	*/



	// db parameters
	private $host;
	private $db_name;
	private $username;
	private $password;
	private $conn; // represents connections
	
	public function __construct() {
		$this -> host = "localhost";
		$this -> db_name = $db_name = "fnb";
		$this -> username = $username = "root";
		$this -> password = $password = "test";
	}

	// db connect
	public function connect() {
		$this -> conn = null;
		try {
			// PDO_MYSQL Data Source Name: type, host, db name, user, pass
			$this -> conn = new PDO(
				"mysql:host=" . $this -> host . ";dbname=" . $this -> db_name,
				$this -> username,
				$this -> password	
			);
			$this -> conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			echo "Connection Error: " . $e ->  getMessage();
		}
		return $this -> conn;
	}
}
