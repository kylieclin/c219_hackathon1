class Potion{

    constructor(potionInfo, player, callback){
        
        this.color= potionInfo.color;
        this.numbers= potionInfo.numbers;
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
            var temp=$('<div>',{
                'css':{
                    'background-color': this.color[pIndex],
                },
                'text':this.numbers[pIndex],
                'class': 'potionslot'
            })
            var tempText = $('<p>',{
                'class': 'slotsleft ' + this.color[pIndex] + this.player,
                'text': this.numbers[pIndex]
            })
            
            this.dom.push(temp);
            $(temp).append(tempText);
            potionContainer.append(temp);

        };  
        return potionContainer;
    }
    checkFilledStatus(){
        debugger;
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