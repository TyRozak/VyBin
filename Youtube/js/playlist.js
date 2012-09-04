
function PrepareListForUsersTable()
{
		var text = "";
		for(index in playlistArray)
		{
			var item = playlistArray[index];
			if(item != ""){
			text += item;
			text += ';';}
		}
		return text;
}

function PrepareListForPlaylistsTable()
{
		var text = "";
		for(index in playlistInfoArray)
		{
			var item = playlistInfoArray[index];
			if(item != ""){
			text += item;
			text += '?';}
		}
		return text;
}

function Save()
{
	var listForUsersTable = PrepareListForUsersTable();
	var listForPlaylistsTable = PrepareListForPlaylistsTable();
		
	$.post('php/saveUsers.php', {name: currentUser, playlists: listForUsersTable}, function(){
	
	for(index in playlistArray)
	{
		var item1 = playlistArray[index];
		if(item1 == "")
			continue;
		$.post('php/savePlaylists.php', {playlists:item1,  links: playlistInfoArray[index]}, function(){
			
			  }).error(function(){
				alert('Save Error');
			  })
			  }
          }).error(function(){
            alert('Save Error');
          });
}

//Adds the playlist songs to the song list
function InitializePlaylist(playlistId, mainCallback)
{
	List.innerHTML ="";
	var songs;
	
	for(index in playlistArray)
	{
		var item = playlistArray[index];
		if(item.id == playlistId)
		{
				songs = item.songs;
		}	
	}
	
	if(songs.length >=1){
		
			asyncForEach(songs, function(songId, callback) {
				  AddToPlaylist(songId, function() { // my callback
						
						callback();
				  });
				}, 
				function() {
					//When the whole Init Playlist is done
					mainCallback();
					});}
			if(!rendered){
			ytplayer_render_player(songs[0]);	}		
}

var playlistsLoaded = 0;
function LoadPlaylists(username, callback)
{
	//Returns the amount of playlists in the DB and sets the local count so we can keep track of created playlists
	$.post('php/count.php', function(count){
		playlistCount = count
    
	//Creates the current user if does not exist, TO BE REPLACED WHEN WE GET REAL AUTHENTICATION
	//$.post('php/createuser.php', {name: username}, function(){
		
		//Loads the playlist indexes for the user
		$.post('php/loadPlaylists.php', {name: username}, function(playlists){
			 var playlistNums =playlists.split(";");
			 playlistsLoaded = playlistNums.length;
			 
			 //removes blanks
			 playlistNums = $.grep(playlistNums,function(n){
    			return(n);
			 });
			 
			 for(index2 in playlistNums)
			 {
				  playlistArray.push(new playlist(playlistNums[index2],"",""));
			 }
			 
			asyncForEach(playlistArray, 
				function(playlist, callback) 
				{
					LoadPlaylistItem(playlist.id, function()
					{ 
						callback();
					});
				}, 
					function() 
					{
							callback();
					});
			
			
          }).error(function(){
            alert('Load Error');
          })
}).error(function(){
            alert('Load Error');
          })		   ;
}

function LoadPlaylistItem(playlistId, callback)
{
	if(playlistId == "")
	{callback();}
	//Returns the playlist info of the selected id formatted: Name|Links
	$.post('php/loadPlaylistInfo.php',{id: playlistId}, function(info){
		
		//Add UI element to playlist array
		
		var name = info.split("|")[0];
		var links = info.split("|")[1];
		
		for(index in playlistArray)
		{
			var item = playlistArray[index];
			if(item.id == playlistId)
			{
				item.name = name;
				item.songs = links.split(';');	
			}	
		}
		
		if(info != "")
		{
			AddPlaylistItem(playlistId, 
				function()
				{
					callback();
				});
		}
		}).error(function(){
            alert('Error Loading One Playlist');
          });
}

function GetPlaylistName(id)
{
	for(index in playlistArray)
	{
		var item = playlistArray[index]
		if(item.id == id)
		{
			return item.name;	
		}
	}
	return false;
}

function GetPlaylistSongs(id)
{
	for(index in playlistArray)
	{
		var item = playlistArray[index]
		if(item.id == id)
		{
			return item.songs;	
		}
	}
}

function GetLinksForSave()
{
	var toReturn = "";
	for(str in currentPlaylistArray)
	{
			toReturn += currentPlaylistArray[str];
			toReturn += ";";
	}	
	return toReturn;
}

function DeleteFromPlaylist(id)
{
	var index = currentPlaylistArray.indexOf(id);
	currentPlaylistArray.splice(index,1);
	RemoveItemFromList(id);
}

function AddToPlaylist(id, callback)
{
	GetVideoInformation(id, callback);
}

function ProcessDragChange(str)
{
	var array=str.split("|");
	currentPlaylistArray = array;
}
