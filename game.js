var gamePattern = [];
var clickedPattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

// jQuery event listener that starts the game if a key is pressed & level = 0.
$(document).keydown(function () {
  if (!started) {
    $('h1').text("Level: " + level);
    nextSequence();
    started = true;
  }
})

// Event listener that pushes user clicked pattern to array and checks answer.
$('.btn').click(function() {
  var userChosenColor = this.id;
  clickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(clickedPattern.length - 1);
});

// Checks to see if answers are correct one by one as the user clicks buttons.
// Calls nextSequence() if correct or calls startOVer() if incorrect.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {

    if (clickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart!")

    startOver();
  }
}

// Raises the level, changes the h1 text, and continues the gamePattern.
function nextSequence() {
  clickedPattern = [];

  level++;

  $('h1').text("Level: " + level);

  var randomNumber = Math.floor(Math.random() * 4 );
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("." + randomChosenColor).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + (".mp3"));
  audio.play();

  for (var i = 0; i < gamePattern.length; i++) {
    setTimeout (function () {
      playSound(gamePattern[i]);
      animatePress(gamePattern[i]);
    }, 500);
  }
}

// Plays sounds that corresponds to the button pressed.
function playSound (name) {
  var colorSound = new Audio("sounds/" + name + (".mp3"));
  colorSound.play();
}

// Animates the button presses.
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// Restars the variables allowing the game to be restarted.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
