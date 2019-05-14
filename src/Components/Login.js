import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

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
        fetch(process.env.REACT_APP_URL+"/api/login", {
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
                    auth.setId(response.id);
                    auth.setNom(response.nom);
                    this.props.history.push('/home');
                    window.location.reload();
                }
            });
    }

    loginGoole(response){
        fetch(process.env.REACT_APP_URL+"/api/logingoogle", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: "token="+ response.tokenId
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.code === "succes"){
                auth.setAuthentificate(true);
                auth.setToken(response.tokenJWT);
                auth.setId(response.id);
                auth.setNom(response.nom);
                this.props.history.push('/home');
                window.location.reload();
            }
        });
    }

    render() {

        const responseGoogle = (response) => {
            this.loginGoole(response);
        };

        return (
            <div class="main">
                <div class="formMain formLogin">
                    <h1>Connection</h1>
                    <form id="connection" onSubmit={this.handleSubmit}>
                        <div>
                            <input name="email" id="email" onChange={this.handleChange} type="email" placeholder="email" />
                        </div>
                        <div>
                            <input name="password" id="password" onChange={this.handleChange} type="password" placeholder="password" />
                        </div>
                        <div>
                            <p>
                                Vous n'avez pas de compte?
                                <a href="/CreateCompte"> Créé un compte</a>
                            </p>
                        </div>
                        <div class="loginButton">
                            <GoogleLogin
                                clientId="510672959009-nttaqi6o8v7s61fmlheuqp30pkndm3tj.apps.googleusercontent.com"
                                buttonText="Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                            <input type="submit" value="Connection"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
