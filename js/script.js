
var gameStatus = false;
var score = 0;
var fondo = $('.fondo')[0];
var listoParaEmpezar = false;
var scoreboard = [];
var sword = new Audio('sounds/029.wav');
var swordHit = new Audio('sounds/033.wav');
var hit = new Audio('sounds/014.wav');
var fire = new Audio('sounds/021.wav');
var evade = new Audio('sounds/008.wav');
var power = new Audio('sounds/power.mp3');
power.volume = 0.5;

$("#comenzar").on("click", function() {
  var obstaculos = $(".contenedor");
  for (var i = 0; i < obstaculos.length; i++) {
    $(obstaculos[i]).remove();
  }
  listoParaEmpezar = true;
  $(".battousai").slideToggle();
  $(".start").slideToggle();
  $(".juego").slideToggle();
  power.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
power.play();
})

$(document).keydown(function(e){
  if (e.keyCode === 39 && !(gameStatus) && listoParaEmpezar) {
    var obstaculos = $(".contenedor");
    for (var i = 0; obstaculos[i] != null; i++) {
      $(obstaculos[i]).remove();
    }
    $(".fondo").addClass("fondoAnimado");
    $(".chaboncito").removeClass("quieto");
    $(".chaboncito").removeClass("muerteF");
    $(".chaboncito").removeClass("muerte");
    $(".chaboncito").addClass("corriendo");
    $(".start").css("visibility", "hidden");
    fondo.style.webkitAnimationPlayState="running";
    $(".chaboncito").css("left", '90px');
    gameStatus = true;
    setTimers();
  }
  else if (e.keyCode === 38 && !($(".chaboncito").hasClass("quieto")) && !($(".chaboncito").hasClass("attack")) && gameStatus&& !($(".chaboncito").hasClass("muerte")) && !($(".chaboncito").hasClass("muerteF"))) {
    $(".chaboncito").removeClass("corriendo");
    $(".chaboncito").addClass("saltando");
    evade.play();
    $(".chaboncito").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".chaboncito").removeClass("saltando");
      $(".chaboncito").addClass("corriendo");
    });
  }
  else if (e.keyCode === 40 && !($(".chaboncito").hasClass("saltando")) && !($(".chaboncito").hasClass("quieto")) && gameStatus && !($(".chaboncito").hasClass("muerte")) && !($(".chaboncito").hasClass("muerteF"))) {
    $(".chaboncito").removeClass("corriendo");
    $(".chaboncito").addClass("attack");
    sword.play();
    $(".chaboncito").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".chaboncito").removeClass("attack");
      $(".chaboncito").addClass("corriendo");
    });
  }
})

function gameOver() {
  listoParaEmpezar = true;
  var obstaculos = $(".contenedor");
  if (obstaculos.length > 1) {
    for (var i = 0; i < obstaculos.length; i++) {
      $(obstaculos[i]).stop(true, false);
    }
  }
  fondo.style.webkitAnimationPlayState="paused";
  agregarOrdenado(score);
  mostrarScoreboard();
  score = 0;
  $(".start p").html("reiniciar");
  $(".start").css("visibility", "visible");
}

var enemigo = '<div class="contenedor"><div class="enemigo"></div></div>'
var obstaculo = "<div class='contenedor'><div class='fireball'></div></div>"

var puntoChoque =$(".fondo").width() - 250;


function addObstacle(velocidad) {
  if (!gameStatus) {
    return;
  }
  $(".fondo").append(obstaculo);
  var obstaculos = $(".contenedor");
  var obstaculoActual = obstaculos[obstaculos.length - 1];
  $(obstaculoActual).animate({
    right: puntoChoque+"px"},
    velocidad,
    "linear",
    function(){
      var enemy = $(obstaculoActual).find(".fireball");
      if ($(".chaboncito").hasClass("saltando")) {//battousai lo esquivo
        score += 500;
        mostrarBonus('+500');
        $(obstaculoActual).animate({right: $(".fondo").width()}, 200, "linear", function () {
          $(obstaculoActual).remove();
        });
      }
      else if(gameStatus){//battousai fue golpeado por la bola de fuego
        fondo.style.webkitAnimationPlayState="paused";
        listoParaEmpezar = false;
        gameStatus = false;
        var obstaculos = $(".contenedor");
        for (var i = 0; obstaculos[i] != null; i++) {
          if (obstaculos[i] != obstaculoActual) {
            $(obstaculos[i]).stop(true, false);
            $(obstaculos[i]).remove();
          }
        }
        fire.play();
        $(enemy).removeClass("fireball");
        $(enemy).addClass("fireballDestr");
        $(obstaculoActual).animate({right: $(".fondo").width()-80}, 400, "linear", function () {
          $(obstaculoActual).remove();
        });
        $(".chaboncito").removeClass("corriendo");
        $(".chaboncito").removeClass("attack");
        $(".chaboncito").addClass("muerteF");
        $(".chaboncito").animate({left: 350}, 600, "linear", function () {
          gameOver();
        });
      }
      else{
        obstaculoActual.remove();
      }
    }
  )
}

function agregarOrdenado(num){
  var pos = 0;
  while (scoreboard[pos] > num) {
    pos += 1;
  }
  for (var i = scoreboard.length - 1; i >= pos; i--) {
    scoreboard[i+1] = scoreboard[i]
  }
  scoreboard[pos] = num;
}

function mostrarScoreboard(){
  var puntuaciones = '<span class="col-xs-12">Scoreboard</span>';
  for (var i = 0; i < scoreboard.length; i++) {
    var puntuaciones = puntuaciones + '<div class="col-xs-3">'+'<span>'+(i+1)+'</span>  '+scoreboard[i]+'</div>' ;
  }
  $(".scoreboard").html(puntuaciones);
}

function addEnemy(velocidad) {
  // se encarga de crear enemigos y darles funciones cuando son esquivados, atacados o cuando golpean a battousai
  if (!gameStatus) {//en caso de que el juego halla terminado y exista un enemigo esperando a ser creado por el timeout
    return;
  }
  $(".fondo").append(enemigo);
  var obstaculos = $(".contenedor");
  var obstaculoActual = obstaculos[obstaculos.length - 1];
  var puntoE = puntoChoque;
  $(obstaculoActual).animate(
    {right: puntoE+"px"},
    velocidad,
    "linear",
    function(){
      var enemy = $(obstaculoActual).find(".enemigo");
      if ($(".chaboncito").hasClass("saltando")) {//battousai lo esquivo
        score += 500;
        mostrarBonus('+500');
        $(enemy).removeClass("enemigo");
        $(enemy).addClass("enemigoAttack");
        $(obstaculoActual).animate({right: $(".fondo").width()}, 400, "linear", function () {
          $(obstaculoActual).remove();
        });
      }
      else if ($(".chaboncito").hasClass("attack")) {//battousai lo ataco
        swordHit.play();
        score += 1000;
        mostrarBonus('+1000');
        $(enemy).removeClass("enemigo");
        $(enemy).addClass("enemyDeath");
        $(obstaculoActual).animate({right: $(".fondo").width()-80}, 400, "linear", function () {
          $(obstaculoActual).remove();
        });
      }
      else if(gameStatus){//battousai fue golpeado por el enemigo
        fondo.style.webkitAnimationPlayState="paused";
        listoParaEmpezar = false;
        gameStatus = false;
        var obstaculos = $(".contenedor");
        for (var i = 0; obstaculos[i] != null; i++) {
          if (obstaculos[i] != obstaculoActual) {
            $(obstaculos[i]).stop(true, false);
            $(obstaculos[i]).remove();
          }
        }
        hit.play();
        $(enemy).removeClass("enemigo");
        $(enemy).addClass("enemigoAttack");
        $(obstaculoActual).animate({right: $(".fondo").width()-80}, 400, "linear", function () {

        });
        $(".chaboncito").removeClass("corriendo");
        $(".chaboncito").removeClass("attack");
        $(".chaboncito").addClass("muerte");
        $(".chaboncito").animate({left: 350}, 600, "linear", function () {
          gameOver();
        });
      }
      else{
        obstaculoActual.remove();
      }
    }
  )
}

function mostrarScore() {
  $("#puntos").html(score)
}

function mostrarBonus(bonus) {
  $(".fondo").append('<p class="popup"><span class="signo">+</span>'+bonus+'</p>')
  var bonusAr = $(".popup").length;
  var bonusActual = $(".popup")[bonusAr - 1];
  $(bonusActual).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
  function(e) {
    $(bonusActual).slideUp(500);
  });
}

function random(maximo) {
  var retorno = Math.floor(Math.random()*maximo);
  return  retorno;
}

function setTimers() {
  var tScore = setInterval(function() {
      if (gameStatus) {
        score += 1;
        mostrarScore();
      }
      else {
        clearTimeout(tScore);
      }
    }, 50)

  var timer = setInterval(function() {
    if (gameStatus) {
      var delay = random(5000);
      var velocidad = random(2000)+500;
      if (random(2) === 0) {
        setTimeout('addEnemy('+velocidad+')', delay);
      }
      else{
        velocidad = 1000;
        setTimeout('addObstacle('+velocidad+')', delay);
      }
    }
    else {
      clearTimeout(timer);
    }
  }, 1000);
}
