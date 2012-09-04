<?php
  $NAME = $_POST['name'];

   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_youtubeplaylist");
	$queryString = "SELECT  `Playlists` 
FROM  `Users` 
WHERE Name =  '$NAME'";
	 $query = mysql_query($queryString ); 
	   
$row = mysql_fetch_row($query);

    echo $row[0];
	mysql_close($db); 
?>
