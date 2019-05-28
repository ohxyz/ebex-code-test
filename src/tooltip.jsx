import React from 'react';

class Tooltip extends React.Component {

    constructor() {

        super();
        this.ref = React.createRef();
    }

    getRect( element ) {

        return {

            width: element.offsetWidth,
            height: element.offsetHeight,
            top: element.getBoundingClientRect().top,
            left: element.getBoundingClientRect().left
        }
    }

    componentDidUpdate() {

        let distanceToTarget = 10;
        let distanceToBoundary = 10;
        let self = this.ref.current;

        let rectOfTarget = this.getRect( this.props.target );
        let rectOfContainer = this.getRect( this.props.container );
        let rectOfSelf = this.getRect( self );

        let topOfSelf = rectOfTarget.top 
                        - rectOfContainer.top 
                        - rectOfSelf.height 
                        - distanceToTarget;

        let leftOfSelf = rectOfTarget.left 
                        - rectOfContainer.left 
                        - ( rectOfSelf.width - rectOfTarget.width ) / 2;

        if ( topOfSelf < 0 ) {

            topOfSelf = rectOfTarget.top 
                        - rectOfContainer.top 
                        + rectOfTarget.height 
                        + distanceToTarget;
        }

        if ( leftOfSelf < 0 ) {

            leftOfSelf = rectOfTarget.left - rectOfContainer.left + distanceToBoundary;
        }

        self.style.top = topOfSelf + 'px';
        self.style.left = leftOfSelf + 'px';

        if ( ( leftOfSelf + rectOfSelf.width ) > rectOfContainer.width ) {

            self.style.left = 'auto';
            self.style.right = distanceToBoundary + 'px';
        }
    }

    render() {

        return  this.props.target
                    && <div className="tooltip" ref={ this.ref } >{ this.props.content }</div>
    }
}

export { Tooltip }