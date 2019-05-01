import React, { Component } from 'react';
import ListEpisode from "./ListEpisode";

class Commentaire extends Component{
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
                <p>{this.state.author}</p>
            </div>

        );
    }
}

export default Commentaire;