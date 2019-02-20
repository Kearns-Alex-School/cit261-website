var requestURL = "../json/creatures.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var tData = request.response;
}



function updateTable() {
    
}