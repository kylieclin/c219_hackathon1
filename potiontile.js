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
        debugger;
        var copyColor = this.color.concat();
        var potionContainer=$('<div>').addClass('potionContainer').click(this.fillPotionClick);
        for(var potioncontent = 0; potioncontent < 3; potioncontent++){
            var randomnum = Math.floor(Math.random()*this.setNum+1);
            var pIndex = Math.floor(Math.random()*copyColor.length);
            var temp=$('<div>',{
                'css':{
                    'background-color': copyColor[pIndex],
                },
                'text': randomnum +' /',
                'class': 'potionslot'
            })
            var tempText = $('<p>',{
                'class': 'slotsleft ' + copyColor[pIndex] + this.player,
                'text': randomnum
            })
            this.numbers.push(randomnum);
            this.dom.push(temp);
            $(temp).append(tempText);
            potionContainer.append(temp);
            debugger;
            copyColor.splice(pIndex, 1);

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