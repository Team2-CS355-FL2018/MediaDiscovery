	var check;
	var isUserUnique;
	var isEmailUnique;
	var fields = ["firstName", "lastName", "emailaddress", "username", "pass", "Confirmation"];
	
	function createAccount(){
	     check = true;

	     var test = checkEmptyStrings();
	
	     var firstName = document.getElementById("firstName").value;
	     var lastName = document.getElementById("lastName").value;
	     var emailAddress = document.getElementById("emailaddress").value;
	     var username = document.getElementById("username").value;
	     var password = document.getElementById("pass").value;
	     var passwordC = document.getElementById("Confirmation").value;

	     checkUserNameUniqueness(username);
	     checkEmailUniqueness(emailAddress);
	
	     if (password != passwordC){
		alert("Passwords don't match");
		emptyPasswords();
		check = false;
	     }
	     if (isUserUnique == false){
		alert("Username Already Exists");
		document.getElementById("username").value = "";
		check = false;
		emptyPasswords();
	     }

	     if (isEmailUnique == false){
		alert("Email Already Exists");
		document.getElementById("emailaddress").value = "";
		check = false;
		emptyPasswords();
	     }

	     if (test == false){
		alert("Please Fill Out All Fields");
		emptyPasswords();
		check = false;
	     }

	     if (check == true) {
		sessionStorage.setItem("username", username);
	     	addAccount(firstName, lastName, emailAddress, username, password, passwordC);
		alert("Account Created Successfully!");
	     }
	}

	function checkUserNameUniqueness(username){
	    mode = "checkUser";

	    var xhttp = new XMLHttpRequest();
	    var url = "php/Users.php";
	    var params = "mode=" + mode + "&u=" + username;

	    xhttp.onreadystatechange = function() {
	     	if (this.readyState == 4 && this.status == 200){
		     var String1 = "NO";

			var result = String1.localeCompare(this.responseText);
			console.log(result);
			if (result == 0){
			    isUserUnique = false;
			}
			else isUserUnique = true;
	        }
	    };

	    xhttp.open("POST", url, false);
	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhttp.send(params);
	}

	function checkEmailUniqueness(emailAddress){
	    mode = "checkEmail";

	    var xhttp = new XMLHttpRequest();
	    var url = "php/Users.php";
	    var params = "mode=" + mode + "&e=" + emailAddress;

	    xhttp.onreadystatechange = function() {
	     	if (this.readyState == 4 && this.status == 200){
		     var String1 = "NO";

			var result = String1.localeCompare(this.responseText);
			if (result == 0){
			    isEmailUnique = false;
			}
			else isEmailUnique = true;
	        }
	    };

	    xhttp.open("POST", url, false);
	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhttp.send(params);
	}

	function emptyPasswords(){
	     document.getElementById("pass").value = "";
	     document.getElementById("Confirmation").value = "";
	}

	function Check(){
	    return check;
	}

	function checkEmptyStrings(){
	     var test = true;

	     if (document.getElementById("firstName").value == "") return false;
	     if (document.getElementById("lastName").value == "") return false;
	     if (document.getElementById("emailaddress").value == "") return false;
	     if (document.getElementById("username").value == "") return false;
	     if (document.getElementById("pass").value == "") return false;;
	     if (document.getElementById("Confirmation").value == "") return false;

	     return true;
	}

	function addAccount(firstName, lastName, emailAddress, username, password, passwordC){
	    mode = "add";

	    var xhttp = new XMLHttpRequest();
	    var url = "php/Users.php";
	    var params = "mode=" + mode + "&f=" + firstName + "&l=" + lastName + "&e=" + emailAddress + "&u=" + username + "&p=" + password + "&pC" + passwordC;

	    xhttp.onreadystatechange = function() {
	     	if (this.readyState == 4 && this.status == 200){
		     //Do Nothing
	        }
	    };

	    xhttp.open("POST", url, false);
	    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhttp.send(params);   

	}