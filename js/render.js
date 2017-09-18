var FPS = 1;
var allFrames = [];
var pos = 0;

// Access routine for allFrames
function addFrame(img) {
    allFrames[pos++] = img;
}

// Access routine for allFrames
function clearFrames() {
    clearInterval();
    frameCont.innerHTML = ""; // Clear DOM imgs
    introCont.innerHTML = "<h2>Loading...</h2>";
    allFrames = [];
    pos = 0;
}

function render(startFrom) {
    startFrom = (startFrom) ? startFrom : 1;

    if (allFrames.length === 0) {
        alert("No frames found.");
        return;
    } else {

      	// Show frame_container
        swapBodyContent('frame');
      	
      	// Determine user's choice for video length
        var useFPS = lenRadio.checked;
        lenIn.value = (lenIn.value === 0) ? 1 : lenIn.value;
      
        // Calculate FPS
        if (useFPS) {
            FPS = (lenIn.value) ? lenIn.value : 1;
        } else {
            FPS = allFrames.length / lenIn.value;
        }
	
        // Show first frame
        allFrames[0].classList.remove("hidden");
      
      	// Set marker initial position on point A
        marker.setPosition({
            lat: parseFloat(allFrames[0].getAttribute("data-lat")),
            lng: parseFloat(allFrames[0].getAttribute("data-lng"))
        });

        var i = startFrom;

        // Update UI elements
        var playButton = show("play_button");
        hide("restart_button");
      
      	// Play frames when play is clicked
        playButton.onclick = function() {
            var interval = setInterval(function() {
                if (i >= allFrames.length) {
                    clearInterval(interval);
                }

                if (i == allFrames.length) {

                    // Show last frame as interactive Street View panorama
                    show("final_panorama");
                    google.maps.event.trigger(panorama, 'resize');
                    swapBodyContent("pano");

                    clearInterval(interval);
                  
                } else {
                    // Show next frame
                    allFrames[i - 1].classList.add("hidden");
                    allFrames[i].classList.remove("hidden");

                    // Update marker position
                    marker.setPosition({
                        lat: parseFloat(allFrames[i].getAttribute("data-lat")),
                        lng: parseFloat(allFrames[i].getAttribute("data-lng"))
                    });
                  
                }
              
                i++;
            }, 1 / FPS * 1000);

            hide("play_button");
            show("restart_button");
        }
    }
}
