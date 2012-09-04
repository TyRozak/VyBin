<?php
  $NAME = $_POST['name'];

   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_youtubeplaylist");
	$queryString = "SELECT * FROM `Playlists`";
	 $query = mysql_query($queryString ); 

    echo mysql_num_rows($query);
	mysql_close($db); 
?>
