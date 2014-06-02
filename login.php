<?php
 	session_start();

 	$_POST = json_decode(file_get_contents('php://input'), true);

	$con = mysql_connect("localhost","root","");	
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("quiz", $con);

	$pwd = $_POST["password"];
	
	$result1 = mysql_query("SELECT * FROM users WHERE email='" . $_POST["email"] . "' and password = '". $pwd."'");
	$row1  = mysql_fetch_array($result1);
	
	if (is_array($row1)) {	
    	$_SESSION["email"] = $row1['email'];
    	echo 'true';   		
    } else {
	    echo 'false';
	}

?>