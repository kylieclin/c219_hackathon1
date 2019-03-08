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
        console.log(this.marblesInRow)
        this.collectedMarbles = [marbleClicked];
        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
        marbleClicked.domElements.container.hide();
        var targetedIndex = this.marblesInRow.indexOf(marbleClicked);
        var lookingLeft=true;
        var lookingRight=true;
        //we dont know how many times we are looping.. so a while loop
        //while we are still looking left, (looking left is true), (looking right is true)
        if(this.marblesInRow[targetedIndex-1].marbleColor === this.marblesInRow[targetedIndex+1].marbleColor){
            var lookingLeftPosition=targetedIndex-2
            var lookingRightPosition=targetedIndex+2
            console.log('explosion')
            this.collectedMarbles.push(this.marblesInRow[targetedIndex-1],this.marblesInRow[targetedIndex+1]);
            this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
            this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
            this.marblesInRow[targetedIndex-1].domElements.container.hide();
            this.marblesInRow[targetedIndex+1].domElements.container.hide();
            while(lookingLeft && lookingRight){
                while(lookingLeft && lookingLeftPosition>=0){
                    if (this.marblesInRow[lookingLeftPosition].marbleColor===this.marblesInRow[targetedIndex-1].marbleColor){
                        this.collectedMarbles.push(this.marblesInRow[lookingLeftPosition]);
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion)
                        this.marblesInRow[lookingLeftPosition].domElements.container.hide();
                        lookingLeftPosition--
                    } else if(lookingLeftPosition === 0){
                        if(this.marblesInRow[lookingLeftPosition].marbleColor===this.marblesInRow[lookingLeftPosition+1].marbleColor){
                            this.collectedMarbles.push(this.marblesInRow[lookingLeftPosition]);
                            this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion)
                            this.marblesInRow[lookingLeftPosition].domElements.container.hide();
                            lookingLeft=false;
                            lookingLeftPosition--
                        } else {
                            lookingLeftPosition--
                        }
                    }else{
                        lookingLeft=false;
                    }
                }
                while(lookingRight && lookingRightPosition<=this.marbleColors.length){
                    if (this.marblesInRow[lookingRightPosition].marbleColor===this.marblesInRow[targetedIndex+1].marbleColor){
                        this.collectedMarbles.push(this.marblesInRow[lookingRightPosition]);
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion)
                        this.marblesInRow[lookingRightPosition].domElements.container.hide();
                        lookingRightPosition++
                    } else{
                        lookingRight=false;
                    }
                }
                if (!lookingLeft && !lookingRight){
                    if (this.marblesInRow[lookingLeftPosition].marbleColor===this.marblesInRow[lookingRightPosition].marbleColor){
                        this.collectedMarbles.push(this.marblesInRow[lookingLeftPosition],this.marblesInRow[lookingRightPosition]);
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion);
                        this.marblesInRow[lookingLeftPosition].domElements.container.hide();
                        this.marblesInRow[lookingRightPosition].domElements.container.hide();
                        lookingLeft = true;
                        lookingLeftPosition--
                        lookingRight = true;
                        lookingRightPosition++
                    }
                }
                if (lookingRightPosition>this.marbleColors.length){
                    lookingRight = false;
                }
            }
        console.log(this.collectedMarbles);
        this.removeMarbles(lookingLeftPosition+2);
        console.log(this.marblesInRow);
        this.callbacks.getRows(this);
        console.log(this.marblesInRow);

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
