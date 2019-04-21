import React, { Component } from 'react';

import Auth from "./../auth";

const auth = new Auth();

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            series : this.recuperationSerie()
        }
    }

    recuperationSerie(){
        var berar = 'Bearer '+auth.getToken();
        fetch("http://127.0.0.1:8080/api/series/all", {
            method: "GET",
            headers: new Headers({
                //'Access-Control-Allow-Origin': '*',
                'Authorization': berar,
                //'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
        }).then(response => response.text())
            .then(response => {
                console.log(response);
                if(response.code === "succes"){
                    console.log(response);
                }
            });
    }

    render() {
        return (
            <div class="main">
                <p>aa</p>
                <p>{auth.getToken()}</p>
                <p>aa  : { this.state.series }</p>
            </div>
        );
    }
}

export default Home;
