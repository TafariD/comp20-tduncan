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
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
        };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
 }
 
 google.maps.event.addDomListener(window, 'load', initialize);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}