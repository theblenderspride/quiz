<?php
 	session_start();

 	$_POST = json_decode(file_get_contents('php://input'), true);

	$con = mysql_connect("localhost","html5plu_db","q(Lld3GIOd~z");	
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("html5plu_db", $con);

	$pwd = $_POST["password"];
	
	$result1 = mysql_query("SELECT * FROM quiz_users WHERE email='" . $_POST["email"] . "' and password = '". $pwd."'");
	$row1  = mysql_fetch_array($result1);
	
	$res;


	echo '{';

	if (is_array($row1)) {	
    	$_SESSION["email"] = $row1['email'];
    	 echo '"status":"true",';
    	 echo '"email":"'. $row1['email'].'"';
    	// $res->status = 'true';	
    	// $res->email = $row1['email'];
    } else {
	  	 echo '"status":"false"';            
	}
    
    echo '}';  

?>