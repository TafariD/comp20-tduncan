var xmlhttp = new XMLHttpRequest(); 
var url = "data.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        getLocation;
        var myArr = JSON.parse(xmlhttp.responseText);
        
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();


var x = document.getElementById("demo");

 function initialize() {
 	getLocation();
    latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    // "..." is stuff you have to fill in
    ...
    ...
    ...
    myOptions = {
          center: { lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 8
};
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}