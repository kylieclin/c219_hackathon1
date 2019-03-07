class Potion{

    constructor(potionInfo){

        this.potionInfo={};
        this.potionInfo.color= potionInfo.color;
        this.potionInfo.numbers= potionInfo.numbers;
        this.potionInfo.dom = [];

        this.potionDom= null;
        this.renderPotion = this.renderPotion.bind(this);
    }
    renderPotion(){
        var potionContainer=$('<div>').addClass('potionContainer');
        for(var pIndex = 0; pIndex < this.potionInfo.color.length; pIndex++){
            this.potionDom=$('<div>',{
            'css':{
                'background-color': this.potionInfo.color[pIndex],
            },

            'text':this.potionInfo.numbers[pIndex],
            'class': 'potionslot'
            })

            this.potionInfo.dom.push(this.potionDom);
            potionContainer.append(this.potionDom);

        };  

        return potionContainer;
    }    
    checkFilledStatus(){
        debugger;
        var potionNum= this.potionInfo.numbers;
        var filled=null;
        for(var numIndex=0; numIndex < potionNum,length; numIndex++){
            if(potionNum[numIndex] != 0){
                return filled = false;
            }
        }
        return filled = true;
    }
}