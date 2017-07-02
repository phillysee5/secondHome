var marker;
var markers = [];
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
					{ color: "#D1B53D"}
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

function clickMarker() {
			google.maps.event.addListener(marker, "click", function(){
			$("#getstarted").hide();
			$("#locations").append("<div class='locationdetails'></div>")

			});
}
