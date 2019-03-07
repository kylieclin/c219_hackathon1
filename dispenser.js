
class Dispenser{
    constructor( numberOfRows, clickCallback ){
        this.rowCount = numberOfRows;
        this.rows = [];
        this.parent = '.board-container';
        //this.activeRow = [];
        this.marbleArray = [];
        this.domElements = {dispenser:null};
        this.handleMarbleClick = this.handleMarbleClick.bind( this );
    }
    handleMarbleClick(){
        console.log('marble was clicked');
        this.callbacks.click( this );
    }

    createRow(){
        // create new row object, for each new row to add:

        // generate an array of marbles with random colors
        debugger;
        this.marbleArray = {
            colors:['blue','yellow','yellow','yellow','blue','yellow','red','black']
        };
        for (var row_index=0; row_index < this.rowCount; row_index++){
            var currRow = new Row( this.marbleArray);
            this.rows.push(currRow);
            var rowDomElement = currRow.render().addClass('row'+`${row_index}`);
            this.domElements.dispenser.append(rowDomElement);
            currRow.createMarbles();
        }
    }
    getRows(){
        return this.rows;
    }
    addMarbleToRow(){

    }
    removeMarbleFromRow(){
    }
    addRowToDispenser(){


    }

    render(){
        this.domElements.dispenser = $("<div>",{
            'class': 'board'
        });
        this.domElements.dispenser.click( this.handleClick );


        return this.domElements.dispenser;
    }
}





















