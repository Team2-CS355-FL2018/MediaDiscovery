var movieDetails = [];

window.onload = function () {

	getMovies();
}



function loadTable() {
	console.log(movieDetails);
	
	var table = document.getElementById("table");
			
	for(var i = 0; i < movieDetails.length; i++) {
		if(i%3 === 0)
		 	var row = table.insertRow(table.rows.length);	

		 var td = document.createElement('td');
		 var img = document.createElement('img');
		 
		 if (movieDetails[i].poster_path != null)
	    	img.src = "https://image.tmdb.org/t/p/w92" + movieDetails[i].poster_path;
		 else img.src = "resources/None.png";
		 
		 td.appendChild(img);
		 
		 row.appendChild(td);
		
	}
				

	
}

function getMovies(){

	var url = "php/getRecommendedMovies.php";
	var params = "user=" + sessionStorage.getItem("username");	
	console.log(params);
	getRecommendations(params, url);
}

function requestMovieData(movieID){
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
				movieDetails.push(JSON.parse(this.responseText));
				console.log(JSON.parse(this.responseText));
				
		    }
		};
		xhttp.open("GET", " https://api.themoviedb.org/3/movie/"+movieID+"?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US", false);
		xhttp.send();
}

function getRecommendations(params, url) {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(params);	
	xmlhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){

			console.log(this.responseText);
			var movies = JSON.parse(this.responseText);
			Object.keys(movies).forEach(function(movie){
				requestMovieData(movie);
			});		
			loadTable();
			
		}else{
			console.log(this.responseText);
		}

	}

}

