import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Auth from "./auth";


//différent controller pour les appellés
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Error from "./Components/Error";

const auth = new Auth();


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.getAuthentificate() === 'true'
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


class App extends Component {


  render() {

      return (
          <BrowserRouter>
              <Switch>
                  <Route path="/login" component={Login} exact />
                  <Route path="/logout" component={Logout} exact />
                  <PrivateRoute path="/home" component={Home} exact />
                  <Route component={Error} />
              </Switch>

          </BrowserRouter>
      );
  }
}

export default App;
