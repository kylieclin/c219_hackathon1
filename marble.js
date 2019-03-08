
class Marble{
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
        $('.board-container').css('pointer-events', 'none');
        console.log('marble ' + this.marbleColor + ' was clicked');
        this.callbacks.click(this);
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





















