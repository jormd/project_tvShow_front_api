import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import ReactHtml from 'raw-html-react';

import Auth from "./../auth";

const auth = new Auth();

class PageEpisodeNext extends Component{
    constructor(props) {
        super(props);

        this.displayData = [];

        this.state = {
            idSerie : this.props.match.params.param1,
            saison : this.props.match.params.param2,
            episode: this.props.match.params.param3,
            name : '',
            resumer : '',
        };

        // permet de passer le this du constructeur
        this.recuperationEpisode = this.recuperationEpisode.bind(this);

        //appel de la méthode pour l'initialisation
        this.recuperationEpisode();
    }



    recuperationEpisode(){
        var berar = 'Bearer '+auth.getToken();
        fetch(process.env.REACT_APP_URL+"/api/info/episode", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "episode[idSerie]="+this.state.idSerie+'&episode[saison]='+ this.state.saison +'&episode[episode]='+ this.state.episode
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){

                    let self = this;

                    console.log(response.content);

                    self.state.name = response.content['name'];
                    self.state.resumer = response.content['summary'];

                    console.log(this.state.name);


                    this.setState({
                        showdata : this.displayData,
                        postVal : ""
                    });
                    document.getElementById('loader').remove();
                }
            });
    }

    render() {
        return (
            <div class="main">
                <div id="tvShowOne" class="chargement">
                    <h1 class="titleTvShow">{this.state.name}</h1>
                        <div class="content">
                            <span class="resumer">Resumer :</span>
                            <ReactHtml html={this.state.resumer}/>
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

export default PageEpisodeNext;
