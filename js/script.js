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
			animation: google.maps.Animation.DROP,
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
			if(marker.title == currentMarker.title){
			} else {
				$("#locations").append("<div id='accordion' class='locationdetails'><strong>"
																+marker.title+"</strong><div id='dropdown'><p>Lorem ipsum dolor sit amet</p></div></div>")

																$( "#accordion" ).accordion({
														      collapsible: true
														    });

				currentMarker = marker;
				marker.setIcon("img/house.png");
				marker.setAnimation(google.maps.Animation.BOUNCE);
			// showDirection(currentMarker.position, transportMode);
			}
			});
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
