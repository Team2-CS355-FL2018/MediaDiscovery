<?php

$conn = mysqli_connect('mars.cs.qc.cuny.edu','yoes9965','23299965','yoes9965');




	for($i = 0; $i < 200; $i++){


		$f = generateRandomString();
		$l = generateRandomString();
		$e = generateRandomString()."@gmail.com";
		$u = generateRandomString();
		$p = "a";

		$add = "CALL spAddNewUser('$f', '$l', '$e', '$u', '$p');";
		$result = $conn->query($add);

	}

	$getAll = "CALL spGetAllItems('$u');";
	$result = $conn->query($getAll);

	foreach($result as $u){}

		 
		$msID = rand(0,)
		$msN = "Random Movie";
		$msY = 1993;
		$msO = "null";
		$msR = rand(0, 10);







		$addList = "CALL spInsertItem('$u', '$msID', '$msN', '$msY', '$msO', '$msR');";

		$result = $conn->query($addList);
	}


$conn->close();


function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>
