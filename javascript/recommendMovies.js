var movieRecommendations = [];
var topMovieDetails = [];


window.onload = function () {

	getMovies();
}



function loadTable() {
	
	

	for(var i = 0; i < topMovieDetails.results.length ; i++){
		

		movieRecommendations.push(topMovieDetails.results[i]);
	}

	var table = document.getElementById("table");
			
	for(var i = 0; i < movieRecommendations.length; i++) {
		
		if(i%3 === 0)
		 	var row = table.insertRow(table.rows.length);	

		 var td = document.createElement('td');
		 var tdHead = document.createElement('div');
		 tdHead.className = "tdHead";
		 var title = document.createTextNode(movieRecommendations[i].title)
		 var img = document.createElement('img');
		 
		 if (movieRecommendations[i].poster_path != null)
	    	img.src = "https://image.tmdb.org/t/p/w92" + movieRecommendations[i].poster_path;
		 else img.src = "resources/None.png";
		 
		 tdHead.appendChild(title);
		 td.appendChild(tdHead);
		 td.appendChild(img);
		 
		 row.appendChild(td);
		
	}
				

	
}


function getMovies(){

	var url = "php/getRecommendedMovies.php";
	var params = "user=" + sessionStorage.getItem("username");	

	getRecommendations(params, url);
}

function requestMovieData(movieID){
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
				movieRecommendations.push(JSON.parse(this.responseText));
			
				
		    }
		};
		xhttp.open("GET", " https://api.themoviedb.org/3/movie/"+movieID+"?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US", false);
		xhttp.send();
}

function requestRecommendedMovies(movieID){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200){
			topMovieDetails = JSON.parse(this.responseText);
			console.log(topMovieDetails);
	    }
	};
	xhttp.open("GET", "https://api.themoviedb.org/3/movie/"+movieID+"/recommendations?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US&page=1", false);
	xhttp.send();
}



function requestTopRatedMovies(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
				topMovieDetails = JSON.parse(this.responseText);
				console.log(topMovieDetails);
		    }
		};
		xhttp.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US&page=1", false);
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
		
			if(movies.length <= 0){	
				requestTopRatedMovies();

			}
			else{
				Object.keys(movies).forEach(function(movie){
					requestMovieData(movie);
				});		
				requestRecommendedMovies(movies[Math.floor(Math.random()*movies.length - 1)]);

			}
			
			loadTable();
			
		}else{
			console.log(this.responseText);
		}

	}

}

