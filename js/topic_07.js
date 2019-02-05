// define all of our functions that we will use on the webpage
function example1() {
    document.getElementById("example1_results").classList.add("result");

    document.getElementById("example1_results").classList.remove("hide")

    document.getElementById("step2").classList.remove("hide")

    // hide the button
    document.getElementById("b_example1").style.display = "none";
}

function example2() {
    document.getElementById("example2_results").classList.add("result");

    document.getElementById("example2_results").classList.remove("hide")

    document.getElementById("step3").classList.remove("hide")

    // hide the button
    document.getElementById("b_example2").style.display = "none";
}

function example3() {
    // set up our variables
    var firstname = document.getElementById("first_name");
    var lastname = document.getElementById("last_name");

    // grab the values from the elements
    var results = 
    firstname.value + ' ' + lastname.value;

    // set the results to the HTML element
    document.getElementById("example3_results").innerHTML = 
    results;

    document.getElementById("example3_results").classList.add("result");
}