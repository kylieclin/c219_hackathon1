class Potion{
    constructor(){
        this.potionInfo=null;
        this.playerOne=null;

        

        this.createPotion = this.createPotion.bind(this);

    }
    createPotion(potionInfo){
        this.potionInfo=potionInfo;
        this.potionInfo.color[0];
        debugger;
        for(var pIndex = 0; pIndex < this.potionInfo.color.length; pIndex++){
            this.playerOne=$('<div>',{
            'css':{
                'background-color': this.potionInfo.color[pIndex],
            },

            'text':this.potionInfo.numbers[pIndex],
            'class': 'potionbala ' + this.potionInfo.color[pIndex] + this.potionInfo.numbers[pIndex]
           
        })
        this.render();
        }
        
        
        
    }
    render(){
        var potionContainer=$('.player1-has');
        potionContainer.append(this.playerOne)
    }
}