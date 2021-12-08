<?php
// made earlier for testing, most likely doesn't work anymore

class Owner {
	// db stuff
	private $conn;
	private $table = "owner";

	// box properties
	public $idowner;
	public $name;

	// constructor with db
	public function __construct($db) {
		$this -> conn = $db;
	}

	// get Boxes & owners
	public function search_owners_by_name() {
		// create query
		$query = "
			SELECT idbox, idowner, name, signaturelink FROM owner
			LEFT JOIN box_owner bo ON owner.idowner = bo.ownerid
			LEFT JOIN box b ON bo.boxid = b.idbox
			LEFT JOIN signatures s on owner.idowner = s.ownerid
			WHERE name LIKE ?";

		$stmt = $this -> conn -> prepare($query);

		$likeName = '%' . $this -> name . '%';

		$stmt -> bindParam(1, $likeName);
		$stmt -> execute();
		return $stmt;
	}
}
