import React, { Component } from 'react';

class CreateCompte extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            plainPassword: '',
            name: '',
            firstname: ''
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
        console.log(this.state.firstname);
        if(this.state.plainPassword === this.state.password){

            fetch(process.env.REACT_APP_URL+"/api/create/user", {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: "registration_perso_form[email]="+this.state.email+"&registration_perso_form[password]="+this.state.password+"&registration_perso_form[name]="+this.state.firstname+"&registration_perso_form[lastname]="+this.state.name,
            }).then(response => response.json())
                .then(response => {
                    if(response.code === "success"){
                        this.props.history.push('/');
                    }
                });
        }
        else{
            document.getElementById('password').style.border = "1px solid red";
            document.getElementById('plainPassword').style.border = "1px solid red";
        }

    }


    render() {
        return (
            <div class="main">
                <div class="formMain formCreateUser">
                    <h1>Création de vôtre compte</h1>
                    <form id="créationUser" onSubmit={this.handleSubmit}>
                        <div class="alignRow">
                            <input name="firstname" id="firstname" onChange={this.handleChange} type="text" placeholder="prénom" required />
                            <input name="name" id="name" onChange={this.handleChange} type="text" placeholder="nom" required />
                        </div>
                        <div>
                            <input name="email" id="email" onChange={this.handleChange} type="email" placeholder="email" required />
                        </div>
                        <div class="alignRow">
                            <input name="password" id="password" onChange={this.handleChange} type="password" placeholder="password" required />
                            <input name="plainPassword" id="plainPassword" onChange={this.handleChange} type="password" placeholder="validation password" required />
                        </div>
                        <p class="infoPassword">Le mot de passe doit contenir 6 caractères dont au moins 1 chiffre, une lettre minuscule et majuscule et un symbole</p>

                        <div class="loginButton">
                            <input type="reset" value="Cancel"/>
                            <input type="submit" value="Connection"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCompte;
