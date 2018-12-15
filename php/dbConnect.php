<?php
	$servername = "localhost";
	$username = "yoes9965";
	$password = "23299965";
	$dbname = "yoes9965";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	echo "Successful connection to MySQL Database.";

	$conn->close();
?>