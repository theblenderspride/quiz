<?php
    session_start();           
    if(isset($_SESSION["email"]) && $_SESSION["email"]) {
        $expire = time() + 60 * 60 * 24 * 2; // 2 days
        setcookie("email", $_SESSION["email"], $expire);
    } else {
        setcookie('email', '', time() - 3600);  
    }
?> 

<!doctype html>
<html lang="en" ng-app="quizApp">
<head>
    <meta charset="utf-8">
    <title>Quiz</title>
    <link rel="stylesheet" href="css/app.css">

    <script src="lib/angular.js"></script>
    <script src="lib/angular-route.js"></script>           
    <script src="js/app.js"></script>    
    <script src="js/services.js"></script>    
    <script src="js/controllers.js"></script>
   
</head>
<body>

  <div class="main-view">
    <div ng-view></div>
  </div>

</body>
</html>
