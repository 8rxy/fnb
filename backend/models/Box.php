<?php
// called by owners_all.php & owners_for_single_box.php

class Box {
	// connect to db
	private $conn;
	private $table = "boxes";

	// box properties
	public $boxID;
	public $active;
	public $owners;
	public $CIFs;
	public $notes;

	// constructor with db
	public function __construct($db) {
		$this -> conn = $db;
	}

	// get boxes & owners
	public function get_box_owners() {
		// create query
		$query = "
			SELECT boxID, active, owners, CIFs, notes
			FROM boxes
			WHERE active = 1";

		$stmt = $this -> conn -> prepare($query);
		$stmt -> execute();
		return $stmt;
	}

	public function get_owners_for_box() {
		$query = "
			SELECT boxID, active, owners, CIFs, notes
			FROM boxes
			WHERE boxid = ?";

		$stmt = $this -> conn -> prepare($query);
		$stmt -> bindParam(1, $this -> boxID);
		$stmt -> execute();
		return $stmt;
	}
}
