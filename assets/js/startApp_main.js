$(document).ready(startApp);

var currPlayer = 'A';
var currPlayerDone = false;

var newGame;
var potion ={
    color: ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'],
    setnum: 5
}

function startApp(){
    newGame = new Game(potion);
    newGame.createGameBoard();
    newGame.getGameRows();
    newGame.addEventListener();
}
