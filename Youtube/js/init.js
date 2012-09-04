/*
//Song and Playlist Variables
var currentPlaylistArray = [];
var playlistArray = [];
var playlistInfoArray = [];

//State Variables
var ytPlayerState;
var currentUser;
var rendered = false;
var notificationsEnabled = false;
var playlistCount;

//Object Variables
var List;
var playlistList;

//The closing message asking you if you want to save or not
function closeIt()
{
  return "Do you wish to leave the page? Any unsaved changes will not be preserved.";
}
window.onbeforeunload = closeIt;

function asyncForEach(array, fn, callback) {
  array = array.slice(0);
  function processOne() {
    var item = array.pop();
    fn(item, function(result) {
        if(array.length > 0) {
          setTimeout(processOne, 0); // schedule immediately
        } else {
          callback(); // Done!
        }
      });
  }
  if(array.length > 0) {
    setTimeout(processOne, 0); // schedule immediately
  } else {
    callback(); // Done!
  }
};

	$(document).ready(function(){
		List = document.getElementById("list");
		playlistList = document.getElementById("playlistList");
		junkdrawer.restoreListOrder("list");
		dragsort.makeListSortable(List,
				saveOrder);
				currentUser = prompt("Enter your username");
				
				
		//load();
		LoadPlaylists(currentUser, function()
		{
			
			//Init on desktop notifications
			$("#notificationBox").click(function() {
   			notificationsEnabled = !notificationsEnabled;
		});
		
		document.getElementById("currentPlayingLabel").innerHTML = currentPlayingId;

		}
		);
	});*/