<?php
  $ID = $_POST['id'];

   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_youtubeplaylist");
	$queryString = "SELECT  *
FROM  `Playlists` 
WHERE Id =  $ID";
	 $query = mysql_query($queryString ); 
	   
	   while($row = mysql_fetch_array($query))
	  {
		  echo $row['Name'] . "|" . $row['Links'];
	  }

	mysql_close($db); 
?>
