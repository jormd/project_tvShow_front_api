import React, { Component } from 'react';
import Commentaire from "./Commentaire";
import ListEpisode from "./ListEpisode";

class InfoEpisode extends Component{
    constructor(props) {
        super(props);

        this.state = {
            commentaires : this.props.commentaire.map(function (commentaire, index) {
                return <Commentaire message={commentaire['message']} author={commentaire['author']} />
            })
        }

    }

    render() {
        return (
            <div class="infoEpisode">
                <span className="close">&times;</span>
                <p class="title">{this.props.name}</p>
                <div>{this.props.summary}</div>
                <div>{this.props.commentaires}</div>
            </div>

        );
    }
}

export default InfoEpisode;