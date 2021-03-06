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
        this.closePopIn = this.closePopIn.bind(this);

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
                    console.log('in');
                    this.state.commentaires.push(<Commentaire message={com} author={auth.getNom()} />);

                    this.setState({
                        showdata : this.displayData,
                        postVal : ""
                    });
                }
                document.getElementById("textarea").value = '';
            });
    }

    closePopIn(){
        document.getElementById('popIn').classList.add('visibilityOff')
    }

    render() {
        return (
            <div class="infoEpisode">
                <span className="close" onClick={this.closePopIn}>&times;</span>
                <p class="title">{this.props.name}</p>
                <div className="contentInfoEpisode">
                    <ReactHtml html={this.props.summary}/>
                    <div>{this.state.commentaires}</div>
                    <div>
                        <textarea id="textarea" placeholder="Commentaire"></textarea>
                        <button onClick={this.sendCom}>valide</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default InfoEpisode;