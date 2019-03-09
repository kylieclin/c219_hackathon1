class Row{
    constructor(options){
        this.marbleColors = options.colors;
        this.domElements={
            row:null
        };
        this.randomNumberInRow = options.numbersInRow;
        this.marblesInRow = [];
        this.collectedMarbles=[];
        this.createMarbles = this.createMarbles.bind(this);
        this.callbacks = {
            addMarbles:options.callbacks.addMarble,
            removeMarble:options.callbacks.removeMarble,
            getRows:options.callbacks.getRows
        }
        this.hiddenMarblePosition=9;
        this.checkExplosion = this.checkExplosion.bind(this);
    }

    checkExplosion(marbleClicked){
        console.log(this.marblesInRow);
        var nextRightCheck = {position: null, Color: null};
        var nextLeftCheck = {position: null, Color: null};
        var keepChecking = false;
        var explodeColor = null;
        //===================================================================================================
        // Remove the clicked marble first
        //===================================================================================================
        this.collectedMarbles = [marbleClicked];
        var clickedMarbleIndex = this.marblesInRow.indexOf(marbleClicked);
        var startPosToRemove = clickedMarbleIndex;
        // this.callbacks.addMarbles(this.createMarbles,this.checkingExplosion); REMOVING======================
        this.marblesInRow[clickedMarbleIndex].domElements.container.hide();
        this.showMarble();
        //marbleClicked.domElements.container.hide();
        console.log('clicked marble removed: ' + clickedMarbleIndex + ' - ' + this.marblesInRow[clickedMarbleIndex].marbleColor);
        // this.collectedMarbles.push(this.marblesInRow[clickedMarbleIndex]);
        // this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);
        // this.marblesInRow[clickedMarbleIndex].domElements.container.hide();

        // initialize nextLeftCheck and nextRightCheck
        nextLeftCheck.position = clickedMarbleIndex - 1;
        if (nextLeftCheck.position>0){
            nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor ;
            keepChecking = true;
        }
        nextRightCheck.position = clickedMarbleIndex + 1;
        nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor ;

debugger;
        //===================================================================================================
        // Check NEW color explosion - store color, remove marbles, refill marbles
        //===================================================================================================
        while (keepChecking) {
            console.log('checking left marble: ' + nextLeftCheck.position + ' - ' + nextLeftCheck.color);
            console.log('checking right marble: ' + nextRightCheck.position + ' - ' + nextRightCheck.color);
            if (nextLeftCheck.color === nextRightCheck.color) {
                explodeColor = nextLeftCheck.color;     // get new explosion color
                // track the start and end positions of the marbles to remove from array
                startPosToRemove = nextLeftCheck.position;
                // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
                this.collectedMarbles.push(this.marblesInRow[nextLeftCheck.position]);
                // this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);REMOVING======================
                this.marblesInRow[nextLeftCheck.position].domElements.container.hide();
                this.showMarble();
                this.collectedMarbles.push(this.marblesInRow[nextRightCheck.position]);
                // this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);REMOVING======================
                this.marblesInRow[nextRightCheck.position].domElements.container.hide();
                this.showMarble();
                console.log('left side marble removed: ' + nextLeftCheck.position + ' - ' + nextLeftCheck.color);
                console.log('right side marble removed: ' + nextRightCheck.position + ' - ' + nextRightCheck.color);
            } else {
                keepChecking = false;
                break;
            }
            //===================================================================================================
            // Check LEFT side - with the same color - continue checking until (1)no more match or (2)at the end
            //===================================================================================================
            //debugger;
            nextLeftCheck.position--;
            if (nextLeftCheck.position<0){
                keepChecking = false;
            } else {
                nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor ;
            }
            while (nextLeftCheck.position >= 0 && nextLeftCheck.color === explodeColor) {
                console.log('checking left marble: ' + nextLeftCheck.position + ' - ' + nextLeftCheck.color);
                startPosToRemove = nextLeftCheck.position;
                // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
                this.collectedMarbles.push(this.marblesInRow[nextLeftCheck.position]);
                // this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);REMOVING======================
                this.marblesInRow[nextLeftCheck.position].domElements.container.hide();
                this.showMarble();
                console.log('left side marble removed: ' + nextLeftCheck.position + ' - ' + nextLeftCheck.color);
                nextLeftCheck.position--;
                if (nextLeftCheck.position<0){
                    keepChecking = false;
                } else {
                    nextLeftCheck.color = this.marblesInRow[nextLeftCheck.position].marbleColor;
                }
            }
            //===================================================================================================
            // Check RIGHT side - with the same color - continue checking until (1)no more match or (2)at the end
            //===================================================================================================
            nextRightCheck.position++;
            if (nextRightCheck.position >= this.marblesInRow.length){
                keepChecking = false;
            } else {
                nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor;
            }
            while (nextRightCheck.position < this.marblesInRow.length && nextRightCheck.color === explodeColor) {
                console.log('checking right marble: ' + nextRightCheck.position + ' - ' + nextRightCheck.color);
                // put the marbles into the collectedMarbles object, add new marbles, and hide selected marbles
                this.collectedMarbles.push(this.marblesInRow[nextRightCheck.position]);
                // this.callbacks.addMarbles(this.createMarbles, this.checkExplosion);REMOVING======================
                this.marblesInRow[nextRightCheck.position].domElements.container.hide();
                this.showMarble();
                console.log('right side marble removed: ' + nextRightCheck.position + ' - ' + nextRightCheck.color);
                nextRightCheck.position++;
                nextRightCheck.color = this.marblesInRow[nextRightCheck.position].marbleColor;
            }
        }
        console.log(this.collectedMarbles);
        console.log('startPosToRemove: ', startPosToRemove);
        this.removeMarbles();
        this.callbacks.getRows(this);
        console.log(this.marblesInRow);
        if (this.marblesInRow.length>9){
            this.hiddenMarblePosition = 9;
        }
    }  // end of function checkExplosion

    updateMarbleRow(colorOfMarbles){
        for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
            var newMarble = new Marble(colorOfMarbles[marbleIndex],this.checkExplosion)
            var marbleImage = newMarble.render()
            this.domElements.row.append(marbleImage);
            this.marblesInRow.push(newMarble);
        }
    }
    createMarbles(marble,marbleObj){//if something is passed in..create one new marble and append to row
        if(marble){
            this.domElements.row.append(marble);
            this.marblesInRow.push(marbleObj);
        } else{
            for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
                var newMarble = new Marble(this.marbleColors[marbleIndex],this.checkExplosion);
                var marbleImage = newMarble.render();
                this.domElements.row.append(marbleImage);
                this.marblesInRow.push(newMarble);
            }
        }
        this.hideMarbles();
    }
    hideMarbles(){
        for (var marbleIndex=9;marbleIndex<this.marblesInRow.length;marbleIndex++){
            this.marblesInRow[marbleIndex].domElements.container.hide();
        }
    }
    showMarble(){
        if (this.hiddenMarblePosition>this.marblesInRow.length-1){
            var emptyContainer = $("<div>",{
                'class': 'marble-container'
            });
            this.domElements.row.append(emptyContainer);
        } else {
            this.marblesInRow[this.hiddenMarblePosition].domElements.container.show();
            this.hiddenMarblePosition++
        }
    }
    removeMarbles() {
        for (var marbleIndex in this.collectedMarbles){
            var currentMarble = this.collectedMarbles[marbleIndex];
            var marbleIndexRemoval =this.marblesInRow.indexOf(currentMarble);
            this.marblesInRow.splice(marbleIndexRemoval,1);
        }
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        return this.domElements.row
    }
}
