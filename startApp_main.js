$(document).ready(startApp);

var currPlayer = 1;
var currPlayerDone = false;

var newGame;
var potion ={
    color: ['red', 'blue', 'yellow'],//, 'black'],
    setnum: 3
}


function startApp(){
    newGame = new Game(potion);
    newGame.generatePotion();
    newGame.createGameBoard();
    newGame.getGameRows();
}

