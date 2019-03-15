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
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=48111,us&units=imperial&appid=16872869c55bacf84d3ac635e9c25bc6', true);

  request.onload = function () {
    // Begin accessing JSON data here
    console.log(this.response);
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      console.log(data);

      updateResults(data);
    } else {
      console.log('error');
    }
  }

  // Send request
  request.send();
}

function updateResults(data) {
  var table = document.getElementById("weather_results");

  var newHTML = 
  '<tr>' +
      '<th>Location</th>' +
      '<td>' + '</td>' +
  '</tr>' +
  '<tr>' +
      '<th>Current</th>' +
      '<td>' + '</td>' +
  '</tr>' +
  '<tr>' +
      '<th>High/Low</th>' +
      '<td>' + '</td>' +
  '</tr>' +
  '<tr>' +
      '<th>Humidity</th>' +
      '<td>' + '</td>' +
  '</tr>' +
  '<tr>' +
      '<th>Wind Speed</th>' +
      '<td>' + '</td>' +
  '</tr>' +
  '<th>Sunrise</th>' +
    '<td>' + '</td>' +
  '</tr>' +
  '<th>Sunset</th>' +
    '<td>' + '</td>' +
  '</tr>';

  table.innerHTML = newHTML;
}

/******
* Parameters:
coord
coord.lon City geo location, longitude
coord.lat City geo location, latitude
weather (more info Weather condition codes)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
weather.description Weather condition within the group
weather.icon Weather icon id
base Internal parameter
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
main.humidity Humidity, %
main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa
wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
wind.deg Wind direction, degrees (meteorological)
clouds
clouds.all Cloudiness, %
rain
rain.1h Rain volume for the last 1 hour, mm
rain.3h Rain volume for the last 3 hours, mm
snow
snow.1h Snow volume for the last 1 hour, mm
snow.3h Snow volume for the last 3 hours, mm
dt Time of data calculation, unix, UTC
sys
sys.type Internal parameter
sys.id Internal parameter
sys.message Internal parameter
sys.country Country code (GB, JP etc.)
sys.sunrise Sunrise time, unix, UTC
sys.sunset Sunset time, unix, UTC
id City ID
name City name
cod Internal parameter
*/