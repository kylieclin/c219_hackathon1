class Row{
    constructor(options){//will have # of marbles,their color
        this.marbleColors = options.colors;//list of colors so i can make marbles
        this.domElements={
            row:null
        }
        this.marblesInRow = [];
        this.collectedMarbles=[];
        // this.handleMarbleClick = this.handleMarbleClick.bind(this);

        this.createMarbles = this.createMarbles.bind(this);
        this.callbacks = {
            addMarbles:options.callbacks.addMarble,
            removeMarble:options.callbacks.removeMarble,
            getRows:options.callbacks.getRows
        }        
        this.checkingExplosion = this.checkingExplosion.bind(this);
    }
    updateMarbleRow(colorOfMarbles){
        for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
            var newMarble = new Marble(colorOfMarbles[marbleIndex],this.checkingExplosion)
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }
    checkingExplosion(marbleClicked){
        console.log(this.marblesInRow);
        this.collectedMarbles = [marbleClicked];
        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
        marbleClicked.domElements.container.hide();
        var marbleClickedIndex = this.marblesInRow.indexOf(marbleClicked)
        var marbleRow = this.marblesInRow;
        var compareColorTo = null;
        var lookingLeft = true;
        var lookingRight = true;
        var lookingLeftPosition=null;
        var lookingRightPosition=null;
        if (marbleRow[marbleClickedIndex+1].marbleColor===marbleRow[marbleClickedIndex-1].marbleColor){
            this.collectedMarbles.push(marbleRow[marbleClickedIndex+1],marbleRow[marbleClickedIndex-1])
            this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
            this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
            marbleRow[marbleClickedIndex+1].domElements.container.hide();
            marbleRow[marbleClickedIndex-1].domElements.container.hide();
            compareColorTo = marbleRow[marbleClickedIndex+1].marbleColor;
            lookingLeftPosition=marbleClickedIndex-2;
            lookingRightPosition=marbleClickedIndex+2
            console.log('FIRST EXPLOSION')
            while(lookingLeft && lookingRight){
                while (lookingLeftPosition>=0  && lookingLeft){
                    if (marbleRow[lookingLeftPosition].marbleColor===compareColorTo){
                        this.collectedMarbles.push(marbleRow[lookingLeftPosition])
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        marbleRow[lookingLeftPosition].domElements.container.hide();
                        lookingLeftPosition--
                    } else {
                        lookingLeft = false;
                    }
                }
                while (lookingRightPosition<=marbleRow.length && lookingRight){
                    if (marbleRow[lookingRightPosition].marbleColor===compareColorTo){
                        this.collectedMarbles.push(marbleRow[lookingRightPosition])
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        marbleRow[lookingRightPosition].domElements.container.hide();
                        lookingRightPosition++
                    } else {
                        lookingRight = false;
                    }
                }
                if (!lookingRight && !lookingLeft){
                    if (marbleRow[lookingRightPosition].marbleColor === marbleRow[lookingLeftPosition].marbleColor){
                        this.collectedMarbles.push(marbleRow[lookingRightPosition],marbleRow[lookingLeftPosition])
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        marbleRow[lookingRightPosition].domElements.container.hide();
                        marbleRow[lookingLeftPosition].domElements.container.hide();
                        compareColorTo = marbleRow[lookingRightPosition].marbleColor;
                        lookingLeftPosition--
                        lookingRightPosition++
                        lookingRight = true;
                        lookingLeft = true;
                        console.log('SECOND EXPLOSION');
                    }
                }
            }
        }
        console.log(this.collectedMarbles);
        console.log(this.marblesInRow);
        this.removeMarbles(lookingLeftPosition);
        console.log(this.marblesInRow);
        this.callbacks.getRows(this);
    }
    removeMarbles(startPosInRow) {
        var totalNumMarblesInRow = this.marblesInRow.length;
        var numberToRemove = this.collectedMarbles.length;
        if(startPosInRow < 0 ){
            startPosInRow = 0;
        }
        this.marblesInRow.splice(startPosInRow, numberToRemove);
        return;
    }
    createMarbles(marble,marbleObj){//if something is passed in..create one new marble and append to row
        if(marble){
            this.domElements.row.append(marble);
            this.marblesInRow.push(marbleObj);
        } else{
            for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
                var newMarble = new Marble(this.marbleColors[marbleIndex],this.checkingExplosion);
                var marbleImage = newMarble.render();
                this.domElements.row.append(marbleImage);
                this.marblesInRow.push(newMarble);
            }
        }
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        return this.domElements.row
    }
}
