

  
   function ytplayer_render_player(id)
  {
		  rendered = true;
		  currentPlayingId = id;
		   UpdatePlayingLabel();
	
     swfobject.embedSWF
    (
      'http://www.youtube.com/v/' + currentPlayingId +'&enablejsapi=1&rel=0&fs=1&version=3',
      'ytplayer_div1',
      '300',
      '300',
      '10',
      null,
      null,
      {
        allowScriptAccess: 'always',
        allowFullScreen: 'true'
      },
      {
        id: 'ytplayer_object'
      }
    );
	  
  }
  
  function ytplayer_playlazy( delay )
  {
    if ( typeof ytplayer_playlazy.timeoutid != 'undefined' )
    {
      window.clearTimeout( ytplayer_playlazy.timeoutid );
    }
    ytplayer_playlazy.timeoutid = window.setTimeout( ytplayer_play, delay );
  }
  
  function ytplayer_playbyid( id)
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
      o.loadVideoById(id );
	  UpdateRelated(id);
    }
  }
  
    function ytplayer_play()
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
		o.playVideo();
    }
  } function ytplayer_pause()
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
      o.pauseVideo();
    }
  }

  function onYouTubePlayerReady( playerid )
  {
    var o = document.getElementById( 'ytplayer_object' );
    if ( o )
    {
      o.addEventListener( "onStateChange", "ytplayerOnStateChange" );
      o.addEventListener( "onError", "ytplayerOnError" );
    }
  }
  
  //Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). 
  function ytplayerOnStateChange( state )
  {
	var button = document.getElementById("playButton");  
	ytPlayerState = state;
	
	switch(state)
	{
		case -1:
			button.innerHTML = "Play";
		    break;
		case 0:
			PlayNextVideo();
			button.innerHTML = "Pause";
		    break;
		case 1:
			button.innerHTML = "Pause";
		    break;
		case 2:
			button.innerHTML = "Play";
		    break;
		case 3:
			button.innerHTML = "Play";
		    break;	
		case 5:
			button.innerHTML = "Pause";
		    break;
	}	
  }
    function RequestPermission (callback)
    {
        window.webkitNotifications.requestPermission(callback);
    }
    function notification (name)
    { 
		
        if (window.webkitNotifications.checkPermission() > 0) {
            RequestPermission(notification);
        }

        
        var title = 'Now Playing';
		var icon  = 'http://www.beakkon.com/sites/default/files/images/logo.png';
		var body = "Now Playing: " + currentPlayingName  ;
        var popup = window.webkitNotifications.createNotification(icon, title, body);
        popup.onclick = function(x){PlayNextVideo();};
		popup.show();
		
		
       	setTimeout(function(){
		popup.cancel();
		}, '2000');
	    }
	
  
  
  function PlayNextVideo()
  {
	  currentPlayingIndex++;
		currentPlayingIndex = currentPlayingIndex % currentPlaylistArray.length;
		currentPlayingId = currentPlaylistArray[currentPlayingIndex];
		currentPlayingName =$('#'+ currentPlayingId).data("videoname");
		UpdatePlayingLabel();
		ytplayer_playbyid(currentPlayingId);	
		//if(notificationsEnabled)
		
		//{
			notification(songJSONList[currentPlayingId].title);
		//}
	}
  
  function ytplayerOnError( error )
  {
    if ( error )
    {
	 console.log(error);
     PlayNextVideo();
    }
  }
	  
	  function GetVideoFeed(id, callback)
	  {
		  if(songJSONList[id])
		  {
				callback(songJSONList[id]);  
		  }else{
		  var link = "https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=jsonc";
		  $.getJSON(link,
    		function(data) {
				callback(data);
			});}
	  }
	  
function GetRelated(id, callback)
{
	var link = 	"https://gdata.youtube.com/feeds/api/videos/"+id+"/related?v=2&alt=jsonc";
	 $.getJSON(link,
    		function(data) {
				callback(data.data.items);
			});
}