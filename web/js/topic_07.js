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
    var color = document.getElementsByName("color");
    var htmlresults = document.getElementById("example3_results");

    for (var index = 0, length = color.length; index < length; index++) {
        if (color[index].checked) {
            var error_element = document.getElementById("rgb_error");
            if (color[index].value == 'custom') {
                var red = document.getElementById("r_amount").value;
                var green = document.getElementById("g_amount").value;
                var blue = document.getElementById("b_amount").value;

                // check to see if we have valid numbers
                if (!validRGB(red) || !validRGB(green) || !validRGB(blue)) {
                    // notify the user
                    console.log(error_element.classList)

                    error_element.classList.remove("hide");
                    htmlresults.classList.add("hide");
                    return;
                }
                else {
                    error_element.classList.add("hide");
                }

                htmlresults.style.color = "rgb(" + red + ',' + green + ',' + blue + ')';
            }
            else {
                error_element.classList.add("hide");
                htmlresults.style.color = color[index].value;
            }

            htmlresults.classList.remove("hide");
        }
    }

    // grab the values from the elements
    var results = firstname.value + ' ' + lastname.value;

    // set the results to the HTML element
    htmlresults.innerHTML = results;

    // check to see if we already added the result class
    if (!htmlresults.classList.contains("result")) {
        htmlresults.classList.add("result");
    }
}

function validRGB(value) {
    if (value < 0 || 255 < value) {
        return false;
    }

    return true;
}