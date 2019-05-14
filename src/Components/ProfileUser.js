import React, { Component } from 'react';
import Auth from "./../auth";
import Loader from "react-loader-spinner";

const auth = new Auth();

class ProfileUser extends Component{
    constructor(props) {
        super(props);

        this.state = {
            idUser : this.props.match.params.handle,
            name : '',
            friend: '',
            genre: '',
            genreList : '',
            genreSerie : '',
        };

        this.recuperationUser = this.recuperationUser.bind(this);
        this.addAmie = this.addAmie.bind(this);
        this.addGenre = this.addGenre.bind(this);
        this.saveGenre = this.saveGenre.bind(this);
        this.closePopIn = this.closePopIn.bind(this);

        this.recuperationUser();
    }

    recuperationUser(){
        var berar = 'Bearer '+auth.getToken();
        fetch(process.env.REACT_APP_URL+"/api/profile", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "user="+this.state.idUser
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){
                    let self = this;
                    Object.values(response.content).map(function (user) {
                        self.state.name = user.name;
                        if(typeof(user.suivre) !== "undefined"){
                            self.state.suivre = user.suivre;
                        }
                        if(typeof(user.genre) !== "undefined"){
                            self.state.genre = Object.values(user.genre).map(function (name) {
                                return <li>{name}</li>;
                            });
                            self.state.genreList = Object.values(user.genre).map(function (name) {
                                return name
                            });
                        }
                        if(typeof(user.genreTvSHow) !== "undefined"){
                            self.state.genreSerie = Object.values(user.genreTvSHow).map(function (name) {
                                return <li>{name}</li>;
                            });
                        }
                    });

                    this.setState({
                        showdata : this.displayData,
                        postVal : ""
                    });
                    document.getElementById('profile').classList.remove("visibilityOff");

                    document.getElementById('loader').remove();
                }
            });
    }

    addAmie() {
        var berar = 'Bearer '+auth.getToken();
        if(this.state.friend){
            fetch(process.env.REACT_APP_URL+"/api/remove/friend", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "friend="+this.state.idUser
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        document.getElementById('btnFollow').innerHTML = "suivre";
                        this.state.friend = false;
                    }
                });
        }
        else{
            fetch(process.env.REACT_APP_URL+"/api/add/friend", {
                method: "POST",
                headers: new Headers({
                    'Authorization': berar,
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body : "friend="+this.state.idUser
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success") {
                        document.getElementById('btnFollow').innerHTML = "ne plus suivre";
                        this.state.friend = true;

                    }

                });
        }
    }

    addGenre() {
        let popIn = document.getElementById('popIn');
        popIn.classList.remove("visibilityOff");

    }

    saveGenre(){
        let select = document.getElementById('selectGenre').options;
        let genres = [];

        for(let i =0; i < select.length; i++){
            if(select[i].selected){
                let value = select[i].value;
                genres.push(value);
            }
        }

        var berar = 'Bearer '+auth.getToken();
        fetch(process.env.REACT_APP_URL+"/api/add/genre", {
            method: "POST",
            headers: new Headers({
                'Authorization': berar,
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body : "genre="+genres
        }).then(response => response.json())
            .then(response => {
                if(response.code === "success"){
                    this.state.genre = genres.map(function (name) {
                        return <li>{name}</li>
                    });
                    this.state.genreList = genres;
                }

                this.setState({
                    showdata : this.displayData,
                    postVal : ""
                });
            });
    }

    closePopIn(){
        document.getElementById('popIn').classList.add('visibilityOff')
    }

    render() {
        return (
            <div className="main ">
                <div id="profile" className="visibilityOff">
                    <p>{this.state.name}</p>
                    {typeof(this.state.suivre) !== "undefined" &&
                        <button id="btnFollow" className="follow" onClick={this.addAmie}>{this.state.suivre ? "ne plus suivre" : "suivre"}</button>
                    }
                    <div className="genreList">
                        <div>
                            <h1>Genre utilisateur</h1>
                            {typeof (this.state.suivre) == "undefined" &&
                            <button onClick={this.addGenre}>ajout de genre</button>
                            }
                            <ul>{this.state.genre}</ul>
                        </div>
                        <div>
                            <h1>Genre des séries suivies</h1>
                            <ul>{this.state.genreSerie}</ul>
                        </div>
                    </div>
                </div>

                <div id="popIn" className="visibilityOff">
                    <div className="formSerie">
                        <span className="close" onClick={this.closePopIn}>&times;</span>
                        <div>
                            <select id={"selectGenre"} className="selectpicker" multiple>
                                <option selected={this.state.genreList.indexOf('action') > -1}>action</option>
                                <option selected={this.state.genreList.indexOf('adventure') > -1}>adventure</option>
                                <option selected={this.state.genreList.indexOf('espionnage') > -1}>espionnage</option>
                                <option selected={this.state.genreList.indexOf('comédie') > -1}>comédie</option>
                                <option selected={this.state.genreList.indexOf('drame') > -1}>drame</option>
                                <option selected={this.state.genreList.indexOf('fantastique') > -1}>fantastique</option>
                                <option selected={this.state.genreList.indexOf('horreur') > -1}>horreur</option>
                                <option selected={this.state.genreList.indexOf('policier') > -1}>policier</option>
                                <option selected={this.state.genreList.indexOf('amédical') > -1}>médical</option>
                            </select>
                            <button onClick={this.saveGenre}>Sauvegardé</button>
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

export default ProfileUser;