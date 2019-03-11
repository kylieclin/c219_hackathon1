
class Dispenser{
    constructor( numberOfRows, clickCallback ){
        this.rowCount = numberOfRows;
        this.rows = [];
        this.parent = '.board-container';
        this.rowColors = {}
        this.collectedMarbles=[];
        this.domElements = {
            dispenser:null
        };
        this.playerCallback = clickCallback;
        this.returnedMarblesLength = null;
        this.handleMarbleClick = this.handleMarbleClick.bind( this );
        this.addMarbleToRow = this.addMarbleToRow.bind(this);
        this.getRows = this.getRows.bind(this);
        this.possibleColorsLeft = [];
        this.randomNumberOfMarblesInRow=[];//5 (or number of rows) rows of randomly made marbles
    }
    handleMarbleClick(){
        console.log('marble was clicked');
        this.callbacks.click( this );
    }

    randomlyCreateRowColors(listOfNumbersPerRow){
        var colors =  ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'];
        var randomRowColors = {}
        for (var iterations=0;iterations<20;iterations++){
            this.possibleColorsLeft = this.possibleColorsLeft.concat(colors);
        }
        for (var start=0; start<this.rowCount; start ++){
            this.rowColors[`row${start}`]=[];//creates each row container of colors..
            for (var marbPerRow=0;marbPerRow<listOfNumbersPerRow[start];marbPerRow++){
                var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
                this.rowColors[`row${start}`].push(this.possibleColorsLeft[randomIndex]);
                this.possibleColorsLeft.splice(randomIndex,1);
            }
        }
        this.createRow();
    }
    returnMarblesToRow(objArray){
        for (var iterations = 0;iterations<objArray.length;iterations++){
            var currentMarble = objArray[0]
            var rowIndex = Math.floor(Math.random()*5);
            var randomRow = this.rows[rowIndex];
            if (randomRow.marblesInRow.length<9){
                $(`.row${rowIndex}>.empty`).remove();
                randomRow.domElements.row.append(currentMarble.render());
                randomRow.marblesInRow.push(currentMarble);
                for (var start = 0; start<9-randomRow.marblesInRow.length;start++){
                    var emptyContainer = $("<div>",{
                        'class': 'marble-container empty'
                    });
                    randomRow.domElements.row.append(emptyContainer);
                }
            } else {
                randomRow.domElements.row.append(currentMarble.render());
                randomRow.marblesInRow.push(currentMarble);
            }
            randomRow.hideMarbles();
        }
    }

    createRow(){
        for (var row_index=0; row_index < this.rowCount; row_index++){
            var currRow = new Row({
                colors:this.rowColors[`row${row_index}`],
                numbersInRow:this.randomNumberOfMarblesInRow[row_index],
                callbacks:{
                    addMarble:this.addMarbleToRow,
                    removeMarble:this.removeMarbleFromRow,
                    getRows:this.getRows
                }
            });
            this.rows.push(currRow);
            var rowDomElement = currRow.render().addClass('row'+`${row_index}`);
            this.domElements.dispenser.append(rowDomElement);
            currRow.createMarbles();
        }
        
    }
    getRows(row){
        if(row){
            this.collectedMarbles =  row.collectedMarbles;
            this.playerCallback();
        }
    }
    addMarbleToRow(){//picks a random row and adds marbles back will be called by... return Marbles to dispenser
        for (var iterations = 0;iterations<this.possibleColorsLeft.length;iterations++){
            var rowIndex = Math.floor(Math.random()*5);
            var randomRow = this.rows[rowIndex];
            var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
            var newMarble = new Marble(this.possibleColorsLeft[randomIndex],randomRow.marbleCallBack);
            this.possibleColorsLeft.splice(randomIndex,1);
            randomRow.createMarbles(newMarble.render(),newMarble,rowIndex);
        }
    }
    determineMarblesInRowAmount(){
        var totalMarbles = 80
        var iterations = this.rowCount-1;
        while(iterations>0){
            //random number between 13-16
            var randomNumber = Math.floor((Math.random()*7))+13;
            this.randomNumberOfMarblesInRow.push(randomNumber);
            totalMarbles-=randomNumber
            iterations--
        }
        this.randomNumberOfMarblesInRow.push(totalMarbles)
        this.randomlyCreateRowColors(this.randomNumberOfMarblesInRow)
    }
    render(){
        this.domElements.dispenser = $("<div>",{
            'class': 'board'
        });
        this.domElements.dispenser.click( this.handleClick );
        return this.domElements.dispenser;
    }
}





















