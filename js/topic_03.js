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
        option.text = Data.creatures[index].type;
        option.value = index;
        select.add(option);
    }

    select.selectedIndex = -1;
}

function updateTable() {
    var table = document.getElementById("information");
    var select = document.getElementById("userSelect");

    var creatureData = Data.creatures[select.value];

    var newHTML = ""

    newHTML = 
    '<tr>' +
        '<th colspan="4">' + creatureData.type + '</th>' +
    '</tr>' +
    '<tr>' + 
        '<td style="text-align:center; width:30%;"><h3>Emotions</h3></td>' +
        '<td style="text-align:center; width:30%;><h3>Sounds</h3></td>' +
        '<td style="text-align:center; width:20%;><h3>Legs</h3></td>' +
        '<td style="text-align:center; width:20%;><h3>Rating</h3></td>' +
    '</tr>' +
    '<tr>' +
        '<td>' +
            '<ul>';

    // add list of emotions
    creatureData.emotions.forEach(function(element) {
        newHTML += '<li>'+ element + '</li>';
    });

    newHTML += 
            '</ul>' +
        '</td>' + 
        '<td>' +
            '<ul>';

    // add list of sounds
    creatureData.sounds.forEach(function(element) {
        newHTML += '<li>'+ element + '</li>';
    });

    newHTML += 
            '</ul>' +
        '</td>' + 
        '<td>';

    // add the legs
    newHTML += 
            creatureData.legs + 
        '</td>' +
        '<td>';

    // add the rating
    newHTML += 
            creatureData.rating + 
        '</td>' +
    '</tr>';

    table.innerHTML = newHTML;
    table.classList.remove("hide");
}