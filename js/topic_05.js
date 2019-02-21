function storageAvailable() {
    // initial check to see if we can use the storage.
    if (typeof(Storage) !== "undefined") {
        
    } else {
        // no web storage support
        alert("There is no storage available");
        return false;
    }
    return true;
}

function example1() {
    // check for storage availability
    if (storageAvailable() == false) {
        return;
    }

    var result = document.getElementById("example1_results");

    // first we are going to create the data we want to save
    sessionStorage.setItem('color', 'red');
    
    // these way do the same thing as well

    //sessionStorage.color = 'red';
    //sessionStorage['color'] = 'red';
    
    // next we will retrive the data
    result.innerHTML = 
    'Our stored color is: ' + sessionStorage.getItem('color');

    result.classList.add("result");
    result.classList.remove("hide")

    // hide the button
    document.getElementById("b_example1").style.display = "none";
}

function example2() {
    // check for storage availability
    if (storageAvailable() == false) {
        return;
    }

    var result = document.getElementById("example2_results");

    // first we are going to create the data we want to save
    var arraySet = [1, 2, 3];

    // we have to store arrays as a JSON object
    sessionStorage.setItem('array', JSON.stringify(arraySet));
    
    // next we will retrive the data
    var storedData = sessionStorage.getItem('array');
    var newArray = '';

    // check to see that we have data
    if (storedData) {
        newArray = JSON.parse(storedData);
    }
    else {
        alert("There is no stored data.");
        return;
    }

    // now we need to loop through and get all items
    var text = '';
    var length = newArray.length;
    for (var index = 0; index < length; index++) {
        text += ' ' + newArray[index];
    }

    result.innerHTML = 
    'Our stored array is:' + text;

    result.classList.add("result");
    result.classList.remove("hide")

    // hide the button
    document.getElementById("b_example1").style.display = "none";
}

function example3() {
    // check for storage availability
    if (storageAvailable() == false) {
        return;
    }

    var result = document.getElementById("example3_results");

    // first we are going to create the data we want to save
    var associative = {
        'A':65,
        'B':66,
        'C':66,
        'D':67,
        'E':68,
        'F':69,
        'G':70
    };

    // we have to store arrays as a JSON object
    sessionStorage.setItem('array', JSON.stringify(associative));
    
    // next we will retrive the data
    var storedData = sessionStorage.getItem('array');
    var newAssociative = '';

    // check to see that we have data
    if (storedData) {
        newAssociative = JSON.parse(storedData);
    }
    else {
        alert("There is no stored data.");
        return;
    }

    // test our our value
    result.innerHTML = 
    'The index "D" is: ' + newAssociative.D;

    result.classList.add("result");
    result.classList.remove("hide")

    // hide the button
    document.getElementById("b_example3").style.display = "none";
}

function example4() {
    // check for storage availability
    if (storageAvailable() == false) {
        return;
    }

    var result = document.getElementById("example4_results");

    // first we are going to create the data we want to save
    var data = {
        "type":"Human",
        "emotions": [
            "Happy",
            "Sad",
            "Angry",
            "Scared"
        ],
        "sounds": [
            "Laughter",
            "Crying",
            "screaming"
        ],
        "legs": 2,
    };

    // we have to store arrays as a JSON object
    sessionStorage.setItem('object', JSON.stringify(data));
    
    // next we will retrive the data
    var storedData = sessionStorage.getItem('object');
    var newObject = '';

    // check to see that we have data
    if (storedData) {
        newObject = JSON.parse(storedData);
    }
    else {
        alert("There is no stored data.");
        return;
    }

    // test our our value
    result.innerHTML = 
    'The ' + newObject.type + ' is a ' + newObject.legs + 
    ' legged creature. During the semester, they are ' + 
    newObject.emotions[1] + ' and love ' + newObject.sounds[1] + ' a lot.';

    result.classList.add("result");
    result.classList.remove("hide")

    // hide the button
    document.getElementById("b_example4").style.display = "none";
}