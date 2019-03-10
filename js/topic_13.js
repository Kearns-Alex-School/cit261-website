window.intervalid = '';

function audioPlayer(){
    $("#audio")[0].src = $("#playlist li a")[0];
    $("#playlist li a").click(function(e){
       e.preventDefault(); 
       $("#audio")[0].src = this;
       $("#playlist li").removeClass("active");
        $(this).parent().addClass("active");
    });
}

function setupPaint() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    
    var painting = document.getElementById('paint');
    var paint_style = getComputedStyle(painting);
    canvas.width = parseInt(paint_style.getPropertyValue('width'));
    canvas.height = parseInt(paint_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    
    canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.lineWidth = document.getElementById("brush").value;
    ctx.strokeStyle = document.getElementById("color").value;
    }, false);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
    
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);
    
    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseleave', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    })
    
    var onPaint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };
}

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