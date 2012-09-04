<?php
  $NAME = $_POST['name'];
  $PLAYLISTS = $_POST['playlists'];

   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_youtubeplaylist");
	 mysql_query("UPDATE `Users` SET Playlists='$PLAYLISTS' WHERE Name =  '$NAME'");   
		
	mysql_close($db); 
?>
