import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Auth from "./../auth";
import CardTvShow from "./CardTvShow";

const auth = new Auth();

class Home extends Component{
    constructor(props) {
        super(props);
        this.displayData = [];

        this.setState({
            showdata : this.displayData,
            postVal : ""
        });
        // permet de passer le this du constructeur
        this.recuperationSerie = this.recuperationSerie.bind(this);
        //appel de la méthode pour l'initialisation
        this.recuperationSerie();
    }



    recuperationSerie(){
        var berar = 'Bearer '+auth.getToken();
        fetch("http://127.0.0.1:8080/api/series/all", {
            method: "GET",
            headers: new Headers({
                'Authorization': berar,
            }),
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){

                    let self = this;

                    Object.values(response.content).map(function (serie) {
                        self.displayData.push(<CardTvShow id={serie['id']} name={serie['name']} url={serie["img"]}/>);
                    });

                    //maj showdata
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
                <div id="series">{this.displayData}</div>
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

export default Home;
