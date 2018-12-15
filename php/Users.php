<?php

$conn = mysqli_connect('mars.cs.qc.cuny.edu','yoes9965','23299965','yoes9965');


$mode = $_POST['mode'];
$f = $_POST['f'];
$l = $_POST['l'];
$e = $_POST['e'];
$u = $_POST['u'];
$p = $_POST['p'];
$pC = $_POST['pC'];
$msID = $_POST ['msID'];
$msN = $_POST ['msN'];
$msY = $_POST ['msY'];
$msO = $_POST ['msO'];
$msR = $_POST ['msR'];

switch ($mode){
	case "login":

	$login = "SELECT Username, Pass FROM Users WHERE Username = '".$u."' AND Pass = '".$p."'";
	$result = $conn->query($login);

	if ($result->num_rows > 0){

		echo "User Exists";
	}

	else{
		echo "User Doesn't Exist";
	}
	break;

	case "add":

	$add = "CALL spAddNewUser('$f', '$l', '$e', '$u', '$p');";
	$result = $conn->query($add);

	if ($result){
		echo "Sucessful";
	}

	else{
		echo "Not Successful";
	}
	break;

	case "checkUser":

	$checkUser = "SELECT Username FROM Users WHERE Username = '".$u."'";

	$result = $conn->query($checkUser);

	if ($result->num_rows > 0){

		echo "NO";
	}

	else{
		echo "Username Doesn't Exist";
	}
	break;

	case "checkEmail":

	$checkEmail = "SELECT EmailAddress FROM Users WHERE EmailAddress = '".$e."'";

	$result = $conn->query($checkEmail);

	if ($result->num_rows > 0){

		echo "NO";
	}

	else{
		echo "Email Doesn't Exist";
	}
	break;

	case "addList":

	$addList = "CALL spInsertItem('$u', '$msID', '$msN', '$msY', '$msO', '$msR');";

	$result = $conn->query($addList);

	break;

	case "getAll":

	$getAll = "CALL spGetAllItems('$u');";
	$result = $conn->query($getAll);

	$itemArray = Array();
	if ($result->num_rows > 0){
		while ($row = $result->fetch_assoc()){

			array_push($itemArray, $row);
		}

		echo json_encode($itemArray);
	}

	else{
		echo "0 results";
	}
	break;

}

$conn->close();
?>
