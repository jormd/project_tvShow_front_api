import React, { Component } from 'react';
import './css/App.scss';
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import Auth from "./auth";


//différent controller pour les appellés
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Default from "./Components/Default";
import CreateCompte from "./Components/CreateCompte";
import PageTvShow from "./Components/PageTvShow";
import Search from "./Components/Search";
import ProfileUser from "./Components/ProfileUser";
import NextEpisode from "./Components/NextEpisode";
import PageEpisodeNext from "./Components/PageEpisodeNext";

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
        if(auth.getAuthentificate() == 'true'){
            return [
                <div>
                    <div className="elementNav">
                        <Link to={'/home'} className="nav-link"><i className="material-icons">home</i></Link>
                    </div>
                    <div className="elementNav">
                        <Link to={'/search'} className="nav-link"><i className="material-icons">search</i></Link>
                    </div>
                    <div className="elementNav">
                        <Link to={'/nextepisode'} className="nav-link"><i className="material-icons">tv</i></Link>
                    </div>
                    <div className="elementNav">
                        <Link to={'/profileuser/'+auth.getId()} className="nav-link"><i className="material-icons">settings</i></Link>
                    </div>
                </div>,
                <div>
                    <div className="elementNav">
                        <Link to={'/logout'} className="nav-link">Logout</Link>
                    </div>
                </div>
            ];
        }
        return [
            <div>
                <div className="elementNav">
                    <Link to={'/'} className="nav-link"><i className="material-icons">home</i></Link>
                </div>
            </div>
            ,
            <div>
                <div className="elementNav">
                    <Link to={'/login'} className="nav-link"> Login </Link>
                </div>
            </div>
            ];
    }

  render() {

      return (
          <BrowserRouter>
              <div>
                  <div id="navbar">
                  { this.navRender() }
                  </div>
                  <switch>
                        <Route path="/" component={Default} exact />
                        <Route path="/login" component={Login} exact />
                        <Route path="/logout" component={Logout} exact />
                        <Route path="/CreateCompte" component={CreateCompte} exact />
                        <PrivateRoute path="/home" component={Home} exact />
                        <PrivateRoute path="/tvshow/:handle" component={PageTvShow} exact />
                        <PrivateRoute path="/search" component={Search} exact />
                        <PrivateRoute path="/profileuser/:handle" component={ProfileUser} exact />
                        <PrivateRoute path="/nextepisode" component={NextEpisode} exact />
                      <PrivateRoute path="/episode/:param1/:param2/:param3" component={PageEpisodeNext} exact />
                  </switch>
              </div>
          </BrowserRouter>
      );
  }
}

export default App;
