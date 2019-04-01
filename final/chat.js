window.intervalid = '';

var chat =  new Chat();
var instanse = false;
var state;
var mes;
var file;

function Entry(funct) {
  var enterbutton = document.getElementById("enter");
  var exitbutton = document.getElementById("exit");
  var mainchat = document.getElementById("main");

  var name = document.getElementById("name");
  var group = document.getElementById("group");
  var usergreating = document.getElementById("user_greeting");

  switch(funct) {
    case 'enter':
      if (!group.value || group.value ==='') {
        group.value = 'Public';
      }
    
      if (!name.value || name.value === '') {
        name.value = 'Guest';
      }
    
      mainchat.classList.remove("hide");
      exitbutton.classList.remove("hide");
      enterbutton.classList.add("hide");

      name.disabled  = true;
      group.disabled  = true;
    
      usergreating.innerHTML = "Welcome " + name.value;
    
      //intervalid = setInterval('chat.update()', 1000);;
      break;
    
    case 'exit':
      mainchat.classList.add("hide");
      exitbutton.classList.add("hide");
      enterbutton.classList.remove("hide");

      name.disabled  = false;
      group.disabled  = false;
    
      //clearInterval(intervalid);
      break;
  }
  
}


function Chat () {
  this.update = updateChat;
  this.send = sendChat;
  this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat() {

  if(!instanse){
    instanse = true;

    var data = 
      'function=getState&' +
      'group=chat';

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        //var data = JSON.parse(this.responseText);
        var data = this.responseText;

        state = data.state;
        instanse = false;

        console.log('Yes');
      }
    }

    xmlhttp.open("POST","process.php",true);

    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
  }



	/*if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			url: "process.php",
			data: {'function': 'getState', 'file': file},
			dataType: "json",	
			success: function(data) {state = data.state;instanse = false;}
		});
	}	*/
}

//Updates the chat
/*function updateChat() {
	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			url: "process.php",
			data: {'function': 'update','state': state,'file': file},
			dataType: "json",
			success: function(data) {
				if(data.text){
					for (var i = 0; i < data.text.length; i++) {
						$('#chat-area').append($("

						"+ data.text[i] +"

						"));
					}	
				}
				document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				instanse = false;
				state = data.state;
			}
		});
	}
	else {
		setTimeout(updateChat, 1500);
	}
}

//send the message
function sendChat(message, nickname) { 
	updateChat();
	$.ajax({
		type: "POST",
		url: "process.php",
		data: {'function': 'send','message': message,'nickname': nickname,'file': file},
		dataType: "json",
		success: function(data){
			updateChat();
		}
	});
}*/