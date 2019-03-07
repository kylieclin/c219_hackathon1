$(document).ready(startApp);

var newGame;
var potion ={
    color: ['maroon', 'dimgray', 'darkcyan', 'goldenrod'],//, 'black'],
    setnum: 3
}

function startApp(){
    newGame = new Game(potion);
    newGame.generatePotion();
    newGame.createGameBoard();
    newGame.getGameRows();
}
