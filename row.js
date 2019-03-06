class Row{
    constructor(options){//will have # of marbles,their color
        this.numberOfMarbles = this.options.number;
        this.options.marbleColors = this.options.colors;//list of colors so i can make marbles
        this.domElements={
            row:null
        }
        this.marblesInRow = []
        this.handleMarbleClick = this.handleMarbleClick.bind(this);
    }
    updateMarbleRow(numOfMarbles,colorOfMarbles){
        for (var marbleIndex = 0;marbleIndex<numberOfMarbles; marbleIndex++){
            var newMarble = new Marble(colorOfMarbles[marbleIndex])
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        for (var marbleIndex = 0;marbleIndex<this.numberOfMarbles; marbleIndex++){
            var newMarble = new Marble(this.options.marbleColors[marbleIndex])
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
        return this.domElements.row
    }
}