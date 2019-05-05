import React, { Component } from 'react';
import Commentaire from "./Commentaire";
import ReactHtml from 'raw-html-react';

import Auth from "./../auth";
const auth = new Auth();

class InfoEpisode extends Component{
    constructor(props) {
        super(props);

        this.state = {
            commentaires : Object.values(this.props.commentaire).map(function (commentaire, index) {
                return <Commentaire message={commentaire['message']} author={commentaire['author']} />
            })
        };

        this.sendCom = this.sendCom.bind(this);

    }

    sendCom(){
        let com = document.getElementById("textarea").value;

        var berar = 'Bearer '+auth.getToken();
        fetch(process.env.REACT_APP_URL+"/api/commentaire/episode/add", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "commentaire[idEpisodeApi]="+this.props.idEpisode+"&commentaire[commentaire]="+com
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success") {
                    this.state.commentaires.push(<Commentaire message={com} author="aa" />);
                }
            });
    }

    render() {
        return (
            <div class="infoEpisode">
                <span className="close">&times;</span>
                <p class="title">{this.props.name}</p>
                <ReactHtml html={this.props.summary}/>
                <div>{this.state.commentaires}</div>
                <div>
                    <textarea id="textarea" placeholder="Commentaire"></textarea>
                    <button onClick={this.sendCom}>valide</button>
                </div>
            </div>

        );
    }
}

export default InfoEpisode;