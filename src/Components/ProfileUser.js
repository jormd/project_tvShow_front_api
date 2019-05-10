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
                        self.state.name = user.name
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


    render() {
        return (
            <div className="main ">
                <div id="profile" className="visibilityOff">
                    <p>{this.props.name}</p>
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