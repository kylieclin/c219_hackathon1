$(document).ready(startApp);

var newGame;
var potion ={
    color: ['red', 'blue', 'yellow'],//, 'black'],
    numbers: [1,2,3]
}

function startApp(){
    // var gameObj = { //all the marbles + // all the potion  }
    newGame = new Game(potion);
    newGame.generatePotion();
}

