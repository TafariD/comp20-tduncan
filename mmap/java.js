var me;
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var myOptions = {
      zoom: 13, // The larger the zoom number, the bigger the zoom
      center: me,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var attempt = new XMLHttpRequest();

function init()
{
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  console.log("Call before getMyLocation()");
  getMyLocation();
  console.log("Call after getMyLocation()");
}

function getMyLocation() {
  console.log("In getMyLocation()");
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
    navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      renderMap();
    });
  }
  else {
    alert("Geolocation is not supported by your web browser.  What a shame!");
  }
  console.log("Leaving getMyLocation()");
}

function renderMap()
{
  console.log("Rendering Map");
  me = new google.maps.LatLng(myLat, myLng);
  
  // Update map and go there...
  map.panTo(me);

  // Create a marker
  marker = new google.maps.Marker({
    position: me,
    title: "Here I Am!"
  });
  marker.setMap(map);
    
  // Open info window on click of marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
  });

  console.log("Attempting to get JSON.");
  attempt.open("POST","https://secret-about-box.herokuapp.com/sendLocation", true);
  attempt.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  attempt.onreadystatechange = greenlight();
  attempt.send("login=JoshWright&lat=" + myLat + "&lng=" + myLng);
  console.log("Might have gotten JSON.");

  console.log(JSON.parse(attempt.responseText));

  console.log(attempt.responseText);
}

function greenlight() { //Checks to make sure the data is coming through before we go.
  console.log("We are trying to greenlight the JSON");

   if (attempt.readyState == 4 && attempt.status == 200){
        console.log("Data was recieved and is OK");
        PostOtherPositions(JSON.parse(attempt.responseText));
   }
   else if (attempt.readyState == 4 && attempt.status == 500){
        alert("This is awkward... nothing came through.");
   }

}

function PostOtherPositions(posted) { //This function should add the other positions to the map.
  console.log("We posting other students.");
  console.log(posted);
    for(i = 0; i < posted.length; i++) {
  
        ppl = new google.maps.LatLng(posted[i].lat, posted[i].lng);
  
        // Create a marker
        marker = new google.maps.Marker({
          position: ppl,
          title: posted[i].login
        });
    }
  marker.setMap(map);
}
