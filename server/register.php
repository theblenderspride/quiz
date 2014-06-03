<?php
 	session_start();

 	$_POST = json_decode(file_get_contents('php://input'), true);

	$con = mysql_connect("localhost","html5plu_db","q(Lld3GIOd~z");	
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("html5plu_db", $con);

    $email = $_POST["email"];
	$password = $_POST["password"];
	
	if(mysql_query("INSERT INTO quiz_users (email, password) VALUES('" . $email . "', '". $password."')")) {
		echo "true";
	} else  {
		echo "false";
	}

	mysql_close($con);
?>