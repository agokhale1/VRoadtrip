var SMOOTHING_INTERVAL = 1;
var currentPhoto = 0;
var directionsService;
var directionsDisplay;
var marker;

function initMap() {

    // Clear any from allFrames
    clearFrames();

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {lat: 40.418505, lng: -86.898281}
    });
    directionsDisplay.setMap(map);
    
    // Create empty marker
    marker = new google.maps.Marker({
        position: {lat: 40.418505, lng: -86.898281},
        map: map
    });
        
    marker.setMap(map);
    
}

function calculateAndDisplayRoute() {
    clearFrames();
    
    directionsService.route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {

            // Update route overview display
            directionsDisplay.setDirections(response);

            // Loop through points on path and create frames
            var paths = response.routes[0].overview_path;
            for (var i = 0; i < paths.length; i += SMOOTHING_INTERVAL) {
                if(i != paths.length-1){
                   var heading = angleFromCoordinates(paths[i].lat(), paths[i].lng(), paths[i+1].lat(), paths[i+1].lng());
                }
                
                getStreetViewImage(paths[i].lat(), paths[i].lng(), heading);
            }

            var interval = setInterval(function() {
                if (document.getElementsByClassName("loading").length === 0) {
                    render(0);
                    clearInterval(interval);
                }
            }, 100);


        } else {
            window.alert("Oops! We couldn't find a route between your choices.\n\nError: " + status);
        }
    });
}
    
