// declare all global variables here
window.item_index = 0;
window.names = [];
window.races = [];
window.births = [];
window.cries = [];
window.live = [];
window.maxyear = 0;

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
    return true;
}