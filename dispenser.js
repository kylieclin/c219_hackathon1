
class Dispenser{
    constructor( numberOfRows, clickCallback ){
        this.rowCount = numberOfRows;
        this.rows = [];
        this.parent = '.board-container';
        this.rowColors = {
        }
        this.domElements = {dispenser:null};
        this.handleMarbleClick = this.handleMarbleClick.bind( this );
        this.addMarbleToRow = this.addMarbleToRow.bind(this);
        this.possibleColorsLeft = [];
    }
    handleMarbleClick(){
        console.log('marble was clicked');
        this.callbacks.click( this );
    }
    randomlyCreateRowColors(){
        var colors = ['red','blue','yellow','black'];
        var randomRowColors = {}
        for (var iterations=0;iterations<20;iterations++){
            this.possibleColorsLeft = this.possibleColorsLeft.concat(colors);
        }
        for (var start=0; start<this.rowCount; start ++){
            this.rowColors[`row${start}`]=[];//creates each row container of colors..
            for (var marbPerRow=0;marbPerRow<9;marbPerRow++){
                var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
                this.rowColors[`row${start}`].push(this.possibleColorsLeft[randomIndex]);
                this.possibleColorsLeft.splice(randomIndex,0);
            }
        }
        console.log(this.rowColors);
    }

    createRow(){
        // create new row object, for each new row to add:

        // generate an array of marbles with random colors
        // this.rowColors = {
        //     colors:['yellow','blue','yellow','yellow','yellow','blue','yellow','black','yellow']
        // };
        for (var row_index=0; row_index < this.rowCount; row_index++){
            var currRow = new Row({
                colors:this.rowColors[`row${row_index}`],
                callbacks:{
                    addMarble:this.addMarbleToRow,
                    removeMarble:this.removeMarbleFromRow
                }
            });
            this.rows.push(currRow);
            var rowDomElement = currRow.render().addClass('row'+`${row_index}`);
            this.domElements.dispenser.append(rowDomElement);
            currRow.createMarbles();
        }
    }
    getRows(){
        return this.rows;
    }
    addMarbleToRow(createMarbles,callback){
        var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
        var newMarble = new Marble(this.possibleColorsLeft[randomIndex],callback);
        this.possibleColorsLeft.splice(randomIndex,0);
        var marbleImage = newMarble.render();
        createMarbles(marbleImage,newMarble);
    }

    render(){
        this.domElements.dispenser = $("<div>",{
            'class': 'board'
        });
        this.domElements.dispenser.click( this.handleClick );


        return this.domElements.dispenser;
    }
}





















