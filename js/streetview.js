var SV_API_KEY = "AIzaSyAwiNJOEGV4Xm95TpD6KiJDcDyEtVHRqrg"; // New Street View API key
var svWidth = 640;
var svHeight = 360;
var svFOV = 120;
var svPitch = 0;
var svHeading = 0; // Default to North

var allFrames = [];
var pos = 0;

function getStreetViewImage(lat, long, heading) {
    
    var URL;
    if (heading) {
        URL = "https://maps.googleapis.com/maps/api/streetview?size=" + svWidth + "x" + svHeight + "&location=" + lat + "," + long + "&fov=" + svFOV + "&heading=" + heading + "&pitch=" + svPitch + "&key=" + SV_API_KEY;
    } else {
        URL = "https://maps.googleapis.com/maps/api/streetview?size=" + svWidth + "x" + svHeight + "&location=" + lat + "," + long + "&fov=" + svFOV + "&pitch=" + svPitch + "&key=" + SV_API_KEY;
    }

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.className = "loading hidden frame";
    img.setAttribute("data-lat", lat);
    img.setAttribute("data-lng", long);
    img.src = URL;
    addFrame(img);
    document.getElementById("frame_container").appendChild(img);

    img.onload = function() {
        img.classList.remove("loading");
    }
}

// Access routine for allFrames
function addFrame(img) {
    allFrames[pos++] = img;
}

// Access routine for allFrames
function clearFrames() {
    clearInterval();
    allFrames = [];
    pos = 0;
}

function angleFromCoordinates(lat1, long1, lat2, long2) {

    lat1 = lat1 * (Math.PI/180);
    long1 = long1 * (Math.PI/180);
    lat2 = lat2 * (Math.PI/180);
    long2 = long2 * (Math.PI/180);

    var diffLon = (long2 - long1);

    var y = Math.sin(diffLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
            * Math.cos(lat2) * Math.cos(diffLon);

    var heading = Math.atan2(y, x);
    heading = heading * (180/Math.PI);
    heading = (heading + 360) % 360;

    return heading;
} 
