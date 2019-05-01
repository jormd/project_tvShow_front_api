import React, {Component} from "react";
import Auth from "./../auth";
const auth = new Auth();


class ListEpisode extends Component {
    constructor(props) {
        super(props);

        this.checkEpisode = this.checkEpisode.bind(this);
    }

    checkEpisode(idEpisode, idSerie){
        var berar = 'Bearer '+auth.getToken();

        if(this.props.see){
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
                        console.log('in');
                        document.getElementById("oeil").innerHTML="visibility";
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
                        console.log('aa');
                        document.getElementById("oeil").innerHTML="visibility_off";
                    }
                });
        }

    }

    render() {
        return (
            <div class="episode" data-id={this.props.id}>
                <p>{this.props.name}</p>
                <i id="oeil" className="material-icons" onClick={this.checkEpisode.bind(this, this.props.id, this.props.idSerie)}>{this.props.see ? "visibility_off":"visibility"}</i>
            </div>

        );
    }
}

export default ListEpisode;
