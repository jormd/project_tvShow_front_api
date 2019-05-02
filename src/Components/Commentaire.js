import React, { Component } from 'react';
import ListEpisode from "./ListEpisode";

class Commentaire extends Component{
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <p>{this.props.message}</p>
                <p>{this.props.author}</p>
            </div>

        );
    }
}

export default Commentaire;