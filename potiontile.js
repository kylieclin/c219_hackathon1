class Potion{
    constructor(potionInfo, player){
        this.potionInfo=potionInfo;
        this.potionDom={
            potionStorage:{
                color:[],
                numbers:[]
            }
        };
        this.marbleCollect=['red', 'blue', 'blue'];
        this.renderPotion = this.renderPotion.bind(this);
    }
    renderPotion(){
        for(var pIndex = 0; pIndex < this.potionInfo.color.length; pIndex++){
            this.potionDom=$('<div>',{
            'css':{
                'background-color': this.potionInfo.color[pIndex],
            },

            'text':this.potionInfo.numbers[pIndex],
            'class': 'potionbala ' + this.potionInfo.color[pIndex] + this.potionInfo.numbers[pIndex]
        
        })
        var potionContainer=$('<div>').addClass('potionContainer');
        potionContainer.append(this.potionDom);
        this.potionDom.potionStorage.color.push(this.potionInfo.color[pIndex]);
        this.potionDom.potionStorage.numbers.push(this.potionInfo.numbers[pIndex])
        };

        
        return potionContainer;
        }
        
        checkFilledStatus(){
            debugger;
            var potionNum= this.potionDom.potionStorage.numbers;
            var filled;
            for(var numIndex=0; numIndex<potionNum.length; numIndex++){
                if(potionNum[numIndex] != 0){
                    return filled = false;
                }
            }
            return filled = true;
        }
}