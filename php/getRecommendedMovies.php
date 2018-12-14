<?php

   	   $conn = new PDO('mysql:dbname=yoes9965;host=mars.cs.qc.cuny.edu','yoes9965','23299965');


	   $rec_movies = array();
	   $rec_movies_count = array();   

	   $nearest_users = array('ymatatov22');

	   $user = $_POST['user'];

	   foreach ($nearest_users as $other_user) {
	   	
	   		$query = "call spGetOtherMovies('".$other_user."','".$user."');";
	   		$result = $conn->query($query);
	   		while ( $row =  $result->fetch()  ) {
    				if(!empty($rec_movies[$row['FavID']]))
    					$rec_movies[$row['FavID']] =  $row['FavID'];
    				else
    					$rec_movies_count[$row['FavID']]++;
			}

	   }
	   

	   asort($rec_movies_count);

	   
	   $temp = array_keys($rec_movies_count);

	   $rec_movies = array();

	   foreach($temp as $key => $value){
	   		array_push($rec_movies, $temp[$key]);
	   }

	   echo json_encode($rec_movies);


?>
