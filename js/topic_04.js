window.onload = function() {
    loadSelect();
}

function loadSelect() {
    var select = document.getElementById("lname");

    // clear what we have in our drop down
    select.innerHTML = '';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var data = JSON.parse(xmlhttp.responseText);

            for (var index = 0; index < data.length; index++) {
                var option = document.createElement("option");
                option.text = data[index];
                option.value = data[index];
                select.add(option);
            }

            select.selectedIndex = 1;
        }
    }
    xmlhttp.open("GET","../php/getdirectories.php",true);
    xmlhttp.send();
}

function save() {
    if (document.getElementById("sname").value === "")
    {
        alert("Please specify a save name.");
        return;
    }

    var data = 
    'data=' + document.getElementById("data").value + '&' +
    'file=' + document.getElementById("sname").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        loadSelect();
      }
    }
    xmlhttp.open("POST","../php/save.php",true);

    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}

function load() {
    var xhttp = new XMLHttpRequest();
    var name = document.getElementById("lname").value
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("results").innerHTML = this.responseText;

        response.innerHTML='<a href="../content/'+ name + '.txt" target="_blank">' + name + '.txt</a>';
        document.getElementById("results").classList.remove('hide');
      }
    };
    xhttp.open("GET", "../content/" + name + ".txt", true);
    xhttp.send();
}

/*
 * Update 1
 */

 function loadWeather() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      /*data.forEach(movie => {
        console.log(movie.title)
      })*/
      console.log(data)
    } else {
      console.log('error')
    }
  }

  // Send request
  request.send()
}