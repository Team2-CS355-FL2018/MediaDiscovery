window.onload = function () {

	init();
}

function init() {
	
	getMovies();	
}

function loadTable(movies) {
	
	var table = document.getElementById("table");


		Object.keys(movies).forEach(function(k){
			
			var row = table.insertRow(table.rows.length);	
			row.innerHTML = movies[k];
		});		

	
}

function getMovies(){

	var url = "php/getRecommendedMovies.php";
	var params = "user=" + sessionStorage.getItem("username");	
	console.log(params);
	executeAjax(params, url);
}



function executeAjax(params, url) {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(params);	
	xmlhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){

			console.log(this.responseText);
			var movies = JSON.parse(this.responseText);
			loadTable(movies);	
			
		}else{
			console.log(this.responseText);
		}

	}

}

