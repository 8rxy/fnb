<?php

class Transaction {
	private $conn;

	// transaction properties
	public $transactionID;
	public $boxID;
	public $employee;
	public $presentOwners;
	public $CIFs;
	public $presentGuests;
	public $approved;
	public $notes;

	public function __construct($db) {
		$this -> conn = $db;
	}

	// post transaction
	public function add_transaction() {
		// create query
		$query = "
			INSERT INTO transactions(transactionID, boxID, employee, presentOwners, CIFs, presentGuests, approved, notes) 
			VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

		$stmt = $this -> conn -> prepare($query);
		$stmt -> bindParam(1, $this -> transactionID);
		$stmt -> bindParam(2, $this -> boxID);
		$stmt -> bindParam(3, $this -> employee);
		$stmt -> bindParam(4, $this -> presentOwners);
		$stmt -> bindParam(5, $this -> CIFs);
		$stmt -> bindParam(6, $this -> presentGuests);
		$stmt -> bindParam(7, $this -> approved);
		$stmt -> bindParam(8, $this -> notes);

		if ($stmt -> execute()) {
			return true;
		}

		printf("\nError: %s\n", $stmt -> error);

		return false;
	}
}
