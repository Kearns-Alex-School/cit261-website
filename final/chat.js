window.intervalid = '';

var chat =  new Chat();
var instanse = false;
var state = 0;
var mes;
var file;

function Entry(funct) {
  var enterbutton = document.getElementById("enter");
  var exitbutton = document.getElementById("exit");
  var mainchat = document.getElementById("main");
  var chat = document.getElementById("chat-area");

  var name = document.getElementById("name");
  var group = document.getElementById("group");
  var usergreating = document.getElementById("user_greeting");

  switch(funct) {
    case 'enter':
      state = 0;

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
    
      intervalid = setInterval('chat.update()', 1000);;
      break;
    
    case 'exit':
      mainchat.classList.add("hide");
      exitbutton.classList.add("hide");
      enterbutton.classList.remove("hide");

      chat.innerHTML = '';

      name.disabled  = false;
      group.disabled  = false;
    
      clearInterval(intervalid);
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
  var group = document.getElementById("group");

  if(!instanse){
    instanse = true;

    var senddata = 
      'function=getState' +
      '&group=' + group.value;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        // debug step through this part and see what we get
        var data = JSON.parse(this.responseText);

        state = data.state;
        instanse = false;

        console.log('Get state of chat');
      }
    }

    xmlhttp.open("POST","process.php",true);

    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(senddata);
  }
}

//Updates the chat
function updateChat() {
  var group = document.getElementById("group");
  var name = document.getElementById("name").value;

  if(!instanse) {
    instanse = true;

    var senddata = 
      'function=update' +
      '&group=' + group.value + 
      '&state=' + state;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var data = JSON.parse(this.responseText);
        var chat = document.getElementById("chat-area");

        if(data.text) {
					for (var i = 0; i < data.text.length; i++) {
            var array = data.text[i].split("|");
            var user = array[0];
            var message = array[1];
            var time = array[2];

            var node = document.createElement("div");

            var html = 
              "<p>" + user + "</p>" + 
              "<p>" + message + "</p>";

            node.classList.add('container');

            if (user !== name) {
              node.classList.add('darker')
              html = html +
                '<span class="time-left">' + time + '</span>';
            }
            else {
              html = html +
                '<span class="time-right">' + time + '</span>';
            }

            node.innerHTML = html;

            chat.appendChild(node);
          }	
          
          chat.scrollTop = chat.scrollHeight;
        }

        state = data.state;
        instanse = false;

        console.log('update Chat');
      }
    }

    xmlhttp.open("POST","process.php",true);

    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(senddata);
	}
	else {
		setTimeout(updateChat, 1500);
	}
}

//send the message
function sendChat(message, nickname) { 
  updateChat();
  
  var senddata = 
    'function=send' +
    '&group=' + group.value + 
    '&message=hello' + 
    '&nickname=alex';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      updateChat();

      console.log('send chat');
    }
  }

  xmlhttp.open("POST","process.php",true);

  //Must add this request header to XMLHttpRequest request for POST
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(senddata);
}