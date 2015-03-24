var me;
var myLat = 0;
var myLng = 0;
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
var myimage = {
    url: 'flag.jpg',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 50),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32),

    scaledSize: new google.maps.Size(25, 50)
  };

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
    title: "Here I Am!",
    icon: myimage
  });
  marker.setMap(map);

  console.log("Attempting to get JSON.");
  attempt.open("POST","https://secret-about-box.herokuapp.com/sendLocation", true);
  attempt.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  attempt.onreadystatechange = greenlight;
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
  console.log("We are posting other students.");
  console.log(posted);
    for(i = 0; i < posted.length; i++) {
  
        ppl = new google.maps.LatLng(posted[i].lat, posted[i].lng);

        var dist = distance(posted[i].lat,posted[i].lng);
  
        // Create a marker
        marker = new google.maps.Marker({
          position: ppl,
          title: posted[i].login
        });

        marker.content = "" + posted[i].login + " is " + dist + " km away from you." ;

        marker.setMap(map);

        // Open info window on click of marker (code from Ming)
        google.maps.event.addListener(marker, 'click', function() {
          console.log(this);
          infowindow.setContent(this.content);
          infowindow.open(map, this);
        });

    }
  
}


function distance(Lattt,Longgg){

  Number.prototype.toRad = function() {
   return this * Math.PI / 180;
  }

  var lat2 = Lattt
  var lon2 = Longgg;
  var lat1 = myLat; 
  var lon1 = myLng; 

  var R = 6371; // km 
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 

  return d;

  //This function's code was borrowed from Stack Overflow.

}