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
																				'<div id="selectgroup"><p>length of stay</p><select class="nightsstaying" onchange="multiplyAccomodation()"><option>1 night</option><option>2 nights</option><option>3 nights</option><option>4 nights</option><option>5 nights</option><option>6 nights</option><option>7 nights</option><option>8 nights</option><option>9 nights</option><option>10 nights</option><option>11 nights</option><option>12 nights</option><option>13 nights</option><option>14 nights</option></select></div>'+
																				'<div id="accomodation"><small>accomodation options</small>'+
																				'<div class="options"><ul>'+
																				'<li class="option hotelinfo">Hotel&nbsp;&nbsp;<img height="20px" src="img/hotel.png">$<span class="hotelcost">157</span></li>'+
																				'<li class="option hostelinfo">Hostel<img height="20px" src="img/hostel.png">$<span class="hostelcost">30</span></li>'+
																				'<li class="option motelinfo">Motel&nbsp;<img height="12px" width="20px" src="img/motel.png">$<span class="motelcost">90</span></li>'+
																				'<li class="option houseinfo">House&nbsp;<img height="20px"  src="img/houseblack.png">$<span class="housecost">240</span></li>'+
																				'</ul></div>'+
                                        '<select class="selector accomodation" onchange="accomodationSelect(this)"><option class="placehold" value="0">Select an accomodation option</option><option class="hotelselection" value="Hotel">Hotel</option><option class="hostelselection" value="Hostel">Hostel</option><option class="motelselection" value="Motel">Motel</option><option class="houseselection" value="House">House</option></select>'+
																				'<span class="close" onclick="remove(this)">x</span>'
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

  var total = 0;
  $('#chosen').empty();

  $('.ui-accordion .ui-accordion-content').each(function(){
    var location = $(this).attr('data-location');
    // var forLocation = $(el).parent().parent().parent().parent().parent().attr("data-location");
    var accomodationtype = $(this).find('select.accomodation').val();

    if(accomodationtype=='0') return;

    var cost = $(this).find('.options .option.'+accomodationtype.toLowerCase()+'info .'+accomodationtype.toLowerCase()+'cost').text();
    console.log(cost);

    $('.placehold').hide();
    $('#chosen').append('<li class="accomodations" data-attribute="'+location+'"><span>'+accomodationtype+'</span>&nbsp;<span>'+location+'</span>&nbsp;$<span id="particularcost">'+cost+'</span></li>');

    total += parseInt(cost);
  });

  console.log( total );
  $('#total').empty();
  $('#total').append(total);


  multiplyAccomodation();

}

function multiplyAccomodation(){

  var accomodationTypes = {
    "hotel": 157,
    "hostel": 30,
    "motel": 90,
    "house": 240
  };

  $.each(accomodationTypes, function(name, nightcost){

    $('.ui-accordion .ui-accordion-content').each(function(){
      var nightsstaying = parseInt($(this).find('.nightsstaying').val());
      var newtotal = (nightsstaying *= nightcost);
      $(this).find('.'+name+'cost').html(newtotal);
    });

  });

}




function remove(el){

  var removeItem = el.parentNode.parentNode.dataset.location;
  console.log(el.parentNode.parentNode.dataset.location);
  // loop over markerInUse array
  for (var i = 0; i < markersInUse.length; i++) {
    // Find match
  if (markersInUse[i] == removeItem){
  // console.log('match')
  console.log(markersInUse)
  // change icon
  for (var j = 0; j < markers.length; j++) {
    if(markers[j].title == markersInUse[i]) markers[j].setIcon("img/circle.png");
  }

  $('.' + markersInUse[i]).remove();


  // markersInUse[i].setIcon("img/circle.png");
  // remove from array
  var removeFromDom = removeItem;
  // console.log(removeItem);
  markersInUse = jQuery.grep(markersInUse, function(value) {
  return value != removeFromDom;
  });
  console.log(markersInUse)
  // remove from dropdown
}
}
accomodationSelect();
}


function removeTaupo(marker){

  marker = "Taupo"
  // get the title of the dropdown
  console.log(markersInUse)
  // loop over the markers in use

  //find a match
  for (var i = 0; i < markersInUse.length; i++) {
  if (markersInUse[i] == marker){
  console.log('we got a match')

  $('.Taupo').remove();
  }
  }
  //change the icon
  markersInUse[i].setIcon("img/circle.png");

  //remove it from the inuse array
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
