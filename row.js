class Row{
    constructor(options, clickCallback){//will have # of marbles,their color
        this.marbleColors = options.colors;//list of colors so i can make marbles
        this.domElements={
            row:null
        }
        this.marblesInRow = [];
        // this.handleMarbleClick = this.handleMarbleClick.bind(this);
        this.removeMarble = this.removeMarble.bind(this);
        this.callbacks = {
            click: clickCallback
        }

    }


    updateMarbleRow(colorOfMarbles){
        for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
            var newMarble = new Marble(colorOfMarbles[marbleIndex],this.removeMarble)
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }
    removeMarble(marbleClicked){
        var collectedMarbles = [];
        var targetedIndex = this.marblesInRow.indexOf(marbleClicked);
        if(this.marblesInRow[targetedIndex-1].marbleColor === this.marblesInRow[targetedIndex+1].marbleColor){
            console.log('EXPLOSIONN');
        }
    }
    createMarbles(){
        for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
            var newMarble = new Marble(this.marbleColors[marbleIndex],this.removeMarble);
            var marbleImage = newMarble.render();
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        return this.domElements.row
    }
}
