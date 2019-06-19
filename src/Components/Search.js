import React, { Component } from 'react';
import Auth from "./../auth";
import CardTvShow from "./CardTvShow";
import CardUser from "./CardUser";
const auth = new Auth();

class Search extends Component{
    constructor(props) {
        super(props);

        this.displayDate = '';

        this.state = {
            element : '',
            search: 'serie'
        };

        this.recherche = this.recherche.bind(this);
        this.typeSearch = this.typeSearch.bind(this);
    }

    recherche(){
        let search = document.getElementById("elementSearch").value;
        let berar = 'Bearer '+auth.getToken();

        if(this.state.search === "serie"){
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
                            let image = serie['show']["image"]?serie['show']["image"]["original"]:null;
                            self.displayData.push(<CardTvShow id={serie['show']['id']} name={serie['show']['name']} url={image} page={"/tvshow/"+serie['show']['id']} />);
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
        else if(this.state.search === "amis"){
            fetch(process.env.REACT_APP_URL+"/api/serach/people", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: "friend="+search,
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success"){
                        let self = this;
                        let users = Object.values(response.content);
                        self.displayData = [];

                        console.log(users);

                        users.map(function (user) {
                            self.displayData.push(<CardUser name={user.name} id={user.id}/>);
                        });

                        //maj showdata
                        this.setState({
                            showdata : this.displayData,
                            postVal : ""
                        });
                    }
                });
        }


    }

    typeSearch($type) {
        this.state.search = $type;
        if($type === "amis"){
            document.getElementById('elementSearch').placeholder= 'rechercher un ami';
        }
        else if($type === 'serie'){
            document.getElementById('elementSearch').placeholder= 'rechercher une serie';
        }
    }

    render(){
        return(
            <div className="main">
                <div id="research">
                    <div className="barSearch">
                        <input id="elementSearch" type="text" placeholder="rechercher une serie"></input>
                        <button className="recherche" onClick={this.recherche}>search</button>
                    </div>
                    <div>
                        <button onClick={this.typeSearch.bind(this, 'serie')} >serie</button>
                        <button onClick={this.typeSearch.bind(this, 'amis')} >amis</button>
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
