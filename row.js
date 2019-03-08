class Row{
    constructor(options){//will have # of marbles,their color
        this.marbleColors = options.colors;//list of colors so i can make marbles
        this.domElements={
            row:null
        }
        this.marblesInRow = [];
        this.collectedMarbles=[];
        // this.handleMarbleClick = this.handleMarbleClick.bind(this);
        this.checkingExplosion = this.checkingExplosion.bind(this);
        this.chkExplosion = this.chkExplosion.bind(this);
        this.createMarbles = this.createMarbles.bind(this);
        this.callbacks = {
            addMarbles:options.callbacks.addMarble,
            removeMarble:options.callbacks.removeMarble,
            getRows:options.callbacks.getRows
        }
    }

    updateMarbleRow(colorOfMarbles){
        for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
            var newMarble = new Marble(colorOfMarbles[marbleIndex],this.checkingExplosion)
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }

    checkExplosion(marbleClicked){
        debugger;
        // if (nextRightCheck.position = -1) no more explosion to check on the right
        // if (nextLeftCheck.position = -1) no more explosion to check on the right
        var startPosToRemove = null;
        var endPosToRemove = null;
        var nextRightCheck = {position: null, Color: null};
        var nextLeftCheck = {position: null, Color: null};
        var clickedMarbleIndex = this.marblesInRow.indexOf(marbleClicked);

        // if there ia a marble to the left of the clicked marble, check for explosion
        // First time checking for explosion
        nextRightCheck.position = clickedMarbleIndex + 1;
        nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor ;
        nextLeftCheck.position = clickedMarbleIndex - 1;
        nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor ;
        this.collectedMarbles.push(this.marblesInRow[clickedMarbleIndex]);

        if (nextLeftCheck.color === nextRightCheck.color) {
            // update the start and end positions on array to remove
            startPosToRemove = nextLeftCheck.position;
            endPosToRemove = nextRightCheck.position;
            // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
            this.collectedMarbles.push(this.marblesInRow[nextLeftCheck.position]);
            this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);
            this.marblesInRow[lookingLeftPosition].domElements.container.hide();
            nextRightCheck.position++;
            nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor;
            nextLeftCheck.position--;
            nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor;
        }
        while (nextLeftCheck.position >= 0) {
            if (nextLeftCheck.color === nextRightCheck.color) {
                startPosToRemove = nextLeftCheck.position;
                endPosToRemove = nextRightCheck.position;
                // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
                this.collectedMarbles.push(this.marblesInRow[nextLeftCheck.position]);
                this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);
                this.marblesInRow[lookingLeftPosition].domElements.container.hide();
                nextRightCheck.position++;
                nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor;
                nextLeftCheck.position--;
                nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor;
            }
        }
        while (nextRightCheck.color !== undefined) {
            if (nextLeftCheck.color === nextRightCheck.color) {
                startPosToRemove = nextLeftCheck.position;
                endPosToRemove = nextRightCheck.position;
                // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
                this.collectedMarbles.push(this.marblesInRow[nextLeftCheck.position]);
                this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);
                this.marblesInRow[lookingLeftPosition].domElements.container.hide();
                nextRightCheck.position++;
                nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor;
                nextLeftCheck.position--;
                nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor;
            }
        }
        console.log(this.collectedMarbles);
        console.log('startPosToRemove: ', startPosToRemove);
        this.removeMarbles(startPosToRemove);
        this.callbacks.getRows(this);

    }  // end of function checkExplosion


    checkingExplosion(marbleClicked){
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
        }
        console.log(this.collectedMarbles)
        this.removeMarbles(lookingLeftPosition+2);
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
