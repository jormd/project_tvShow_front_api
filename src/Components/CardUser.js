import React, { Component } from 'react';

class CardUser extends Component{
    constructor(props) {
        super(props);

        this.infoSerie = this.infoSerie.bind(this);
    }

    infoSerie(){

        window.location = '/profileUser/'+this.props.id;
    }

    render() {
        return (
            <div id="cardbox" onClick={this.infoSerie}>
                <span>{ this.props.name }</span>
            </div>

        );
    }
}

export default CardUser;