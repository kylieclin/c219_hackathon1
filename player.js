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
        this.fillPotion = this.fillPotion.bind(this);
    }
    
    generatePotion(){
        for(var player = 0; player < this.player; player++){
        var newPotion = new Potion(this.potionData, player, this.fillPotion);
        var potionNeedtoRender= newPotion.renderPotion();
        this.playerpotions.push(newPotion);
        console.log(newPotion);
        var playIndex = '.player'+ player+'-has';
        $(playIndex).append(potionNeedtoRender);
        }
        this.selectPlay(); // randomly select
    }

    createGameBoard(){
        this.dispenser = new Dispenser(5);
        this.dispenserContainerDom.append(this.dispenser.render());
        this.dispenser.randomlyCreateRowColors();
        this.dispenser.createRow();
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    checkMarbles(){
        
    }
 
    checkWin(checkFilled){
        if(checkFilled){
            $('#modal').toggleClass('hide');
            console.log('win!!!!!!!!!!!!!');
        }
    }
    fillPotion(potion){
        var marblesArr = [{marblecolor: 'red'},{marblecolor: 'yellow'},{marblecolor: 'blue'}]; //fake
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
        this.changePlayer(potion);
        var checkFilled = potion.checkFilledStatus();
        this.checkWin(checkFilled);
        console.log('Filled is: ' + checkFilled);//should return this somewhere;
        return marbles; //the leftover marbles
    }
    changePlayer(potion){
        var player = potion.player;
        console.log(player);
        var currentPlay = '.player'+player+'-container'
        if(player === 0){
            var nextPlay = '.player1-container';
        } else {
            var nextPlay = '.player0-container';
        }
        $(currentPlay).css({
                'opacity': '0.1',
                'pointer-events': 'none'
            });
        $(nextPlay).css({
            'opacity': '1',
            'pointer-events': 'auto'
        });
        // currPlayerDone = true;
    }
    selectPlay(){
        var player = Math.floor(Math.random()*2);
        var currentPlay = '.player'+player+'-container';
        $(currentPlay).css({
            'opacity': '0.1',
            'pointer-events': 'none'
        });
    }
    domForCollectMarbles(marbles){
        debugger;
        var marblesArr = [{marblecolor: 'red'},{marblecolor: 'yellow'},{marblecolor: 'blue'}]; //fake
        for(var colorIndex = 0 ; colorIndex < marblesArr.length; colorIndex++){
            var colorDiv = $('<div>',{
                css:{
                    'background-color' : marblesArr[colorIndex].marblecolor,
                },
                class: 'collectedMarbles'
            })
            $('.collector-box').append(colorDiv);
        }
    }

}







