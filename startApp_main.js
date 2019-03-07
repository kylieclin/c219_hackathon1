$(document).ready(startApp);

var newGame;
var potion ={
    color: ['red', 'blue', 'yellow'],//, 'black'],
    numbers: [1,2,3]
}

function startApp(){
    newGame = new Game(potion);
    newGame.generatePotion();
    newGame.createGameBoard();

}

