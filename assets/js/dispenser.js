
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

    randomlyCreateRowColors(){
        var colors =  ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'];
        var randomRowColors = {}
        for (var iterations=0;iterations<20;iterations++){
            this.possibleColorsLeft = this.possibleColorsLeft.concat(colors);
        }
        debugger;
        for (var start=0; start<this.rowCount; start ++){
            this.rowColors[`row${start}`]=[];//creates each row container of colors..
            for (var marbPerRow=0;marbPerRow<listOfNumbersPerRow[start];marbPerRow++){
                var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
                this.rowColors[`row${start}`].push(this.possibleColorsLeft[randomIndex]);
                this.possibleColorsLeft.splice(randomIndex,0);
            }
        }
        this.createRow();
    }
    returnMarblesToDispenser(objArray){
        for(var marble in objArray){
            this.possibleColorsLeft.push(objArray[marble].marbleColor)
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
    addMarbleToRow(createMarbles,callback){
        var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
        var newMarble = new Marble(this.possibleColorsLeft[randomIndex],callback);
        this.possibleColorsLeft.splice(randomIndex,0);
        var marbleImage = newMarble.render();
        createMarbles(marbleImage,newMarble);
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





















