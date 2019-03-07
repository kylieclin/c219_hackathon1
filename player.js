//game (potionobj, marbleobj)
class Game{
    constructor(potionData){
        // this.marble;
        // this.potion;
        // this.score;
        // this.marbles =  new Marbles();
        this.player = 2; //temp
        this.potionData = potionData;
        this.playerpotions=[];
        this.dispenser = null;
        this.dispenserContainerDom=$('.board-container');
        this.totalRows = null;
    }
    
     generatePotion(){
        debugger;
        for(var player = 0; player < this.player; player++){
        var newPotion = new Potion(this.potionData, player, this.fillPotion);
        var potionNeedtoRender= newPotion.renderPotion();
        this.playerpotions.push(newPotion);
        console.log(newPotion);
        var playIndex = '.player'+ player+'-has';
        $(playIndex).append(potionNeedtoRender);
        }

        
        // newPotion.fillPotion(fakeM);  ***go somewhere later***
    }
    changePlayer(){
        if(firstplayer){
            //firstplayer play
            firstplayer = true;
        } else {
            //secondplayer play
            firstplayer = false;
        }
    }
    createGameBoard(){
        this.dispenser = new Dispenser(9);
        this.dispenserContainerDom.append(this.dispenser.render());
        this.dispenser.createRow();
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    checkMarbles(){
        
    }
 
    winGame(){
        //win the game
        //render status (count score)
        //default set to if any potion is full?
    }
    fillPotion(potion){
        var marblesArr = [{marblecolor: 'red'},{marblecolor: 'black'},{marblecolor: 'blue'}]; //fake
        debugger;
        var marbles = marblesArr.concat(); //copy the marbles array for slice
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){
                if(marblesArr[MIndex].marblecolor === potion.color[colorIndex] && potion.numbers[colorIndex] > 0){
                    potion.numbers[colorIndex] -=1;
                    marbles.splice(MIndex, 1);
                    var textClass = '.' + potion.color[colorIndex] + potion.player;
                    $(textClass).text(potion.numbers[colorIndex]);
                    console.log(marbles);
                }
            }
        }
        var checkFilled = potion.checkFilledStatus();
        console.log('Filled is: ' + checkFilled);//should return this somewhere;
        return marbles; //the leftover marbles
    }
    
    


}







