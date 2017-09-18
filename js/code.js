var selectCar = document.getElementById("selectCar");
var selectWalk = document.getElementById("selectWalk");
var startLoc = document.getElementById("from");
var endDest = document.getElementById("to");
var lenRadio = document.getElementById("fps_sel");
var lenIn = document.getElementById("len_control_in");
var introCont = document.getElementById("intro_content");
var frameCont = document.getElementById("frame_container");
var finalPano = document.getElementById("final_panorama");

function swapBodyContent(content) {
    if (content === "intro") {
        introCont.style.opacity = 1;
        frameCont.style.opacity = 0;
        finalPano.style.opacity = 0;
    } else if (content === "frame"){
        introCont.style.opacity = 0;
        frameCont.style.opacity = 1;
        finalPano.style.opacity = 0;
    } else if (content === "pano") {
        introCont.style.opacity = 0;
        frameCont.style.opacity = 0;
        finalPano.style.opacity = 1;
        show("final_panorama");
    }
}

function selectTravelType(type) {
    if (type === "car") {
        selectCar.classList.add("selected");
        selectWalk.classList.remove("selected");
    } else {
        selectCar.classList.remove("selected");
        selectWalk.classList.add("selected");
    }
}

function swapToFrom() {
    var temp = startLoc.value;
    startLoc.value = endDest.value;
    endDest.value = temp;
}

function show(id) {
    var elem = document.getElementById(id);
    if (elem) {
        elem.classList.remove("hidden");
        return elem;
    }
    return false;
}

function hide(id) {
    var elem = document.getElementById(id);
    if (elem) {
        elem.classList.add("hidden");
        return elem;
    }
    return false;
}

function validateNumberInput(self) {
    self.value = self.value.replace("-", "").replace("+", "");
}

document.onkeydown = function(e) {
    if (document.activeElement === startLoc || document.activeElement === endDest || document.activeElement === lenIn) {
        var code = e.keyCode ? e.keyCode : e.which;
        
        if (code === 13) {
            calculateAndDisplayRoute();
        }
    }
}