var SMOOTHING_INTERVAL = 1;
var currentPhoto = 0;
var directionsService;
var directionsDisplay;
var streetViewService;
var panorama;
var marker;

function initMap() {

    // Create directions service and map
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
    
    // Create interactive Street View panorama
    streetViewService = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(document.getElementById('final_panorama'), {
        position: {
            lat: 40.427353, 
            lng: -86.9166654 
        }
    });

}

function calculateAndDisplayRoute() {
    
    // Send analytics event
    ga('send', 'event', { eventCategory: 'API_request', eventAction: 'directions' });
    
    swapBodyContent('intro');
    hide("final_panorama");
    hide("restart_button");
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
                if(i != paths.length - 1){
                   var heading = headingFromCoordinates(paths[i].lat(), paths[i].lng(), paths[i + 1].lat(), paths[i + 1].lng());
                }
                
                getStreetViewImage(paths[i].lat(), paths[i].lng(), heading);
            }

            // Send analytics event
            ga('send', 'event', { eventCategory: 'API_request', eventAction: 'street_view', eventValue: paths.length });

            var interval = setInterval(function() {
                if (document.getElementsByClassName("loading").length === 0) {

                    // Send analytics event
                    ga('send', 'event', { eventCategory: 'API_request', eventAction: 'maps_panorama' });

                    // Set panorama to final position and attempt to calculate proper heading
                    var finalPoint = paths[paths.length - 1];
                    streetViewService.getPanoramaByLocation(finalPoint, 100, function (response, status) {
                        
                        if(status === 'OK'){

                            var nearest = response.location.latLng;

                            var heading = headingFromCoordinates(nearest.lat(), nearest.lng(), finalPoint.lat(), finalPoint.lng());          

                            panorama.setPosition(nearest);
                            panorama.setPov({
                                heading: heading,
                                pitch: 0
                            });
                            panorama.setVisible(true);

                        } else {
                            finalPano.innerHTML = "<h2>We're sorry. Unfortunately, a Street View panorama was not available near your final desination.</h2>";
                        }

                    });

                    // Display frame container and wait for user
                    render(0);
                    clearInterval(interval); 
                }
            }, 100);


        } else {
            window.alert("Oops! We couldn't find a route between your points.\n\nError: " + status);
        }
    });
}
    
