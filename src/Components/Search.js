import React, { Component } from 'react';
import Auth from "./../auth";
import CardTvShow from "./CardTvShow";
const auth = new Auth();

class Search extends Component{
    constructor(props) {
        super(props);

        this.displayDate = '';

        this.state = {
            element : ''
        };

        this.recherche = this.recherche.bind(this);
    }

    recherche(){
        let search = document.getElementById("elementSearch").value;
        let berar = 'Bearer '+auth.getToken();

        fetch(process.env.REACT_APP_URL+"/api/search", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: "tv="+search,
        }).then(response => response.json())
        .then(response => {
            if(response.code === "success"){
                let self = this;
                let series = JSON.parse(response.content);
                self.displayData = [];

                series.map(function (serie) {
                    console.log(serie['show']["image"]);
                    let image = serie['show']["image"]?serie['show']["image"]["original"]:null;
                    self.displayData.push(<CardTvShow id={serie['show']['id']} name={serie['show']['name']} url={image}/>);
                });
                //
                //maj showdata
                this.setState({
                    showdata : this.displayData,
                    postVal : ""
                });
            }
        });
    }

    render(){
        return(
            <div className="main">
                <div id="research">
                    <div className="barSearch">
                        <input id="elementSearch" type="text" placeholder="rechercher une serie"></input>
                        <button className="recherche" onClick={this.recherche}>search</button>
                    </div>
                </div>
                <div id="series">
                    {this.displayData}
                </div>
            </div>
        );
    }
}

export default Search;
