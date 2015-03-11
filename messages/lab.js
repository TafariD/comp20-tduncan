var xmlhttp = new XMLHttpRequest(); 
var url = "data.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(thingy) {
    var out = "";
    var i;
    for(i = 0; i < thingy.length; i++) {
        out +=  "<p>"+ thingy[i].content + " " +
        "<span class = 'usus'>" + thingy[i].username +  "</span>" +"</p>";
    }
    document.getElementById("messages").innerHTML = out;
}

// This code was editted from content from www.w3schools.com