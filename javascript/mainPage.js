 //-----DEBUG-----

	    console.log(sessionStorage.getItem("username"));

	    //-----DEBUG-----

	    var myData;
	    var movieFields = ["title", "release_date", "overview", "id"];
	    var showFields = ["name", "first_air_date", "overview", "id"];
	    //var actFields = ["name, "known_for", "id"];
	    var table = document.getElementById("myTable");

	    var pickedNumber;
	    var Type;
	    var itemID;

	    var span = document.getElementsByClassName("close")[0];
	    span.onclick = function(){
		closeModal();
	    }
	
	    function getSelectedOption(){
		var selector = document.getElementById('selectIDs');
    		var value = selector[selector.selectedIndex].value;

		return value;
	    }
	
	    function emptyTable(){
	    	table.innerHTML = "";
	    }
	
	    function openModal(){
		document.getElementById("modal-name").style.display = "block";
	    }
	
	    function closeModal(){
		emptyTable();
		//clearDiv();
		document.getElementById("modal-name").style.display = "none";
	    }
	
	    function clearDiv(){
		document.getElementById("act").innerHTML = "";
	    }

	    function processRequest(){
		var selectedOption = getSelectedOption();
		var searchInput = document.getElementById("search").value;
		
		if (selectedOption == "Movie"){
		    requestMovie(searchInput);
		    mode = "Movie";
		    document.getElementById("myText").innerHTML = 'Movies';
		}
		if (selectedOption == "Show"){
		    requestShow(searchInput);
		    mode = "Show";
		    document.getElementById("myText").innerHTML = 'Shows';
		}
		if (selectedOption == "Actor/Actress"){
		    requestAct(searchInput);
		    mode = "Act";
		}

		openModal();
		displayData(mode);
		document.getElementById("search").value = "";
		
	    }


	    function displayMovies(){

		var limit;
		Type = "Movies";
		if (myData.total_results > 10) limit = 10;
		else limit = myData.total_results;
			
	  	for (var r = 0; r < limit; r++){
		    var row = document.createElement("tr");
		    row.id = "row" + r;
		    
		    var img = document.createElement('img');
		    
		    if (myData.results[r].poster_path != null)
		    	img.src = "https://image.tmdb.org/t/p/w92" + myData.results[r].poster_path;
		
		    else img.src = "resources/None.png";

		    row.appendChild(img);
		
		    for (var c = 0; c < 3; c++){
		
		        var cell = document.createElement("td");
			if (c == 1){
	 	             var textNode = document.createTextNode(myData.results[r][movieFields[c]].substring(0,4));
			}
			else if (c == 2){
			    cell.style.textAlign = "left";
			    cell.style.padding = "0px 15px 0px 15px";
			    var textNode = document.createTextNode(myData.results[r][movieFields[c]].substring(0,150) + "...");
			
			}
			else {
			    var textNode = document.createTextNode(myData.results[r][movieFields[c]]);
			}	
		        cell.appendChild(textNode);
		        row.appendChild(cell);
	    	    }
		
		    var button2 = document.createElement("INPUT");

		    button2.type = "button";
		    button2.className = "button2";
		    button2.style.marginTop = "50px";
		    button2.id = "rate" + r;
		    button2.style.width = "100%";
		    button2.value = "Add To List";

		    button2.onclick = function(){
			handleRating(this.id);
			itemID = this.id;
	    	    }

		    row.appendChild(button2);

		    table.appendChild(row);
	        }
		console.log(table.rows.length);
	    }

	    function displayShows(){

		var limit;
		Type = "Shows";
		if (myData.total_results > 10) limit = 10;
		else limit = myData.total_results;

		for (var r = 0; r < limit; r++){
		    var row = document.createElement("tr");
		    row.id = "row" + r;
		    
		    var img = document.createElement('img');

		    if (myData.results[r].poster_path != null)
		    	img.src = "https://image.tmdb.org/t/p/w92" + myData.results[r].poster_path;
		
		    else img.src = "None.png";

		    row.appendChild(img);
		
		    for (var c = 0; c < 3; c++){
		
		        var cell = document.createElement("td");
	 	        if (c == 1){
	 	             var textNode = document.createTextNode(myData.results[r][showFields[c]].substring(0,4));
			}
			else if (c == 2){
			    cell.style.textAlign = "left";
			    cell.style.padding = "0px 15px 0px 15px";
			    var textNode = document.createTextNode(myData.results[r][showFields[c]].substring(0,150) + "...");
			
			}
			else {
			    var textNode = document.createTextNode(myData.results[r][showFields[c]]);
			}
		        
			cell.appendChild(textNode);
		        row.appendChild(cell);
	    	    }
		    
		    var button2 = document.createElement("INPUT");
		    button2.type = "button";
		    button2.style.marginTop = "50px";
		    button2.style.width = "100%";
		    button2.value = "Add To List";
		    button2.id = "rate" + r;
		    button2.onclick = function(){
			handleRating(this.id);
			itemID = this.id;
	    	    }

		    row.appendChild(button2);

		    table.appendChild(row);

	        }

	    }
	
	    function displayAct(){
		
		table.style.border = "0";
		table.style.borderCollapse = "collapse";
		
		var row = document.createElement("tr");

		document.getElementById("myText").innerHTML = myData.results[0].name;
		    
		var img = document.createElement('img');

		if (myData.results[0].profile_path != null){
		    	img.src = "https://image.tmdb.org/t/p/w185" + myData.results[0].profile_path;
		}
		else img.src = "resources/None2.png";

		row.appendChild(img);
		table.appendChild(row);

		var row = document.createElement("tr");
		var textNode = document.createTextNode("\n Known For \n");

		var span = document.createElement('span');
		span.style.fontSize = "20px";
		span.appendChild(textNode);

		row.appendChild(span);
		table.appendChild(row);
	
		var row = document.createElement("tr");
		for (var c = 0; c < myData.results[0].known_for.length; c++){
		
		    var lineBreak = document.createElement("br");
		    var cell = document.createElement("td");
		    cell.style.columnWidth = "215";
		    if (myData.results[0].known_for[c].media_type == "movie"){
	 	    	var textNode = document.createTextNode(myData.results[0].known_for[c].title);
		    }
		    else {
			var textNode = document.createTextNode(myData.results[0].known_for[c].name);
		    }
		    var image = document.createElement('img');
			image.src = "https://image.tmdb.org/t/p/w154" + myData.results[0].known_for[c].poster_path;
		    cell.appendChild(textNode);
		    cell.appendChild(lineBreak);
		    cell.appendChild(image);
		    row.appendChild(cell);

		    var cell = document.createElement("td");
	    	}
		table.appendChild(row);
	    }

	    function displayData(mode){
		switch (mode){
		    case "Movie":
			displayMovies();
			break;
		    
		    case "Show":
			displayShows();
			break;
		
		    case "Act":
			displayAct();
			break;
		}
	    }

	    function requestMovie(searchInput){
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
			var myArray = this.responseText;

			myData = JSON.parse(myArray);
		    }
		};

		xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US&sort_by=popularity.desc&query=" + searchInput, false);
		xhttp.send();
	    }

	    function requestShow(searchInput){
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
			var myArray = this.responseText;

			myData = JSON.parse(myArray);
		    }
		};

		xhttp.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US&sort_by=popularity.desc&query=" + searchInput, false);
		xhttp.send();
	    }

	    function requestAct(searchInput){
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
			var myArray = this.responseText;

			myData = JSON.parse(myArray);
		    }
		};

		xhttp.open("GET", "https://api.themoviedb.org/3/search/person?api_key=dd22d79895a99a359091ab7ceb24287d&language=en-US&query=" + searchInput + "&page=1&include_adult=false", false);
		xhttp.send();
	    }
	
	    function addToList(userName, msID, msName, msYear, msOverview, msRating){
		
		mode = "addList";

		var xhttp = new XMLHttpRequest();
		var url = "Users.php";
		var params = "mode=" + mode + "&u=" + userName + "&msID=" + msID + "&msN=" + msName + "&msY=" + msYear + "&msO=" + msOverview + "&msR=" + msRating;
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
			
		    }
		};

		xhttp.open("POST", url, false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    	xhttp.send(params);

	    }

	    function handleCheckedRating(id){
		var button = document.getElementById(id);

		pickedNumber = id.substring(2,3);

		var otherIDs = id.substring(0, 2);
		for (var i = 0; i <= pickedNumber; i++){
		    document.getElementById(otherIDs + i).style.backgroundColor = "yellow";
		}
	    }

	    function handleRating(id){

		var rowNumber = id.substring(4, 5);
		var row = document.getElementById("row" + rowNumber);

		var clickedButton = document.getElementById(id);
		clickedButton.id = "clicked" + rowNumber;

		row.removeChild(clickedButton);

		for (var i = 0; i < 10; i++){
		    var button = document.createElement("INPUT");
		    button.id = "b" + rowNumber + i;
		    button.className = "ratings";
		    button.type = "button";
		    button.style.marginTop = "50px";
		    button.value = i + 1;
		    button.style.backgroundColor = "white";
		    row.append(button);

		    button.onclick = function(){
			var otherIDs = button.id.substring(0, 2);
			for (var i = 0; i < 10; i++){
		    	    document.getElementById(otherIDs + i).style.backgroundColor = "white";
			}
	
		    	handleCheckedRating(this.id);
		    }
		}


		var buttonID = document.getElementById("sb" + rowNumber);

		if (buttonID == null){ 
		    var submitButton = document.createElement("INPUT");
		    submitButton.id = "sb" + rowNumber;
		    submitButton.className = "submit";
		    submitButton.type = "button";
		    submitButton.value = "Submit";

		    row.appendChild(submitButton);

		    var cancelButton = document.createElement("INPUT");
		    cancelButton.id = "cb" + rowNumber;
		    cancelButton.className = "cancel";
		    cancelButton.type = "button";
		    cancelButton.value = "Cancel";

		    row.appendChild(cancelButton);
		}

		submitButton.onclick = function() {
		    var myID = itemID.substring(7,8);
		   
		    var userName = sessionStorage.getItem("username");
		    var msID = myData.results[myID].id;

		    var msName;
		    if (Type == "Movies")
			 msName = myData.results[myID].title;
		    else msName = myData.results[myID].name;
		    
		    if (Type == "Movies")
			 msYear = myData.results[myID].release_date;
		    else msYear = myData.results[myID].first_air_date;

		    var msOverview = myData.results[myID].overview;
		    var msRating = Number(pickedNumber) + 1;
		    
		    addToList(userName, msID, msName, msYear, msOverview, msRating);

		    clickedButton.type = "button";
		    clickedButton.value = "Add To List";
		    clickedButton.id = "rate" + rowNumber;

		    for (var i = 0; i < 10; i++){
			row.removeChild(document.getElementById("b" + rowNumber + i));
		    }
		    row.removeChild(submitButton);
		    row.removeChild(cancelButton);
		    row.appendChild(clickedButton);
		}
	
		cancelButton.onclick = function() {
		    clickedButton.type = "button";
		    clickedButton.value = "Add To List";
		    clickedButton.id = "rate" + rowNumber;

		    for (var i = 0; i < 10; i++){
			row.removeChild(document.getElementById("b" + rowNumber + i));
		    }
		    row.removeChild(submitButton);
		    row.removeChild(cancelButton);
		    row.appendChild(clickedButton);
		}
	
	   }

