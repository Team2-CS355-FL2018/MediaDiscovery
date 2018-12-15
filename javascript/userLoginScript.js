     var isUser;
	     function testCheck(){
		
		var user = document.getElementById("username").value;
	     	var pass = document.getElementById("pass").value;
		
		checkCredentials(user, pass);
		if (isUser == true){
		    window.location.href = "mainPage.html";
		    sessionStorage.setItem("username", user);
		    sessionStorage.setItem("password", pass);
	     	}
	     	if (isUser == false) {
		    alert("User Credentials are Incorrect!");
	     	}
		emptyFields();
	     }
	     function emptyFields(){
		document.getElementById("username").value = "";
		document.getElementById("pass").value = "";
	     }
	   	
	     function checkCredentials(user, pass){
		mode = "login";
		
		var xhttp = new XMLHttpRequest();
		var url = "php/Users.php";
		var params = "mode=" + mode + "&u=" + user + "&p=" + pass;
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
			var String1 = "User Exists";
			var result = String1.localeCompare(this.responseText);
			if (result == 0){
			    isUser = true;
			}
			else{
				isUser = false;
				
			} 

		    }else{
		    	console.log(this.responseText);	
		    }
		};
		xhttp.open("POST", url, false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    	xhttp.send(params);
	     }