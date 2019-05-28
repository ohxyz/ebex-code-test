import React from 'react';
import './app.css';
import { Tooltip } from './tooltip';

class App extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            target: null
        }

        this.containerRef = React.createRef();
    }

    handleLinkClick( event ) {

        event.preventDefault();

        this.setState( {

            target: event.target
        } )
    }

    render() {

        return  <div className="app">
                    <div className="tooltip-area" ref={ this.containerRef } >
                        {
                            new Array(9).fill( undefined ).map( ( link, index ) => 

                                <div key={index} className="link-container">
                                    <a className="link" 
                                       href="/" 
                                       onClick={ this.handleLinkClick.bind(this) }
                                    >
                                        Open Tooltip
                                    </a>
                                </div>
                            )
                        }
                        <Tooltip target={ this.state.target }
                                 container={ this.containerRef.current }
                                 content="This is a tooltip."
                        />
                    </div>
                </div>
        }
    }

export default App;
