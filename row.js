class Row{
    constructor(options){
        this.options.marbleList = [];
        this.domElements={
            row:null
        }
        this.handleMarbleClick = this.handleMarbleClick.bind(this);
    }
    addMarble(){
        // this.options.marbleList.push(new marble())
    }
    removeMarble(){
        // this.options.marbleList.splice();
    }
    checkMarbleClicked(){
        //will locate which row was clicked on, and in this row will compare 
        
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        return this.domElements.row
    }
}