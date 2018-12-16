<?php

	 $threshold_low = 10;
	 $threshold_high = 95;

	 $conn = new PDO("mysql:dbname=yoes9965;host=127.0.0.1","yoes9965","23299965");
	
	//username of the logged in user
	//comparison will be made based on this name
	$main_user = $_POST['user'];
	
	//$_POST['user'];

	//getting all the favorite movies of the main user and creating array
	 $sql = 'SELECT FavID FROM FavList Where userName = "' . $main_user . '"';
	 $result = $conn->query($sql);
	 $main_user_movies = array();
	 
      while($row = $result->fetch()) {
			array_push($main_user_movies,$row['FavID']);
       
        }

	//list of all existing users. comparison will be made based on users on that list.
	 $sql = 'SELECT Username FROM Users';
	 $result = $conn->query($sql); 
	 $users = array();
	 
      while($row = $result->fetch()) {
		  if ($row['Username'] != $main_user) {
			array_push($users,$row['Username']);
		  }
       
        }

$nearest_users = array();
	
	for ($i = 0; $i < sizeof($users); $i++) {
	
	 $sql = "SELECT FavID from FavList Where userName = '" . $users[$i] . "'";
	 //$sql = "SELECT FavID from FavList Where userName = 'essamyousry'";
     $result = $conn->query($sql);
     $user_movie = array();


        while($row = $result->fetch()) {
			array_push($user_movie,$row['FavID']);
       
        }
		
		$similarity_count = 0;
		foreach ($main_user_movies as $j) {
			if (in_array($j,$user_movie)) $similarity_count++;
		}

		$like_main = (($similarity_count/count($main_user_movies))*100);
		$like_other = ($similarity_count/count($user_movie))*100;

		

		if( $like_main > $threshold_low) {
			array_push($nearest_users, $users[$i]);
		}
	}

//Ryan	

	   $rec_movies = array();
	   $rec_movies_count = array();   

	   foreach ($nearest_users as $other_user) {
	   	
	   		$query = "call spGetOtherMovies('".$other_user."','".$main_user."');";
	   		$result = $conn->query($query);
	   		while ( $row =  $result->fetch()  ) {
    				if(!empty($rec_movies[$row['FavID']]))
    					$rec_movies[$row['FavID']] =  $row['FavID'];
    				else
    					$rec_movies_count[$row['FavID']]++;
			}

	   }

	   
	   $temp = array_keys($rec_movies_count);

	   $rec_movies = array();
	   $usedIndexes = array();

	   foreach ($temp as $key => $value) {

	   		array_push($rec_movies, $temp[$key]);
	   }


	   echo json_encode($rec_movies);

	   $conn = NULL;


?>
