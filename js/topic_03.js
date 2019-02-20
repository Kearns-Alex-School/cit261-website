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
    var table = document.getElementById("information");
    var select = document.getElementById("userSelect");

    var creatureData = Data.creatures[select.value];

    table.innerHTML = 
    '<tr><th>' + creatureData.type + '</th></tr>' +
    '<tr>' + 
        '<th>Emotions</th><th>Sounds</th><th>Legs</th><th>Rating</th>' +
    '</tr>'
    ;

    table.classList.remove("hide");
}