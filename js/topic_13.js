window.intervalid = '';

function starting() {
    var metronome = document.getElementById("metronome");
    var tempo = document.getElementById("tempo").value;

    metronome.style.animationDuration = tempo + 's';

    if (!metronome.classList.contains("bounce")) {
        metronome.classList.add("bounce");
    }

    var breathe = document.getElementById("breathe");
    var length = document.getElementById("length").value;

    breathe.style.animationDuration = length + 's';

    if (!breathe.classList.contains("grow")) {
        breathe.classList.add("grow");
    }

    var breathe_text = document.getElementById("breathe_text");

    breathe_text.style.animationDuration = length + 's';

    if (!breathe_text.classList.contains("breathe")) {
        breathe_text.classList.add("breathe");
    }

    intervalid = setInterval(changeText,(length * 1000));
}

function changeText() {
    var element = document.getElementById("breathe_text");

    if(element.innerText === "Breathe In" ) {
        element.innerText = "Breathe Out";
    }
    else {
        element.innerText = "Breathe In";
    }
}

function resetting() {
    var metronome = document.getElementById("metronome");

    metronome.classList.remove("bounce");
    metronome.style.left = 0;

    var breathe = document.getElementById("breathe");

    breathe.classList.remove("grow");
    breathe.style.width = '0ch';

    var breathe_text = document.getElementById("breathe_text");

    breathe_text.classList.remove("breathe");
    breathe_text.style.fontSize = '0ch';

    breathe_text.innerText = "Breathe In";
    clearInterval(intervalid);
}

function audioPlayer(){
    var currentSong = 0;
    $("#audio")[0].src = $("#playlist li a")[0];
    $("#playlist li a").click(function(e){
       e.preventDefault(); 
       $("#audio")[0].src = this;
       $("#playlist li").removeClass("active");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("active");
    });
}