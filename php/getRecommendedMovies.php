<?php
	   $conn = mysqli_connect('mars.cs.qc.cuny.edu','yoes9965','23299965','yoes9965');
	   if (!$conn) {
               die('Could not connect: ' . mysqli_error($conn));
	   }
	
	//username of the logged in user
	//comparison will be made based on this name
	$main_user = $_POST['user'];

	//getting all the favorite movies of the main user and creating array
	 $sql = 'SELECT FavID FROM FavList Where userName = "' . $main_user . '"';
	 $result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	 $main_user_movies = array();
	 
      while($row = mysqli_fetch_assoc($result)) {
			array_push($main_user_movies,$row['FavID']);
       
        }

	//list of all existing users. comparison will be made based on users on that list.
	 $sql = 'SELECT Username FROM Users';
	 $result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	 $users = array();
	 
      while($row = mysqli_fetch_assoc($result)) {
		  if ($row['Username'] != $main_user) {
			array_push($users,$row['Username']);
		  }
       
        }

	
	for ($i = 0; $i < sizeof($users); $i++) {
	
	 $sql = "SELECT FavID from FavList Where userName = '" . $users[$i] . "'";
	 //$sql = "SELECT FavID from FavList Where userName = 'essamyousry'";
     $result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
     $user_movie = array();


        while($row = mysqli_fetch_assoc($result)) {
			array_push($user_movie,$row['FavID']);
       
        }
		
		$similarity_count = 0;
		foreach ($main_user_movies as $j) {
			if (in_array($j,$user_movie)) $similarity_count++;
		}

		$like_main = (($similarity_count/count($main_user_movies))*100);
		$like_other = ($similarity_count/count($user_movie))*100;

		$nearest_users = array();

		if( ($like_main > 30 and $like_main < 95) and ($like_other > 30 and $like_other < 95)) {
			array_push($nearest_users, $users[$i]);
		}
	}

//Ryan

   	   $pdo = new PDO("mysql:dbname=yoes9965;host=127.0.0.1","yoes9965","23299965");


	   $rec_movies = array();
	   $rec_movies_count = array();   

	   foreach ($nearest_users as $other_user) {
	   	
	   		$query = "call spGetOtherMovies('".$other_user."','".$main_user."');";
	   		$result = $pdo->query($query);
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
