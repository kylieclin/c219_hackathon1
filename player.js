//game (potionobj, marbleobj)
class Game{
    constructor(potionData){
        // this.marble;
        // this.potion;
        // this.score;
        // this.marbles =  new Marbles();
        this.player = 2;
        this.potionData = potionData;
        this.dispenser = null;
        this.dispenserContainerDom=$('.board-container');
    }
    //click (event listener)
    addEventListener(){
        //.click to pick the potion
        //.click to pick marbles
        //.click to move the marbles
    }    
    
    //1)generate marbles
    generateMarble(){
        //get the marble datas from main.js s
        //pass into class marble
    
    }
    //2)generate potion
       
    // generatePotion(){
    //     for(var player = 1; player <= this.player; player++){
    //     var newPotion = new Potion(this.potionData);
    //     var potionNeedtoRender= newPotion.renderPotion();
    //     var playIndex = '.player'+ player+'-has';
    //     $(playIndex).append(potionNeedtoRender);
    //     }
    // }

    // checkPotion(){
    //     this.potion.checkFillStatus();
    // }
    
    //3)change player
        //define whos turn to play (even/odd or boolean)
    changePlayer(){
        if(firstplayer){
            //firstplayer play
            firstplayer = true;
        } else {
            //secondplayer play
            firstplayer = false;
        }
    }
    
    //4)pick/show potions
        //let player to pick potions?
        //place the potion to the player's box
    // pickPotion(){
    //     //player take turns pick potion
    //     //click to choose
    // }
    //5)pick marbles
    pickMarble(){
        //pick marbles
        //put the marbles in the marble container
    }
    
    //6)show picked/earned marbles
    renderPickedMarbles(){
        //get total marbles from the collected marble container
        //get mouse position
        //call the get marbles function
        //move the marbles as call back
        //give up the marble
    }
    
    //7)move marbles
        //flusk that holds three marbles
        //get the current potion data and detail for potions that you can hold in
        //move marbles from the marble comtainer to the player's panel   
    moveMarble(){
        //get the mouse poistion
        //first click select the marble, second click move the marble
    }
    
    //8)check player's potion
        // reveal the portion once all the marbles are collect
        //add scores
        //and change player after done

    
    winGame(){
        //win the game
        //render status (count score)
        //default set to if any potion is full?
    }
    
    //reset(extra)
    createGameBoard(){
        this.dispenser = new Dispenser(9);
        this.dispenserContainerDom.append(this.dispenser.render());
        this.dispenser.createRow();
    }
}







