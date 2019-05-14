import React, { Component } from 'react';

class Commentaire extends Component{
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div className="commentaire">
                <p>{this.props.message}</p>
                <p>{this.props.author}</p>
            </div>

        );
    }
}

export default Commentaire;