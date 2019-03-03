<?php include "../inc/dbinfo.inc"; ?>
<html>
    <head>
        <meta charset="utf-8">
        <title>Topic 4: AJAX</title>
        <link href="../css/style.css" type="text/css" rel="stylesheet">
        <script src="../js/topic_01.js" type="text/javascript"></script>
    </head>
    <body>

<?php
$conn  = sqlsrv_connect(DB_SERVER, DB_CONNINFO);

if ($conn ) {
    echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>


        <div class="header">
            <h1>CIT 261: Mobile Application Development - AJAX</h1>
        </div>

        <div class="navigation">
            <a href="../index.html">Home</a> |
            <a href="topic_03.html">Previous</a> |
            <a href="topic_05.html">Next</a>
        </div>

        <div class="main">
            <h3>Requesting a JSON file</h3>
        </div>

        <div class="footer">
            <hr>
            <p>Alex Kearns<br>&copy; Copyright 2019<br>CIT 261<br>BYU-I</p>
            <hr>
        </div>
    </body>
</html>

<?php

/* Add an employee to the table. */
function AddEmployee($connection, $name, $address) {
   $n = mysqli_real_escape_string($connection, $name);
   $a = mysqli_real_escape_string($connection, $address);

   $query = "INSERT INTO `Employees` (`Name`, `Address`) VALUES ('$n', '$a');";

   if(!mysqli_query($connection, $query)) echo("<p>Error adding employee data.</p>");
}

/* Check whether the table exists and, if not, create it. */
function VerifyEmployeesTable($connection, $dbName) {
  if(!TableExists("Employees", $connection, $dbName)) 
  { 
     /*$query = "CREATE TABLE `Employees` (
         `ID` int(11) NOT NULL AUTO_INCREMENT,
         `Name` varchar(45) DEFAULT NULL,
         `Address` varchar(90) DEFAULT NULL,
         PRIMARY KEY (`ID`),
         UNIQUE KEY `ID_UNIQUE` (`ID`)
       ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

     if(!mysqli_query($connection, $query)) echo("<p>Error creating table.</p>");*/
  }
}

/* Check for the existence of a table. */
function TableExists($tableName, $connection, $dbName) {
  $t = mysqli_real_escape_string($connection, $tableName);
  $d = mysqli_real_escape_string($connection, $dbName);

  $checktable = mysqli_query($connection, 
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$t' AND TABLE_SCHEMA = '$d'");

  if(mysqli_num_rows($checktable) > 0) return true;

  return false;
}
?>