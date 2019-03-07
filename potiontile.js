class Potion{

    constructor(potionInfo, player){

        this.color= potionInfo.color;
        this.numbers= potionInfo.numbers;
        this.dom = [];
        this.player = player;
        this.renderPotion = this.renderPotion.bind(this);
    }
    renderPotion(){
        var potionContainer=$('<div>').addClass('potionContainer');
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
        var filled=null;
        for(var numIndex=0; numIndex < potionNum,length; numIndex++){
            if(potionNum[numIndex] != 0){
                return filled = false;
            }
        }
        return filled = true;
    }
}