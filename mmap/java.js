
// This code is originally sourced from Ming.


      var myLat = 0;
      var myLng = 0;
      var request = new XMLHttpRequest();

      var me = new google.maps.LatLng(myLat, myLng);
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

      try {
          attempt.open("POST","https://secret-about-box.herokuapp.com/sendLocation", false);
          attempt.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          attempt.send();

          myFunction(attempt.responseText);
      }

      function myFunction(thingy) {
          for(i = 0; i < thingy.length; i++) {
        
        ppl = new google.maps.LatLng(thingy[i].lat, thingy[i].lng);
  
        // Create a marker
        marker = new google.maps.Marker({
          position: ppl,
          title: thingy[i].login;
        });
        marker.setMap(map);
        });
      
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
        

        /*
        // Calling Google Places API
        var request = {
          location: me,
          radius: '500',
          types: ['food']
        };
        service = new google.maps.places.PlacesService(map);
        service.search(request, callback);
      } 
      
      // Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
      function callback(results, status)
      {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          alert("Got places back!");
          places = results;
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      

      
      function createMarker(place)
      {
      }

      */