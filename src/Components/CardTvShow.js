import React, { Component } from 'react';

class CardTvShow extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="cardbox">
                <img src={this.props.url}
                    alt={this.props.name}
                     width="200" height="200"
                />
                <span>{ this.props.name }</span>
            </div>

        );
    }
}

export default CardTvShow;