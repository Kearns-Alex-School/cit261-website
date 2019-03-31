function save() {
    if (document.getElementById("user").value === "")
    {
        alert("Please specify a user.");
        return;
    }

    var data = 
    'user=' + document.getElementById("user").value + '&' +
    'group=' + document.getElementById("group").value + '&' +
    'message=' + document.getElementById("message").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        //loadSelect();
        //refresh the message board
        console.log('Yes');
      }
    }
    xmlhttp.open("POST","messagetxt.php",true);

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