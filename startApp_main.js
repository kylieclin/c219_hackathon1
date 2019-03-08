$(document).ready(startApp);

var currPlayer = 'A';
var currPlayerDone = false;

var newGame;
var potion ={
    color: ['red', 'blue', 'yellow'],
    setnum: 3
}

function startApp(){
    newGame = new Game(potion);
    newGame.generatePotion();
    newGame.createGameBoard();
    newGame.getGameRows();
}
