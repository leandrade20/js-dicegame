/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, winner,gameRunning;

var inputScore, finalInputScore;

/* creating new rule if player get 6 twice in a row, they lose the entire score */
var lastDice;

// var inputScore;

init();
// dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector("#current-" + activePlayer).textContent = dice;
// This is another way to get the same effect as above
// var current = document.getElementById("current-0");
// current.innerHTML = '<em>' + dice + '</em>';

document.querySelector(".btn-roll").addEventListener("click", function () {
  //1. Random number
if(gameRunning){
  var dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  //2. Display the result
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";
  diceDom.src = "dice-" + dice + ".png";

  if(dice === 6 && lastDice === 6){
    document.querySelector("#score-" + activePlayer).textContent = 0;
    nextPlayer();
  }
  //3. Update round score IF the rolled number is NOT 1
  else if (dice !== 1) {
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // var score = document.querySelector("#current-" + activePlayer);
    // document.querySelector("#score-" + activePlayer) = score;
    nextPlayer();
  }

  lastDice = dice;
}
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  //get the round score
  if(gameRunning){
  scores[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
  // add roundscore to
  // gameWinner();

  

  if (scores[activePlayer] > (finalInputScore - 1)) {
    document.querySelector("#name-" + activePlayer).textContent = "WINNER";
    document.querySelector("#name-" + activePlayer).classList.add("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".dice").style.display = "none";
    gameRunning = false;
  } else {
    nextPlayer();
  }
}
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // ? means then and : means else
  // This is the same of
  //   if(activePlayer === 0){
  //       activePlayer = 1;
  //   } else{
  //       activePlayer = 0;
  //   }
  roundScore = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
// no () in the function cause it will only works on click of the .btn-new, it is different than annonymous function

function init() {
  scores = [0, 0]; //two elements because there are to players
  roundScore = 0;
  activePlayer = 0;
  winner = 0;
  gameRunning = true;


  
  document.querySelector(".finalscore-popup").style.display = "block";
  document.querySelector(".dice").style.display = "none";
  // way to insert css change
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector("#name-0").classList.remove("winner");
  document.querySelector("#name-1").classList.remove("winner");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}

document.querySelector(".start").addEventListener("click", function () {

  inputScore =  document.querySelector(".final-score").value;
  console.log(inputScore);
  document.querySelector(".finalscore-popup").style.display = "none";

  //Undefined, 0 , NULL or "" are coerce to false
  if(inputScore){
     finalInputScore = inputScore;
  }
  else{
    finalInputScore = 10;
  }
});


// function gameWinner() {
//   winner = document.querySelector("#score-" + activePlayer).textContent;
//   if (winner > 9) {
//     console.log("WINNER");
//   }
// }
