var movieRecommendations = [];
var topMovieDetails = [];
var imgOnClick = function() {

	displayRatingOptions(this);
	
};

var cancelOnClick = function(){
		
		var tdBody = this.parentElement;
		tdBody.removeChild(tdBody.childNodes[1]);
		tdBody.removeChild(tdBody.childNodes[1]);
		var img = tdBody.childNodes[0];
		img.addEventListener("click", imgOnClick); 
	};


window.onload = function (img) {

	getMovies();
}



function loadTable() {
	
	
	console.log(movieRecommendations);
	var table = document.getElementById("table");
		
	for(var i = 0; i < movieRecommendations.length; i++) {
		
		if(i%3 === 0)
		 	var row = table.insertRow(table.rows.length);	

		 var td = document.createElement('td');
		 var tdHead = document.createElement('div');
		 tdHead.className = "tdHead";
		 var title = document.createTextNode(movieRecommendations[i].title)

		 var tdBody = document.createElement('div');
		 tdBody.className ="tdBody";
		 var img = document.createElement('img');
		 img.addEventListener("click", imgOnClick); 
		 img.id = i;
		 
		 if (movieRecommendations[i].poster_path != null)
	    	img.src = "https://image.tmdb.org/t/p/w92" + movieRecommendations[i].poster_path;
		 else img.src = "resources/None.png";
		 
		 tdBody.appendChild(img);
		 tdHead.appendChild(title);
		 td.appendChild(tdHead);
		 td.appendChild(tdBody);
		 row.appendChild(td);
		
	}
				

	
}


function displayRatingOptions(img){

	img.removeEventListener("click",imgOnClick,false);

	var tdBody = img.parentElement;
	
	var like = document.createElement("button");
	var cancel = document.createElement("button");

	like.className = "likeButton";
	like.innerHTML = "Like";
	like.onclick = function() {
		
		addToList(sessionStorage.getItem('username'),this);
		location.reload();

	};

	cancel.className = "cancelButton";
	cancel.innerHTML = "Cancel";
	cancel.onclick = cancelOnClick;

	tdBody.appendChild(like);
	tdBody.appendChild(cancel);



}



function addToList(userName,likeButton){
		

	var tdBody = likeButton.parentElement;
	var img = tdBody.childNodes[0];
	console.log(movieRecommendations[img.id].id);
	var msID = movieRecommendations[img.id].id;

	mode = "addList";
	var xhttp = new XMLHttpRequest();
	var url = "php/Users.php";
	var params = "mode=" + mode + "&u=" + userName + "&msID=" + msID + "&msN=" + "msName" + "&msY=" + "msYear" + "&msO=" + "msOverview" + "&msR=" + 10;
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200){
			
	    }else{
	    	console.log(this.responseText)    ;
	    }
	};
	xhttp.open("POST", url, false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
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
/*
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

*/
function getRecommendations(params, url) {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(params);	
	xmlhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){

			console.log(JSON.parse(this.responseText));
			var movies = JSON.parse(this.responseText);
		
			
				movies.forEach(function(movie){
					requestMovieData(movie);
				});		
				

			
			loadTable();
			
		}

	}

}

