window.intervalid = '';
window.instance   = false;
window.lines      = 0;
window.file;

var chat          = new Chat();

function Login(action) {
  // set up all of the variables that we could be using here
  var loginbutton  = document.getElementById("login");
  var logoutbutton = document.getElementById("logout");
  var mainchat     = document.getElementById("main");
  var chatbox      = document.getElementById("chat");
  var user         = document.getElementById("user");
  var file         = document.getElementById("file");
  var greating     = document.getElementById("greeting");

  switch(action) {
      /* LOGIN */
    case 'login':
      // reset the number of lines we have read so we can get all of the messages at once
      lines = 0;

      // check if we need to make it the default file
      if (!file.value || file.value ==='') {
        file.value = 'Public';
      }
    
      // check if we need to make it the default user
      if (!user.value || user.value === '') {
        user.value = 'Guest';
      }
      
      // make our chat areas and logout visable
      mainchat.classList.remove("hide");
      logoutbutton.classList.remove("hide");

      // make the login button hidden
      loginbutton.classList.add("hide");

      // disable the user and group until they logout
      user.disabled = true;
      file.disabled = true;
    
      // greet our user
      greating.innerHTML = "Welcome " + user.value;
    
      // update what is in the chat
      chat.update();

      // set an auto update function
      intervalid = setInterval('chat.update()', 1000);
      break;
    
      /* LOGOUT */
    case 'logout':
      // kill the automatic updates
      clearInterval(intervalid);

      // make our chat areas and logout hidden
      mainchat.classList.add("hide");
      logoutbutton.classList.add("hide");

      // make the login button visable
      loginbutton.classList.remove("hide");

      // clear our chat log
      chatbox.innerHTML = '';

      // enable our user and group until they login
      user.disabled  = false;
      file.disabled  = false;
      break;
  }
}

function CheckEnterPressed() {
  // check for the enterkey
  var key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    // send out message
    SendMessage();

    // return false so we do not add the '/n'
    return false;
  }
  else {
    // return true so we add whatever key was pressed
    return true;
  }
}



/*******************************
 * C H A T   F U N C T I O N S *
 *******************************/


function Chat () {
  this.update = UpdateChat;
  this.send = SendMessage;
}

function UpdateChat() {
  // check to see if we are already in this update
  if (!instance) {

    // set our flag so we do not walk on ourself
    instance = true;

    // prep the sendData
    var sendData = 
      'function=update' +
      '&file=' + file.value + 
      '&lines=' + lines;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        // parse the JSON we get back
        var data = JSON.parse(this.responseText);
        var chat = document.getElementById("chat");

        // check to see if we got data back
        if(data.text) {
					for (var i = 0; i < data.text.length; i++) {
            // parse out the line and assign them to variables
            var array = data.text[i].split("|");
            var muser = array[0];
            var message = array[1];
            var time = array[2];

            // create a new node to create
            var node = document.createElement("div");

            // build what we will put inside
            var html = 
              "<p>" + muser + "</p>" + 
              "<p>" + message + "</p>";

            // add the container class to the node
            node.classList.add('container');

            // decide if we are the user or not
            if (muser !== user.value) {
              node.classList.add('darker');
              html = html +
                '<span class="time-right">' + time + '</span>';
            }
            else {
              html = html +
                '<span class="time-left">' + time + '</span>';
            }

            // assign the inner html
            node.innerHTML = html;

            // add the node to the chat window
            chat.appendChild(node);
          }	
          
          // scroll to show the most recent message that was added
          chat.scrollTop = chat.scrollHeight;
        }

        // update the number of lines we have read
        lines = data.lines;

        // reset the flag
        instance = false;
      }
    };

    xmlhttp.open("POST","process.php",true);

    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendData);
	}
	else {
		setTimeout(UpdateChat, 1500);
	}
}

function SendMessage() {
  // establish our variables for this funciton
  var message = document.getElementById("message");
  
  // prep our sendData
  var sendData = 
    'function=send' +
    '&file=' + file.value + 
    '&message=' + message.value + 
    '&user=' + user.value;

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      // update the chat to show your message
      UpdateChat();
    }
  };

  xmlhttp.open("POST","process.php",true);

  //Must add this request header to XMLHttpRequest request for POST
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(sendData);

  // set the message box to nothing
  message.value = "";
}