import React, { Component } from 'react';
import './css/App.scss';
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import Auth from "./auth";


//différent controller pour les appellés
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Error from "./Components/Error";
import Default from "./Components/Default";
import CreateCompte from "./Components/CreateCompte";

const auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.getAuthentificate() === 'true'
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


class App extends Component {

    navRender(){
        if(auth.getAuthentificate()){
            return [
                <div>
                    <Link to={'/'} className="nav-link"><i className="material-icons">home</i></Link>
                </div>,
                <div>
                    <Link to={'/login'} className="nav-link"> Login </Link>
                </div>];
        }
        return [
            <div>
                <Link to={'/home'} className="nav-link"><i className="material-icons">home</i></Link>
            </div>,
            <div>
                <Link to={'/logout'} className="nav-link">Logout</Link>
            </div>
        ];
    }

  render() {

      return (
          <BrowserRouter>
              <div id="navbar">
                  { this.navRender() }
              </div>
              <Switch>
                  <Route path="/" component={Default} exact />
                  <Route path="/login" component={Login} exact />
                  <Route path="/logout" component={Logout} exact />
                  <Route path="/CreateCompte" component={CreateCompte} exact />
                  <PrivateRoute path="/home" component={Home} exact />
                  <Route component={Error} />
              </Switch>
          </BrowserRouter>
      );
  }
}

export default App;
