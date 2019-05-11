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
            friend: ''
        };

        this.recuperationUser = this.recuperationUser.bind(this);
        this.addAmie = this.addAmie.bind(this);

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

    addAmie()
    {
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

    render() {
        return (
            <div className="main ">
                <div id="profile" className="visibilityOff">
                    <p>{this.state.name}</p>
                    {typeof(this.state.suivre) !== "undefined" &&
                    <button id="btnFollow" className="follow"
                            onClick={this.addAmie}>{this.state.suivre ? "ne plus suivre" : "suivre"}</button>
                    }


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