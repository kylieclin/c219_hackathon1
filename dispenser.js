
class Dispenser{
    constructor( numberOfRows, clickCallback ){
        this.rowCount = numberOfRows;
        this.rows = [];
        this.parent = '.board-container';
        this.rowColors = {
        }
        this.collectedMarbles=[];
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
        //     colors:['red','red','black','black','black','red','yellow','red','blue'];
        // };
        // var test = {colors:['red','red','black','black','black','red','yellow','red','blue']};
        for (var row_index=0; row_index < this.rowCount; row_index++){
            var currRow = new Row({
                colors:this.rowColors[`row${row_index}`],
                callbacks:{
                    addMarble:this.addMarbleToRow,
                    removeMarble:this.removeMarbleFromRow
                }
            });
        // for (var row_index=0; row_index < this.rowCount; row_index++){
        //     var currRow = new Row({
        //         colors:['black','red','red','red','red','yellow','red','red','red',],
        //         callbacks:{
        //             addMarble:this.addMarbleToRow,
        //             removeMarble:this.removeMarbleFromRow,
        //             getRows:this.getRows
        //         }
        //     });
            this.rows.push(currRow);
            var rowDomElement = currRow.render().addClass('row'+`${row_index}`);
            this.domElements.dispenser.append(rowDomElement);
            currRow.createMarbles();
        }
    }
    getRows(row){
        return row.collectedMarbles;
    }
    addMarbleToRow(createMarbles,callback){
        var randomIndex = Math.floor(Math.random()*this.possibleColorsLeft.length);
        var newMarble = new Marble(this.possibleColorsLeft[randomIndex],callback);
        this.possibleColorsLeft.splice(randomIndex,0);
        var marbleImage = newMarble.render();
        createMarbles(marbleImage,newMarble);
    }
    getCollectedMarbles(){
        this.collectedMarbles = []
    }

    render(){
        this.domElements.dispenser = $("<div>",{
            'class': 'board'
        });
        this.domElements.dispenser.click( this.handleClick );


        return this.domElements.dispenser;
    }
}





















