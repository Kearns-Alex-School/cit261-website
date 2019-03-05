function save(){
    var response=document.getElementById("response");
    var data = 'data='+document.getElementById("data").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        response.innerHTML='<a href="files/'+xmlhttp.responseText+'.txt">'+xmlhttp.responseText+'.txt</a>';
      }
    }
    xmlhttp.open("POST","save.php",true);
    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}