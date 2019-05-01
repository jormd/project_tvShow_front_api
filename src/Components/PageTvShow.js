import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import Auth from "./../auth";
import SeasonList from "./SeasonList";
import CardTvShow from "./CardTvShow";

const auth = new Auth();

class PageTvShow extends Component{
    constructor(props) {
        super(props);

        this.displayData = [];

        this.state = {
            idSerie : this.props.match.params.handle,
            status : '',
            name : '',
            resumer : '',
            follow : '',
            create : '',
            img : '',
            seasons : ''
        };

        // permet de passer le this du constructeur
        this.recuperationSerie = this.recuperationSerie.bind(this);
        this.changeSeason = this.changeSeason.bind(this);
        this.follow = this.follow.bind(this);

        //appel de la méthode pour l'initialisation
        this.recuperationSerie();
    }



    recuperationSerie(){
        var berar = 'Bearer '+auth.getToken();
        fetch("http://127.0.0.1:8080/api/find/serie", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "idApi="+this.state.idSerie
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){

                    let self = this;

                    Object.values(response.content).map(function (serie) {
                        self.state.status = serie.status;
                        self.state.name = serie.name;
                        self.state.resumer = serie.summary;
                        self.state.follow = serie.follow;
                        self.state.create = serie.create;
                        self.state.img = serie.img;

                        self.state.seasons = Object.values(serie.season).map(function (season, index) {
                            self.displayData.push(<SeasonList idSerie={serie.id} nbSaison={index+1} nbEpisode={Object.values(season)[0]} episodes={Object.values(Object.values(season)[1])} />);
                            return <li onClick={self.changeSeason.bind(self, index+1)}>Saison {index+1} </li>;

                        });
                    });

                    this.setState({
                        showdata : this.displayData,
                        postVal : ""
                    });
                    this.changeSeason(1);
                    document.getElementById('tvShowOne').classList.remove("visibilityOff");
                    document.getElementById('loader').remove();
                }
            });
    }

    changeSeason(index){
        var saisons = document.getElementsByClassName('saison');
        for(let saison of saisons){
            if(saison.getAttribute('data-id') != index){
                saison.classList.add("visibilityOff");
            }
            else{
                saison.classList.remove("visibilityOff");
            }
        }
    }

    follow(){
        var berar = 'Bearer '+auth.getToken();
        if(this.state.follow){
            fetch("http://127.0.0.1:8080/api/unfollow/serie", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "serie[id]="+this.state.idSerie
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        document.getElementById('btnFollow').innerHTML = "Follow";

                    }
                });
        }
        else{
            fetch("http://127.0.0.1:8080/api/follow/serie", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "serie[id]="+this.state.idSerie+"&serie[name]="+this.state.name
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        document.getElementById('btnFollow').innerHTML = "Unfollow";
                    }

                });
        }
    }



    render() {
        return (
            <div class="main">
                <div id="tvShowOne" class="chargement visibilityOff">
                    <h1 class="titleTvShow">{this.state.name}</h1>
                    <div class="container">
                        <div>
                            <img src={this.state.img} width="200" height="200"/>
                            <p>status : {this.state.status}</p>
                            <p>date de création : </p>
                            <p>{this.state.create}</p>
                        </div>
                        <div class="content">
                            <button id="btnFollow" class="follow" onClick={this.follow}>{this.state.follow ? "Unfollow" : "Follow"}</button>

                            <span class="resumer">Resumer :</span>
                            {this.state.resumer}
                            <ul class="listSaison">{this.state.seasons}</ul>
                            <div>
                                {this.displayData}
                            </div>
                        </div>



                    </div>
                </div>

                <div id="popIn" class="visibilityOff"></div>

                <div id="loader">
                    <Loader
                        type="CradleLoader"
                        color="#00BFFF"
                        height="100"
                        width="100"
                    />
                </div>
            </div>
        );
    }
}

export default PageTvShow;
