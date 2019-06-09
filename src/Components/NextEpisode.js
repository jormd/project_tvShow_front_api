import React, { Component } from 'react';
import Auth from "../auth";
import Loader from "react-loader-spinner";
import CardTvShow from "./CardTvShow";

const auth = new Auth();


class NextEpisode extends Component{
    constructor(props) {
        super(props);

        this.state = {
            episodes : ''
        };

        this.nextEpisode = this.nextEpisode.bind(this);

        this.nextEpisode();
    }

    nextEpisode(){
        var berar = 'Bearer '+auth.getToken();
        fetch(process.env.REACT_APP_URL+"/api/next/episode", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){
                    let self = this;
                    self.displayData = [];

                    Object.values(response.content).map(function (episode) {
                        self.displayData.push(<CardTvShow id={episode['idSerie']} name={episode['nameSerie']} url={episode["image"]} page={"/episode/"+ episode['idSerie'] +"/"+ episode['season'] +"/"+ episode['episode']} />);
                    });

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
                <p>Episode qui vont arriver</p>
                <div id="series">{this.displayData}</div>
                <div id="popIn" className="visibilityOff"></div>

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

export default NextEpisode;