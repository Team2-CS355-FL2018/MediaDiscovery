window.onload = function () {

	init();
}

function init() {
	
	getMovies();	
}

function loadTable(xml) {
	
	var table = document.getElementById("table");
	if(xml != null){
		var rows = xml.getElementsByTagName("tr");
		var size = table.rows.length	

		for(var i = 1; i < size; i++){

			table.deleteRow(1);	
		}

		for (var i = 0; i < rows.length; i++) {
				
			var row = table.insertRow(table.rows.length);	
			row.innerHTML = rows[i].innerHTML;
			
		}
	}else{
		init();
	}
	
}

function getMovies(){

	var url = "getRecommendedMovies.php";
	var params = "user="+sessionStorage.getItem("username");	
	
	executeAjax(params, url);
}



function executeAjax(params, url) {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){

			var movies = JSON.parse(this.responseText);

			Object.keys(movies).forEach(function(k){
    				console.log(k + ' - ' + movies[k]);
			});
		}
	}
	xmlhttp.send(params);	

}

function buildParams() {

	var params = "";
	var form = document.getElementById("form");	
	var inputs = getFormInputs(form);

	params += "id=" + inputs[0].id + "&";

	for ( i = 0; i < inputs.length; i++){
		
		params = params + inputs[i].getAttribute("name") + "=" + inputs[i].value + "&";
	}

	return params.substring(0, params.length - 1);

}

function selectAll(select_all_button){

	toggle = document.getElementById("select_all_checkbox").checked;
	checkboxes = document.getElementsByClassName("checkbox");

		for (var i = 0; i < checkboxes.length; i++){
			checkboxes[i].checked = toggle;

		}

}

