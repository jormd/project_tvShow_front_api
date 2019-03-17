import React, { Component } from 'react';

import Auth from "./../auth";

const auth = new Auth();

class Error extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <h1>Error 404</h1>
        );
    }
}

export default Error;
