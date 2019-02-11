// declare all global variables here
window.item_index = 0;
window.item_max   = 5;
window.maxyear    = 0;

window.names   = [];
window.races   = [];
window.births  = [];
window.cries   = [];
window.lives   = [];

function submit() {
    var name = document.getElementById("name").value;
    var race = document.getElementById("race").value;
    var birth = document.getElementById("birth").value;
    var cry = document.getElementById("cry").value;
    var live = document.getElementById("live").value;

    validate(name, race, birth, cry, live);
}

function validate(name, race, birth, cry, live) {

    if(name === "" || race === "" || birth == 0 || cry === "" || live === "") {
        alert("All fields needs to be filled in.");
        return false;
    }

    saveData(name, race, birth, cry, live);

    return true;
}

function saveData(name, race, birth, cry, live) {
    var element_remaining = document.getElementById("remaining_slots");
    
    // add our data to our array 
    names[item_index] = name;
    races[item_index] = race;
    births[item_index] = birth;
    cries[item_index] = cry;
    lives[item_index] = live;

    // find out if this is the latest birth we have
    if (maxyear < birth) {
        maxyear = birth;
    }

    item_index++;

    if (item_index == item_max) {
        element_remaining.classList.add("hide");
        document.getElementById("input_table").classList.add("hide");

        displayHistory();
        return;
    }

    element_remaining.innerText = 
    "Character slots remaining: " + (item_max - item_index);
}

function displayHistory() {
    var element_result = document.getElementById("result");
    element_result.classList.remove("hide");
    element_result.classList.add("result");

    var warStart = Number(maxyear) + Number(21);

    var historyText = 
    "The great war began in " + warStart + ".<br>";

    for (index = 0; index < item_max; index++) {
        historyText = 
        historyText + "<br>" +
        names[index] + " was born in " + births[index] + " to the " + races[index] + " race.<br>" +
        'They were known for their battle cry: "' + cries[index] + '".<br>';

        if (lives[index] === 'yes')
        {
            historyText = historyText +
            names[index] + " was able to see the conclusion of the war.<br>"
        }
        else {
            historyText = historyText +
            names[index] + ", unfortunatly, did not make it to the end.<br>"
        }
    }

    element_result.innerHTML = historyText;
}