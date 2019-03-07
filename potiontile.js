class Potion{

    constructor(potionInfo){

        this.potionInfo={};
        this.potionInfo.color= potionInfo.color;
        this.potionInfo.numbers= potionInfo.numbers;
        this.potionInfo.dom = [];

        this.potionDom= null;
        // this.potion={
        //     potionDom:null,
        //     potionStorage:{
        //         color:null,
        //         number:null
        //     }
        // };
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
            debugger;
            // this.potion.color = this.potionInfo.color[pIndex];
            // this.potion.number = this.potionInfo.numbers[pIndex];
            this.potionInfo.dom.push(this.potionDom);
            potionContainer.append(this.potionDom);

        };  

        return potionContainer;
    }


        
    checkFilledStatus(){
        debugger;
        var potionNum= this.potion.number;
        var filled=null;
        for(var numIndex=0; numIndex < potionNum; numIndex++){
            if(potionNum[numIndex] != 0){
                return filled = false;
            }
        }
        return filled = true;
    }
}