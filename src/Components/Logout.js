import React, { Component } from 'react';

import Auth from "./../auth";

const auth = new Auth();

class Logout extends Component{
    constructor(props) {
        super(props);
    }

    render(){
       auth.setAuthentificate(false);
       auth.setToken('');
       this.props.history.push('/');
        window.location.reload();

       return null;
    }
}

export default Logout;
