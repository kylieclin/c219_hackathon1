class Potion{
    constructor(){
        this.potionInfo=null;
        this.playerOne=null;
    }
    createPotion(potionInfo){
        this.potionInfo=potionInfo;
        this.potionInfo.color[0];
        this.playerOne=$('<div>',{
            'css':{
                'background-color': this.potionInfo.color[0],
            },
            'text':this.potionInfo.numbers[0],
            'class': this.potionInfo.color[0] + this.potionInfo.numbers[0]
        })
    }
    render(){
        var potionContainer=$('.player1-has');
        potionContainer.append(this.playerOne)
    }
}