<?php
// called by owners_sign.php

class Signature {
	// connect to db
	private $conn;
	private $table = "signatures";

	// signature table properties
	public $signatureID;
	public $transactionID;
	public $boxID;
	public $timestamp;
	public $isOwner;
	public $CIF;
	public $name;
	public $png;

	// constructor with db
	public function __construct($db) {
		$this -> conn = $db;
	}

	// acquire previous signatures from a CIF
	public function get_signatures() {
		$query = "SELECT timestamp, CIF, name, png FROM signatures WHERE CIF = ? LIMIT 5";
		$stmt = $this -> conn -> prepare($query);

		$stmt -> bindParam(1, $this -> CIF);
		$stmt -> execute();
		return $stmt;
	}

	public function add_signature() {
		// create query
		$query = "
			INSERT INTO signatures(signatureID, transactionID, boxID, isOwner, CIF, name, png) 
			VALUES(?, ?, ?, ?, ?, ?, ?)";

		$stmt = $this -> conn -> prepare($query);
		$stmt -> bindParam(1, $this -> signatureID);
		$stmt -> bindParam(2, $this -> transactionID);
		$stmt -> bindParam(3, $this -> boxID);
		$stmt -> bindParam(4, $this -> isOwner);
		$stmt -> bindParam(5, $this -> CIF);
		$stmt -> bindParam(6, $this -> name);
		$stmt -> bindParam(7, $this -> png);

		if ($stmt -> execute()) {
			return true;
		}

		printf("\nError: %s\n", $stmt -> error);

		return false;
	}

}
