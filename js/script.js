$( function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  });

var marker;
var currentMarker = 'none';
var markers = [];
var currentMarker;
var transportMode = "DRIVING";
var directionDisplay;
var userLocation;
var markersInUse = [];
var hotelDisplay = false;
var hostelDisplay = false;
var motelDisplay = false;
var houseDisplay = false;

var nightlycost = [];
var costs = [];

var mapMarkers = [
	{
		lat: -41.296529,
		lng: 174.764044,
		title: "Wellington"
	},
	{
		lat: -38.683495,
		lng: 176.066717,
		title: "Taupo"

	},
	{
		lat: -36.874107,
		lng: 174.721183,
		title: "Auckland"
	}
];



function init(){
	var mapOptions = {
		center:{
			lat: -38.870788,
			lng: 175.443535
		},
		zoom: 7,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		scrollwheel: true,
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor: "hand",
		fullscreenControl: false,
		backgroundColor: "grey",
		keyboardShortcuts: false,
		styles: [
			{
				stylers:[
					{ hue: "#D1B53D" },
					{ saturation: -20 }
				]
			},
			{
				    featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#7f1419" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#ff0066"},
					{ saturation: +80 }
				]
			},
			{
				featureType: "water",
				stylers: [
					{ color: "#d1e4fc"}
				]
			},
			{
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	addMarkers(marker);

	marker.addListener("click", clickMarker);

}

google.maps.event.addDomListener(window, 'load', init);


function addMarkers(){
		for (var i = 0; i < mapMarkers.length; i++) {
		marker = new google.maps.Marker({
			position:{
				lat: mapMarkers[i].lat,
				lng: mapMarkers[i].lng
			},
			map: map,
			title: mapMarkers[i].title,
			icon: "img/circle.png"
		})
		markers.push(marker);
		clickMarker(marker);
	};
}

function clickMarker(marker) {
			google.maps.event.addListener(marker, "click", function(){
			$("#getstarted").hide();
			var inuse = false;
			for (var i = 0; i < markersInUse.length; i++) {
				if(marker.title == markersInUse[i]){
					inuse = true;
					break;
				}
			}
			if(inuse == true)
			{

			}
			else {

				var newPanel='<h3 class='+marker.title+'>'+marker.title+'</h3><div id="dropdown" data-location="'+marker.title+'" class='+marker.title+'><div id="selectgroup"><p>size of party</p>&nbsp;&nbsp;<select class="partysize" onchange="modifyOptions()"><option>1 person</option><option selected="selected">2 people</option><option>3 people</option><option>4 people</option><option>5 people</option><option>6 people</option></select></div>'+
																				'<div id="selectgroup"><p>length of stay</p><select id="nightsstaying" onchange="multiplyAccomodation()"><option>1 night</option><option>2 nights</option><option>3 nights</option><option>4 nights</option><option>5 nights</option><option>6 nights</option><option>7 nights</option><option>8 nights</option><option>9 nights</option><option>10 nights</option><option>11 nights</option><option>12 nights</option><option>13 nights</option><option>14 nights</option></select></div>'+
																				'<div id="accomodation"><small>accomodation options</small>'+
																				'<div class="options"><ul>'+
																				'<li class="option hotelinfo">Hotel&nbsp;&nbsp;<img height="20px" src="http://placehold.it/20x20">$<span class="hotelcost">157</span></li>'+
																				'<li class="option hostelinfo">Hostel<img height="20px" src="http://placehold.it/20x20">$<span class="hostelcost">30</span></li>'+
																				'<li class="option motelinfo">Motel&nbsp;<img height="20px" src="http://placehold.it/20x20">$<span class="motelcost">90</span></li>'+
																				'<li class="option houseinfo">House&nbsp;<img height="20px" src="http://placehold.it/20x20">$<span class="housecost">240</span></li>'+
																				'</ul></div>'+
                                        '<select id="selector" onchange="accomodationSelect()"><option class="placehold">Select an accomodation option</option><option class="hotelselection">Hotel</option><option class="hostelselection">Hostel</option><option class="motelselection">Motel</option><option class="houseselection">House</option></select>'+
																				'<span id="close" onclick="remove'+marker.title+'()">x</span>'
																				'</div>'+
				'</div>';



				$('#accordion').append(newPanel).accordion('destroy').accordion( /* options */ );


				currentMarker = marker;
				markersInUse.push(marker.title);
				marker.setIcon("img/house.png");
				// marker.setAnimation(google.maps.Animation.BOUNCE);
			// showDirection(currentMarker.position, transportMode);
			}
			});

}


function modifyOptions(){
  console.log('party size changed')
  if(parseInt($('.partysize').val()) == 1){
  console.log('one man show')
  $('.motelinfo').hide();
  $('.hotelinfo').show();
  $('.hostelinfo').show();
  $('.houseinfo').show();


  $('.motelselection').hide();
  }
  if (parseInt($('.partysize').val()) > 1){
  $('.hotelinfo').show();
  $('.hostelinfo').show();
  $('.motelinfo').show();
  $('.houseinfo').show();


  $('.motelselection').show();
  $('.hotelselection').show();
  $('.hostelselection').show();
  $('.houseselection').show();
  }
  if (parseInt($('.partysize').val()) > 2){
  $('.hotelinfo').hide();

  $('.hotelselection').hide();
  $('.motelselection').show();
  }
  if (parseInt($('.partysize').val()) > 4){
  $('.motelinfo').hide();
  $('.houseinfo').hide();

  $('.motelselection').hide();
  $('.houseselection').hide();
  $('.hotelselection').hide();
}
}

function accomodationSelect(el){

  //get the name of the parent container or marker
  // var forLocation = $(el).parent().parent().parent().parent().parent().attr("data-location");
  accomodationtype = $('#selector').val()

  $('.placehold').hide();
  $('#accomodations').remove();
  $('#chosen').append('<li id="accomodations"><span>'+accomodationtype+'</span>&nbsp;<span>location</span>&nbsp;$<span id="particularcost"></span></li>');

  multiplyAccomodation();

  if( $('#selector').val() == "Hotel"){

      var buffalo = $('.hotelcost').val()
      console.log(buffalo);
      $('#particularcost').append(500);
  }


}

function multiplyAccomodation(){

  hotelCost();
  hostelCost();
  motelCost();
  houseCost();

  function hotelCost(){
  var hotelcost = 157;
  $('.hotelcost').empty();
  nightsstaying = parseInt($('#nightsstaying').val());
  var newtotal = (nightsstaying *= hotelcost);
  $('.hotelcost').append(newtotal);
 }

 function hostelCost(){
 var hostelcost = 30;
 $('.hostelcost').empty();
 nightsstaying = parseInt($('#nightsstaying').val());
 var newtotal = (nightsstaying *= hostelcost);
 $('.hostelcost').append(newtotal);
}

 function motelCost(){
 var motelcost = 90;
 $('.motelcost').empty();
 nightsstaying = parseInt($('#nightsstaying').val());
 var newtotal = (nightsstaying *= motelcost);
 $('.motelcost').append(newtotal);
 }

 function houseCost(){
 var housecost = 240;
 $('.housecost').empty();
 nightsstaying = parseInt($('#nightsstaying').val());
 var newtotal = (nightsstaying *= housecost);
 $('.housecost').append(newtotal);
 }
}





function removeTaupo(marker){

  marker = "Taupo"
  // get the title of the dropdown
  console.log(markersInUse)
  // loop over the markers in use
  for (var i = 0; i < markersInUse.length; i++) {
  if (markersInUse[i] == "Taupo"){
  console.log('we got a match')

  }
  }
  //find a match

  //change the icon
  // marker.setIcon("img/circle.png");
  //remove it from the inuse array

  $('.Taupo').remove();


  var removeItem = 'Taupo';
  markersInUse = jQuery.grep(markersInUse, function(value) {
  return value != removeItem;
  });

}

function removeAuckland(){
  $('.Auckland').remove();

  var removeItem = 'Auckland';
  markersInUse = jQuery.grep(markersInUse, function(value) {
  return value != removeItem;
  });
}

function removeWellington(){
  $('.Wellington').remove();

  var removeItem = 'Wellington';
  markersInUse = jQuery.grep(markersInUse, function(value) {
  return value != removeItem;
  });
}


function addTotal(){
  $('#total').empty();
  var total = 0;
  for (var i = 0; i < costs.length; i++) {
      total += costs[i] << 0;
  }

  $('#total').append(total);
}



// function showDirection(location, mode){
// 	//If there is already a direction line on the map then remove it
// 	if(directionDisplay){
// 		directionDisplay.setMap(null);
// 	}
// 	//Create a new instance of DirectionsService
// 	var directionService = new google.maps.DirectionsService();
// 	//Create a new instance of DirectionRendere
// 	//This draws the lines on the map
// 	//This was also initialised at the top of the page
// 	directionDisplay = new google.maps.DirectionsRenderer();
//
// 	//set what map you want it to show on
// 	directionDisplay.setMap(map);
//
// 	//The DirectionService only needs origin, destination and travelMode, but there are several other options you can add
// 	directionService.route({
// 		//What is the starting place (lat/lng)
// 		origin: userLocation.position,
// 		//What is the end place (lat/lng)
// 		destination: currentMarker.position,
// 		//How is the user getting there
// 		travelMode: google.maps.TravelMode[mode],
// 	}, function(response, status){
// 		//When it comes back from the server you will get a response and a status
// 		//you should write a case for all of the different status
// 		//Have a look at the Google Maps API for all of them
//
// 		//If everything is all good
// 		if(status == "OK"){
// 			//Show the directions on the map
// 			directionDisplay.setDirections(response);
// 		} else if(status == "NOT_FOUND"){
// 			//If one of the start or end locations werent found
//
// 		} else if(status == "ZERO_RESULTS"){
// 			//If there is no results of how to get to the locations
// 		}
// 	});
// }
