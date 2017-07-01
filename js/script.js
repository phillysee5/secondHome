function init(){

	//All of the options for the map
	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.258166,
			lng: 174.764943
		},
		//states what the initial zoom for the map is.
		zoom: 15,
		//Turn off all of the User Interface for the Map
		disableDefaultUI: false,
		//Turn off the ability to zoom with clicks
		disableDoubleClickZoom: false,
		//Turn off the ability to zoom with scroll wheel
		scrollwheel: true,
		//Turn off the ability to drag the map around
		draggable: true,
		//sets the cursor for when we are able to drag
		draggableCursor: "pointer",
		//sets the cursor for when we are dragging
		draggingCursor: "crosshair",
		//turn on the ability to make the map full screen
		fullscreenControl: true,
		//set the background colour of the map
		backgroundColor: "grey",
		//turns off the ability to use keyboard
		keyboardShortcuts: false,
		//sets where on the map we want the UI element to be
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},
		//This is the section where we can completly style the map
		//Have a look at the Google Maps API Reference to see everything you can do
		styles: [
			{
				//This is setting the overall style to the whole map
				stylers:[
					{ hue: "#d01439" },
					{ saturation: -20 }
				]
			},
			{
				//Just changing all the roads
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#3498db" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				//Changing all the labels for transits
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#ff0066"},
					{ saturation: +80 }
				]
			},
			{
				//Changing the water colour
				featureType: "water",
				stylers: [
					{ color: "#16a085"}
				]
			},
			{
				//Turning off all of the points of intereset
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}
	//Telling the map where you want to render it
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

}

google.maps.event.addDomListener(window, 'load', init);
