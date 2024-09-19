var colores =["red", "blue", "green", "yellow"];
var patern =[];
var user_patern =[];
var select_in_random;
var started=false;
var level=0;
function nextSequence () {
    var number;
    user_patern=[];
    document.getElementById("level-title").innerHTML = "Level "+level;
    number =  Math.floor(Math.random() * 4);
    select_in_random=colores[number];
    
patern.push(select_in_random);
console.log("patern: "+patern);
fade(select_in_random);
sounds(select_in_random);
};

function fade (color){
        $("#"+color).fadeIn(200);
        $("#"+color).fadeOut(200);
        $("#"+color).fadeIn(200);

        

}

$(".btn").click(function() {
    var buttonpressed = $(this).attr("id");
    user_patern.push(buttonpressed);
    sounds(buttonpressed);
    animatePress(buttonpressed);
    checkAnswer(user_patern.length-1);
})

function sounds(sound){
    //console.log("sonido");
    var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(colorPressed) {
    $("#" + colorPressed).addClass("pressed");
    setTimeout(function () {
      $("#" + colorPressed).removeClass("pressed");
    }, 100);
    
  }

$(document).keypress(function (event) {
    if(!started){
    started=true;
    nextSequence();
    }
});

function checkAnswer(currentLevel){
  if(user_patern[currentLevel]==patern[currentLevel]){
    console.log("correcto");
    if(currentLevel==level){

        level++;
        nextSequence();
    }
  }                      
  else{ 
    console.log("error");
    sounds("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body" ).removeClass("game-over");

    }, 200);
    document.getElementById("level-title").innerHTML = "Game over, Press any key to restart ";
    restart();
  }
  setTimeout(1000);
  

}

function restart(){
    level=0;
    patern = [];
    started=false;
}