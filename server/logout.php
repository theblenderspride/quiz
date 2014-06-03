<?php
	session_start(); 
	setcookie('email', '', time()-300);  	
	session_destroy();
?>

