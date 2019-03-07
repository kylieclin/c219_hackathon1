$(document).ready(startApp);

var newGame;
var potion ={
    color: ['red', 'blue', 'yellow'],//, 'black'],
    numbers: [1,2,3]
}

function startApp(){
    debugger;
    // var gameObj = { //all the marbles + // all the potion  }
    // newGame = new Game();
    // newGame.generatePotion(potion);
    var newPotion=new Potion();
    newPotion.createPotion(potion)
}

