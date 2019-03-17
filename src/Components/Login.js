import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import Auth from "./../auth";

const auth = new Auth();



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch("http://127.0.0.1:8080/api/login", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: "email="+this.state.email+"&password="+this.state.password,
        }).then(response => response.json())
            .then(response => {
                if(response.code === "succes"){
                    auth.setAuthentificate(true);
                    auth.setToken(response.tokenJWT);
                    this.props.history.push('/home');
                }
            });
    }

    render() {

        return (
            <div className="App">
                <form id="connection" onSubmit={this.handleSubmit}>
                  <label htmlFor="email">email</label>
                  <input name="email" id="email" onChange={this.handleChange} type="email"/>
                  <label htmlFor="password">mot de pass</label>
                  <input name="password" id="password" onChange={this.handleChange} type="password"/>
                  <input type="submit" value="Submit"/>
              </form>
            </div>
        );
    }
}

export default Login;
