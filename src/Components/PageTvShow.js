import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import Auth from "./../auth";
import CardTvShow from "./CardTvShow";

const auth = new Auth();

class PageTvShow extends Component{
    constructor(props) {
        super(props);

        this.state = {
            idSerie : this.props.match.params.handle,
            status : '',
            name : '',
            resumer : '',
            follow : '',
            create : '',
            img : '',
        };

        // permet de passer le this du constructeur
        this.recuperationSerie = this.recuperationSerie.bind(this);
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
                    console.log(Object.values(response.content));

                    let self = this;

                    Object.values(response.content).map(function (serie) {
                        self.state.status = serie.status;
                        self.state.name = serie.name;
                        self.state.resumer = serie.summary;
                        self.state.follow = serie.follow;
                        self.state.create = serie.create;
                        self.state.img = serie.img;
                    });

                    this.setState({postVal : ""});

                    document.getElementById('tvShowOne').classList.remove("visibilityOff");
                    document.getElementById('loader').remove();
                }
            });
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
                            <button class="follow">Follow</button>

                            <span class="resumer">Resumer :</span>
                            {this.state.resumer}
                        </div>
                    </div>
                </div>
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
