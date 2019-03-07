class Potion{

    constructor(potionInfo, player, callback){
        
        this.color= potionInfo.color;
        this.setNum = potionInfo.setnum;
        this.numbers= [];
        this.dom = [];
        this.player = player;
        this.callback = {
            click: callback
        }
        this.renderPotion = this.renderPotion.bind(this);
        this.fillPotionClick = this.fillPotionClick.bind(this);
    }
    renderPotion(){
        var potionContainer=$('<div>').addClass('potionContainer').click(this.fillPotionClick);
        for(var pIndex = 0; pIndex < this.color.length; pIndex++){
            var randomnum = Math.floor(Math.random()*this.setNum+1);
            var temp=$('<div>',{
                'css':{
                    'background-color': this.color[pIndex],
                },
                'text':this.color[pIndex][0].toUpperCase() + ' : ' + randomnum +' /',
                'class': 'potionslot'
            })
            var tempText = $('<p>',{
                'class': 'slotsleft ' + this.color[pIndex] + this.player,
                'text': randomnum
            })
            this.numbers.push(randomnum);
            this.dom.push(temp);
            $(temp).append(tempText);
            potionContainer.append(temp);

        };  
        return potionContainer;
    }
    checkFilledStatus(){
        var potionNum= this.numbers;
        var filled= true;
        for(var numIndex=0; numIndex < potionNum.length; numIndex++){
            if(potionNum[numIndex] != 0){
                filled = false;
                return filled;
            }
        }
        return filled;
    }
    fillPotionClick(){
        this.callback.click(this);
    }
}