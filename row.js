class Row{
    constructor(options){//will have # of marbles,their color
        this.marbleColors = options.colors;//list of colors so i can make marbles
        this.domElements={
            row:null
        }
        this.marblesInRow = [];
        // this.handleMarbleClick = this.handleMarbleClick.bind(this);
        this.removeMarble = this.removeMarble.bind(this);
        this.createMarbles = this.createMarbles.bind(this);
        this.callbacks = {
            addMarbles:options.callbacks.addMarble,
            removeMarble:options.callbacks.removeMarble
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
    updateCopy(){
        return this.marblesInRow.slice(0)
    }
    removeMarble(marbleClicked){
        var copyOfArray = this.marblesInRow.slice(0)
        // marbleClicked.domElements.container.remove();
        var collectedMarbles = [marbleClicked];
        this.callbacks.addMarbles(this.createMarbles,this.removeMarble);
        copyOfArray = this.updateCopy();
        var targetedIndex = copyOfArray.indexOf(marbleClicked);
        var lookingLeft=true;
        var lookingRight=true;
        //we dont know how many times we are looping.. so a while loop
        //while we are still looking left, (looking left is true), (looking right is true)
        if(copyOfArray[targetedIndex-1].marbleColor === copyOfArray[targetedIndex+1].marbleColor){
            var lookingLeftPosition=targetedIndex-2
            var lookingRightPosition=targetedIndex+2
            console.log('explosion')
            collectedMarbles.push(copyOfArray[targetedIndex-1],copyOfArray[targetedIndex+1])
            this.callbacks.addMarbles(this.createMarbles)
            while(lookingLeft && lookingRight){
                while(lookingLeft && lookingLeftPosition>=0){
                    if (copyOfArray[lookingLeftPosition].marbleColor===copyOfArray[targetedIndex-1].marbleColor){
                        collectedMarbles.push(copyOfArray[lookingLeftPosition]);
                        // this.callbacks.addMarbles(this.createMarbles)
                        lookingLeftPosition--
                    } else {
                        lookingLeft=false;
                    }
                }
                while(lookingRight && lookingRightPosition<=this.marbleColors.length){
                    if (copyOfArray[lookingRightPosition].marbleColor===copyOfArray[targetedIndex+1].marbleColor){
                        collectedMarbles.push(copyOfArray[lookingRight]);
                        // this.callbacks.addMarbles(this.createMarbles)
                        lookingRightPosition++
                    } else {
                        lookingRight=false;
                    }
                }
                if (!lookingLeft && !lookingRight){
                    if (copyOfArray[lookingLeftPosition].marbleColor===copyOfArray[lookingRightPosition].marbleColor){
                        collectedMarbles.push(copyOfArray[lookingLeftPosition],copyOfArray[lookingRightPosition]);
                        // this.callbacks.addMarbles(this.createMarbles)
                        lookingLeft = true;
                        lookingLeftPosition--
                        lookingRight = true;
                        lookingRightPosition++
                    }
                }
            }
            console.log(collectedMarbles)
        }





        // if(this.marblesInRow[targetedIndex-1].marbleColor === this.marblesInRow[targetedIndex+1].marbleColor){
        //     collectedMarbles.push(this.marblesInRow[targetedIndex-1],this.marblesInRow[targetedIndex+1].marbleColor)
        //     console.log('EXPLOSIONN');
        //     if (this.marblesInRow[])
        // }
        //dont forget to actually remove them from the row later
    }
    createMarbles(marble,marbleObj){//if something is passed in..create one new marble and append to row
        if(marble){
            this.domElements.row.append(marble);
            this.marblesInRow.push(marbleObj);
        } else{
            for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
                var newMarble = new Marble(this.marbleColors[marbleIndex],this.removeMarble);
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
