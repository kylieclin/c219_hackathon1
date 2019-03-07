
class Marble{
    debugger;
    constructor( color, clickCallback ){
        this.marbleColor = color;
        this.callbacks = {
            click: clickCallback
        }
        this.handleClick = this.handleClick.bind( this );
        this.domElements = {
            container: null,
            marble:null
        }
    }
    handleClick(){
        console.log('marble ' + this.marbleColor + ' was clicked');
        // console.log(this.domElements.container.parent());
        this.callbacks.click(this,this.domElements.container.parent());
    }
    getColor(){
        return this.marbleColor;
    }
    render(){
        this.domElements.container = $("<div>",{
            'class': 'marble-container'
        });
        this.domElements.marble = $("<div>",{
            'class': 'marble',
            css:{'background-color':this.marbleColor}
        });

        this.domElements.container.click( this.handleClick );

        this.domElements.container.append(this.domElements.marble );

        return this.domElements.container;
    }
}





















