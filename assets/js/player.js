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
        this.reset = this.reset.bind(this);
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
        this.dispenser = new Dispenser(5, this.domForCollectMarbles);
        this.dispenserContainerDom.append(this.dispenser.render());
        this.dispenser.determineMarblesInRowAmount();
        this.generatePotion();
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    checkWin(checkFilled){
        if(checkFilled){
            $('#modal').toggleClass('hide');
        }
    }
    fillPotion(potion){
        var marblesArr = this.dispenser.collectedMarbles;
        debugger;
        var marbles = marblesArr.concat(); //copy the marbles array for slice
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){ //check marbles
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){ //check colors
                if(marblesArr[MIndex].marbleColor === potion.color[colorIndex] && potion.numbers[colorIndex] > 0){
                    potion.numbers[colorIndex] -=1;
                    potion.currentPotion[colorIndex] +=1;
                    marbles.splice(MIndex, 1);
                    var textClass = '.' + potion.color[colorIndex] + potion.player;
                    $(textClass).text( potion.currentPotion[colorIndex]);
                }
            }
        }
        this.changePlayer(potion);
        var checkFilled = potion.checkFilledStatus();
        this.checkWin(checkFilled);
        this.dispenser.returnMarblesToDispenser(marbles); //the leftover marbles
    }
    changePlayer(potion){
        var player = potion.player;
        console.log(player);
        var currentPlay = '.player'+player+'-container';
        var currentText = '.playerText'+player;
        if(player === 0){
            var nextPlay = '.player1-container';
            var nexttext = '.playerText1';
        } else {
            var nextPlay = '.player0-container';
            var nexttext = '.playerText0';
        }

        $(currentText).css('visibility', 'hidden').text('Pick a marble to make explotion!');
        $(nexttext).css('visibility', 'visible').text('Pick a marble to make explotion!');
        $(currentPlay).css({
                'opacity': '0.5',
                'pointer-events': 'none'
            }).toggleClass('playing');
    
        $(nextPlay).css({
            'opacity': '1',
            'pointer-events': 'auto'
        }).toggleClass('playing');
        $('.marble').toggleClass('marbleanima');
        $('.board-container').css('pointer-events', 'auto');
        $('.collector-box').empty();
    }
    selectPlay(){
        var nextplayer = Math.floor(Math.random()*2);
        var nextPlay = '.player'+nextplayer+'-container';
        $(nextPlay).css({
            'opacity': '0.5',
            'pointer-events': 'none'
        }).toggleClass('playing');
        var text = '.playerText'+ nextplayer;
        $(text).css('visibility', 'hidden');
        $('.marble').toggleClass('marbleanima');
    }
    domForCollectMarbles(){
        var marblesArr = this.collectedMarbles;
        for(var colorIndex = 0 ; colorIndex < marblesArr.length; colorIndex++){
            var colorDiv = $('<div>',{
                css:{
                    'background-color' : marblesArr[colorIndex].marbleColor,
                },
                class: 'collectedMarbles'
            })
            $('.collector-box').append(colorDiv);
        }
    }
    addEventListener(){
        $('.reset-button').click(this.reset);
    }
    reset(){
        location.reload();
        $('#modal').toggleClass('hide');
    }
}







