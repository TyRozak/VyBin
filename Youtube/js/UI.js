
var itemsInList;
var itemToBeAdded;
var currentPlayingId;
var currentPlayingIndex= 0;

function closeLogin(n)
{
		 var d = document.getElementById('container');
  var olddiv = document.getElementById('dialog');
  d.removeChild(olddiv);
}

function CallFunctionAfter(milliseconds, callback)
{
	setTimeout(callback(), milliseconds);	
	return false;
}

function RemoveItemFromList(id)
{
	var ele = document.getElementById(id);
 if(ele.parentNode && ele.nodeType){
    ele.parentNode.removeChild(ele);
    return true;
  }else{
    return false;// not an element or no parent :(
  };	
}

function GetVideoInformation(id, callback)
{
	if(id=="")
	{callback();
	return;}
	var feed = GetVideoFeed(id,
	function(json){
			ProcessFeed(json, id, callback);
		});
}

function TruncateDesc(text, length)
{
	return text.substr(0, length) + "..." ;	
}


var templateplaylist = '<li data-videoname="{{title}}" data-name="{{id}}" style="height:100px;padding:10px ;width: 100%" id="{{id}}"  ><a class="deleteButton"></a><img src="{{source}}" style="float:left; height:61px; width:108px; padding-right: 20px;padding-top:15px"/>  <div style="margin-left:10px;margin-top:10px;"><a class="videotitle" style="padding-right:40px;">{{title}}</a><a class="videodescription">{{description}}</a><a class="videoauthor">Published on {{date}} by {{author}}</a><div> </li>';
function ProcessFeed(json, id, callback)
{

	var video = {
	id: id,
	source: "http://img.youtube.com/vi/"+ id +"/1.jpg",
    title: json.data.title,
	style: "border:solid 1px black; height:100px;",
	class: "list",
	description: TruncateDesc(json.data.description, 150),
	author: json.data.uploader,
	date: json.data.uploaded
	};

	songJSONList[id] = json;
	var html = Mustache.to_html(templateplaylist, video);
	
	List.innerHTML = html + List.innerHTML;
			dragsort.makeListSortable(List,
				saveOrder);
				
		junkdrawer.restoreListOrder("list");
		
	//document.songs 

	$('body').on('click', '#' +id +'button', function() {
       DeleteFromPlaylist(id); 
     });
	 
	 $('body').on('dblclick', '#' +id, function() {
      		currentPlayingId =$(this).data("name");
			UpdatePlayingLabel();
			ytplayer_playbyid(currentPlayingId); 
     });
	 	callback();
}

function AddSong(id)
{
	//var AddSongTextBox = document.getElementById('addSongText');
	var link =  id;
	//AddSongTextBox.value = "";
	var index = link.search("=");
	var id = link.substring(index+1, index+12);
	//currentPlaylistArray.push(id);
	playlistInfoArray[currentPlaylistIndex-1] += id+";";
	AddToPlaylist(id, function(){});
	if(!rendered)
	{
			ytplayer_render_player(id);
	}
}

function getFirstElementId()
{
	return List.childNodes[1].id;
}

var buttonFlag = true;
function PlayButtonClick()
{
	//if(currentPlaylistArray.length==0 )
	//	{	
		//	return;
		//}
		
	//var firstListId =getFirstElementId(); 
	
	//if( firstListId== currentPlayingId)
	//{
		//if(ytPlayerState == 2 )
		//{
//			ytplayer_play();
//			buttonFlag = false;
//		}
//		else if (ytPlayerState == 1 )
//		{
//			ytplayer_pause();
//			buttonFlag = true;
//		}
//	}
//	else
//	{
//		currentPlayingId = firstListId;
//		UpdatePlayingLabel();
//		ytplayer_playbyid(currentPlayingId);
//	}
}

function UpdatePlayingLabel()
{
	try{
		document.getElementById("currentPlayingLabel").innerHTML = songJSONList[currentPlayingId].data.title;}
		catch(err){}
}

function NextButtonClick()
{
		PlayNextVideo();	
}

function SaveButtonClick()
{
		LogPlaylists();
		LogSongs();
		Save();	
}

function LogPlaylists()
{

}

function LogSongs()
{

}

//var template = '<div data-index={{index}} data-name={{links}} style="background: #777;width:400px; height:100px" id="playlistObj{{index}}"  >{{id}}</div>';

var template = '<li data-name="{{name}}" data-index="{{playlistId}}" style="height:100px; wisth:100%; padding:10px" id="playlistObj{{playlistId}}"  ><a class="deleteButton"></a><img src="{{source}}" style="margin-left:10px; float:left; padding-right: 20px;padding-top:18px; height:35px; width:65px"/>  <div style="margin-top: 10px; padding-left: 50px; margin-left: 25px;"><a class="videotitle">{{name}}</a><a class="videodescription">{{numSongs}} songs</a><div> </li>';
function AddPlaylistItem(id, callback)
{
	var name = GetPlaylistName(id);
	var playNum = GetPlaylistSongs(id).length;
	var play = {
	name:name ,
	source: "/images/playlistHead.png",
	playlistId:id,
	numSongs: playNum,
	};

	var html = Mustache.to_html(template, play);
	
	playlistList.innerHTML = html + playlistList.innerHTML;
			
	 $('body').on('dblclick', '#playlistObj' +index, function() {
		var index = $(this).data("index");
		var nm = $(this).data("name");
		UpdatePlaylistName(nm);
		forwardToSongs();
		InitializePlaylist(index,function(){
			//if(currentPlaylistArray[0] == "")
			//{
				rendered = false;
			//}
			//else{
			ytplayer_playbyid(playlistArray[0].id);//}
			});
     });
	callback();
}

function forwardToSongs()
{
 	document.getElementById('songTopBar').style.display = "block";
	document.getElementById('playlistTopBar').style.display = "none";
	document.getElementById('songScroll').style.display = "block";
	document.getElementById('playlistScroll').style.display = "none";
}

function backToPlaylists()
{
	
	document.getElementById('songTopBar').style.display = "none";
	document.getElementById('playlistTopBar').style.display = "block";
	document.getElementById('songScroll').style.display = "none";
	document.getElementById('playlistScroll').style.display = "block";
}

function UpdatePlaylistName(str)
{
	document.getElementById('playlistNameLabel').innerHTML = str;	
}


function AddPlaylistClick()
{
	var name = prompt("Enter a new playlist name");
	var index = playlistsLoaded;
	playlistsLoaded++;
	playlistArray.push(new playlist(parseInt(playlistCount)+1, name, ""));
	
	AddPlaylistItem(parseInt(playlistCount)+1, function(){});
	InitializePlaylist(parseInt(playlistCount)+1, function(){});
}

var searchResults = {};
var currentSearchIndex=1;
function searchSong()
{
		
		var link = "https://gdata.youtube.com/feeds/api/videos?q="+
					document.getElementById("searchText").value+
					"&v=2&alt=jsonc&max-results=5&start-index=" + currentSearchIndex;
		  $.getJSON(link,
    		function(data) {
				searchResults = data.data.items;
				displayResults();
			});	
}


var resultstemplate = '<div data-name={{id}} style="height:100px;width:100%;margin:5px; " id="searchObj{{id}}"><img src="{{source}}" style="float:left; height:61px; width:108px; padding-right: 20px;padding-top:15px"/>  <div style="margin-left:10px;margin-top:10px;"><a class="videotitle">{{title}}</a></div> </div>';

var searchMouseHandle;
var bound = false;
function displayResults()
{
	var point = findPos(document.getElementById("searchText"));
	var newdiv = creatediv("searchPanel", "",350, 600, point[0], point[1]+30);
	
		for(index in searchResults)
		{
			
			var result = searchResults[index];
				var video = {
				id: result.id,
				title: result.title,
				desc : TruncateDesc(result.description, 50),
				source : "http://img.youtube.com/vi/"+ result.id +"/1.jpg"
				};

	var html = Mustache.to_html(relatedtemplate, video);
	
	newdiv.innerHTML = html + newdiv.innerHTML;
	
	$('body').on('dblclick', '#searchObj' +result.id, function() {
      		AddSong($(this).data("name"));
     });
	}

	newdiv.innerHTML = newdiv.innerHTML + "<a href='#' onclick='SearchNext();'>Click to see more results...</a>"
	
	document.body.appendChild(newdiv);
	if(!bound){
		bound = true;
	$('body').on('mouseleave', '#searchPanel', function() {
		try{
		console.log("Mouse Leave");
		searchMouseHandle = setTimeout(function(){
		var bod = document.getElementById('body');
		var sp = document.getElementById('searchPanel');
		if(bod != null && sp != null){
		bod.removeChild(sp);}
		
		currentSearchIndex = 1;}, 500);}
		catch(e){}
     });
	 	$('body').on('mouseenter', '#searchPanel', function() {try{
		console.log("Mouse Enter");
		clearTimeout(searchMouseHandle);}
		catch(e){}
	
     });}
	
	
}

function SearchNext()
{
	currentSearchIndex +=5;
	searchSong();
}

function showVolume()
{
	var point = findPos(document.getElementById("btnVolume"));
	var newdiv = creatediv("volDiv", "",20, 60, point[0], point[1]+20);
		
	document.body.appendChild(newdiv);
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

function creatediv(id, html, width, height, left, top) {

var newdiv = document.createElement('div');
newdiv.setAttribute('id', id); 
newdiv.style.width = width+ "px"; 
newdiv.style.height = height+ "px"; 
 newdiv.style.position = "absolute";
  newdiv.style.display = "block";
 newdiv.style.left = left + "px"; 
 newdiv.style.top = top+ "px"; 
 newdiv.style.background = "#FFF";
newdiv.style.border = "4px solid #000"; 
	 
	  return newdiv;
}

var relatedtemplate = '<div data-name={{id}} style="height:100px;width:100%;margin:5px; cursor:pointer " id="relatedObj{{id}}"><img src="{{source}}" style="float:left; height:61px; width:108px; padding-right: 20px;padding-top:15px"/>  <div style="margin-left:10px;margin-top:15px;"><a style="color:#FFF; font-size:24px">{{title}}</a></div> </div>';
function UpdateRelated(id)
{
	GetRelated(id, function (related ){
		
			var newdiv = document.getElementById("relatedDiv");
			newdiv.innerHTML = "";
			var counter = 0;
					for(index in related)
					{
						if(counter >5)
							{break;}
						counter++;
						var result = related[index];
							var video = {
							id: result.id,
							title: result.title,
							desc : TruncateDesc(result.description, 50),
							source : "http://img.youtube.com/vi/"+ result.id +"/1.jpg"
							};
			
				var html = Mustache.to_html(relatedtemplate, video);
				
				newdiv.innerHTML = html + newdiv.innerHTML;
				
				$('body').on('dblclick', '#relatedObj' +result.id, function() {
						AddSong($(this).data("name"));
				 });
				}
		});	

}