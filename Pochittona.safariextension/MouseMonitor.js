/*
 * Copyright Shintaro Kawara 2015
 * MIT License : https://github.com/kwrsin/Pochittona/blob/master/LICENSE
 */


(function(){
var POCHITTONA = {
isDisplay: false,
clickedPosX: 0,
clickedPosY: 0,
offsetX: 0,
offsetY: 0,
zoomValue: 100,
mouseUpEvent: function(e){
		if(e.button != 1) {
			document.body.style.cursor = "";
			POCHITTONA.isDisplay = false;
			return;
		}
		if(POCHITTONA.isDisplay) {
			POCHITTONA.isDisplay = false;
			document.body.style.cursor = "";
			document.body.style.zoom = "";
			POCHITTONA.zoomValue = 100;
		} else {
			POCHITTONA.isDisplay = true;
			// document.body.style.cursor = "url(" + safari.extension.baseURI + "Images/icon_mouse.png)"
			document.body.style.cssText =
				"cursor: url(" + safari.extension.baseURI + "Images/icon_mouse.png), all-scroll;zoom: " + String(POCHITTONA.zoomValue) + "%";
		}
		POCHITTONA.clickedPosX = e.screenX;
		POCHITTONA.clickedPosY = e.screenY;
		//TODO Is saving and loading a scale value nessesary?
	},
mouseWheelEvent: function(e) {
		if(POCHITTONA.isDisplay == false) {
			return;
		}
		var delta = -(e.wheelDelta / 40);
		// if(document.body.style.zoom) {
		// 	POCHITTONA.zoomValue = parseFloat(document.body.style.zoom);
		// }
		POCHITTONA.zoomValue += delta;
		document.body.style.zoom = String(POCHITTONA.zoomValue) + "%"
		e.preventDefault();
	},
mouseMoveEvent: function(e) {
		if(POCHITTONA.isDisplay == false) {
			return;
		}
		POCHITTONA.offsetX = (e.screenX - POCHITTONA.clickedPosX);
		POCHITTONA.offsetY = (e.screenY - POCHITTONA.clickedPosY);
		window.scrollBy(POCHITTONA.offsetX, POCHITTONA.offsetY);

	}
}

document.addEventListener("mouseup" , function(e){ POCHITTONA.mouseUpEvent(e); });
document.addEventListener("mousewheel" , function(e){ POCHITTONA.mouseWheelEvent(e); });
document.addEventListener("mousemove" , function(e){ POCHITTONA.mouseMoveEvent(e); });

if( typeof window.POCHITTONA == "undefined") {
	window.POCHITTONA = POCHITTONA;
}

})();