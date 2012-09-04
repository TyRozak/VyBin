<?php
  /*$PLAYLISTS = $_POST["playlists"];
  $LINKS = $_POST['links'];
  
 // echo "Playlists: ". $PLAYLISTS;
  //echo "Links: ". $LINKS;
 
  $playlists = explode(";", $PLAYLISTS);
  $links = explode("?",$LINKS);
  $links  = array_reverse($links);
  $querystring = "";
  
   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
    mysql_select_db("tyrozakc_youtubeplaylist");
  
 // $link = mysqli_connect("localhost", "tyrozakc_admin", "Admin1@", "tyrozakc_youtubeplaylist");

/* check connection 
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
   
  $count = count($playlists);
  
 // echo "Count: ".  count($playlists) . "\n";
  for ($i = 1; $i <$count ; $i++) {
	 // echo "Links[i] = ". $links[$i]. "\n";
	  $link = explode("|", $links[$i]);
	  $name = $link[0];
	  $songs = $link[1];
	  $play = $playlists[($count - $i)-1];
	  
	 // echo "Playlist to Insert: \n";
	  //echo "NAME: " . $name. "\n" . "LINKS: ". $songs . "\n" ."INTO PLAYLIST:" . $play . "\n";
	  
    $querystring = $querystring .  "REPLACE INTO Playlists (Id, Name, Links) VALUES('$play', '$name', '$songs');";
}
echo $querystring;

	mysql_query($queryString ); 
	//mysqli_multi_query($link, $querystring);
		
	mysql_close($db); 
	//mysqli_close($link);*/
	
	$PLAYLISTS = $_POST["playlists"];
  $LINKS = $_POST['links'];
 // echo "LINKS: ".$LINKS;
  
 // echo "Playlists: ". $PLAYLISTS;
  //echo "Links: ". $LINKS;
 
 // $playlists = explode(";", $PLAYLISTS);
 // $links = explode("?",$LINKS);
  //$links  = array_reverse($links);
  $querystring = "";
  
   $db =  mysql_connect("localhost", "tyrozakc_admin", "Admin1@");
   if (!$db)
  {
  die('Could not connect: ' . mysql_error());
  }
    mysql_select_db("tyrozakc_youtubeplaylist", $db);
  
 // $link = mysqli_connect("localhost", "tyrozakc_admin", "Admin1@", "tyrozakc_youtubeplaylist");

/* check connection 
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}*/
   
 // $count = count($playlists);
  
 // echo "Count: ".  count($playlists) . "\n";
 // for ($i = 1; $i <$count ; $i++) {
	 // echo "Links[i] = ". $links[$i]. "\n";
	  $link = explode("|", $LINKS);
	//  echo "Link[0]: ". $link[0];
	  $name = $link[0];
	//  echo "Link[1]: ". $link[1];
	  $songs = $link[1];
	//  echo "Playlists: " . $PLAYLISTS;
	  $play = $PLAYLISTS;
	  
	 // echo "Playlist to Insert: \n";
	  //echo "NAME: " . $name. "\n" . "LINKS: ". $songs . "\n" ."INTO PLAYLIST:" . $play . "\n";
	  
    $querystring = "REPLACE INTO Playlists (Id, Name, Links) VALUES('$play', '$name', '$songs');";
//}
echo $querystring;

	mysql_query($querystring , $db); 
	//mysqli_multi_query($link, $querystring);
		
	mysql_close($db); 
	//mysqli_close($link);
?>
