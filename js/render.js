var FPS = 1;

function render(startFrom) {
    startFrom = (startFrom) ? startFrom : 1;
    
	if (allFrames.length === 0 ) {
		alert("No frames found.");
		return;
	} else {
	    
	    swapBodyContent('frame');
	    
	    lenIn.value = (lenIn.value === 0) ? 1 : lenIn.value;
	    
	    var useFPS = lenRadio.checked;
	    if (useFPS) {
            FPS = (lenIn.value) ? lenIn.value : 1;
        } else {
            FPS = allFrames.length / lenIn.value;
        }
	    
	    
	    allFrames[0].classList.remove("hidden");
	    marker.setPosition({lat: parseFloat(allFrames[0].getAttribute("data-lat")), lng: parseFloat(allFrames[0].getAttribute("data-lng"))});
	    
	    var i = startFrom;
	    
	    var playButton = show("play_button");
	    hide("restart_button");
	    playButton.onclick = function() {
	        var interval = setInterval(function() {
    	        if (i >= allFrames.length) {
    	            clearInterval(interval);
    	        }
    	        
    	        if (i == allFrames.length - 1) {
    	            allFrames[i - 1].classList.add("hidden");
                    allFrames[i].classList.remove("hidden");
                    show("restart_button");
                    clearInterval(interval);
                } else {
                    allFrames[i - 1].classList.add("hidden");
                    allFrames[i].classList.remove("hidden");
                    
                    // Update marker position
                    marker.setPosition({lat: parseFloat(allFrames[i].getAttribute("data-lat")), lng: parseFloat(allFrames[i].getAttribute("data-lng"))});
                }
                
                i++;
    	    }, 1 / FPS * 1000);
    	    
    	    hide("play_button");
    	    show("restart_button");
	    }
	}
}