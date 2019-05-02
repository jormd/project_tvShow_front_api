import React, {Component} from "react";
import * as ReactDom from "react-dom";
import Auth from "./../auth";
import InfoEpisode from "./InfoEpisode";
const auth = new Auth();


class ListEpisode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            see : this.props.see
        }

        this.checkEpisode = this.checkEpisode.bind(this);
        this.infoEpisode = this.infoEpisode.bind(this);
    }

    checkEpisode(idEpisode, idSerie){
        var berar = 'Bearer '+auth.getToken();

        if(this.state.see){
            fetch("http://127.0.0.1:8080/api/uncheck/episode", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "episode[idEpisode]="+idEpisode+"&episode[idSerie]="+idSerie
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        let episodes = document.getElementsByClassName("episode");
                        for(let episode of episodes){
                            if(episode.getAttribute('data-id') == idEpisode){
                                episode.getElementsByClassName("material-icons").item(0).innerHTML="visibility"
                            }
                        }
                        this.state.see = false;
                    }
                });
        }
        else{
            fetch("http://127.0.0.1:8080/api/check/episode", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "episode[idEpisode]="+idEpisode+"&episode[idSerie]="+idSerie
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        let episodes = document.getElementsByClassName("episode");
                        for(let episode of episodes){
                            if(episode.getAttribute('data-id') == idEpisode){
                                episode.getElementsByClassName("material-icons").item(0).innerHTML="visibility_off"
                            }
                        }
                    }
                    this.state.see = true;
                });
        }

    }

    infoEpisode(idEpisode, idSerie, saison){
        var berar = 'Bearer '+auth.getToken();
        fetch("http://127.0.0.1:8080/api/info/episode", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "episode[episode]="+idEpisode+"&episode[idSerie]="+idSerie+"&episode[saison]="+saison
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success") {
                    let popIn = document.getElementById('popIn');
                   popIn.classList.remove("visibilityOff");
                   ReactDom.render(<InfoEpisode idEpisode={response.content['idEpisode']} name={response.content['name']} summary={response.content['summary']} commentaire={response.content['commentaire']}/>, popIn);
                }
            });

    }

    render() {
        return (
            <div class="episode" data-id={this.props.id}>
                <p onClick={this.infoEpisode.bind(this, this.props.episode, this.props.idSerie, this.props.saison)}>{this.props.name}</p>
                <i id="oeil" className="material-icons" onClick={this.checkEpisode.bind(this, this.props.id, this.props.idSerie)}>{this.state.see ? "visibility_off":"visibility"}</i>
            </div>

        );
    }
}

export default ListEpisode;
