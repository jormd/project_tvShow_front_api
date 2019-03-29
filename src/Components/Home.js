import React, { Component } from 'react';

import Auth from "./../auth";

const auth = new Auth();

class Home extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="main">
                <p>aa</p>
                <p>{auth.getToken()}</p>
            </div>
        );
    }
}

export default Home;
