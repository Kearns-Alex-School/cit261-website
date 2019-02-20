var requestURL = "../json/creatures.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var data;

request.onload = function() {
    Data = request.response;

    var select = document.getElementById("userSelect");

    for (var index = 0; index < Data.creatures.length; index++) {
        var option = document.createElement("option");
        //var option = new Option (Data.creatures[index].type, index);
        option.text = Data.creatures[index].type;
        option.value = index;
        select.add(option);
    }
}

function updateTable() {
    
}