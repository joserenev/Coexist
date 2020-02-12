import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  


//pages
import Login from "../pages/login/Login";
import HomePage from "../pages/homepage/HomePage";

//component
import Layout from "../components/Layout/Layout";

import Authentication from "../authentication/Authentication"
import { Athena } from "aws-sdk/clients/all";
//context TODO
const Main= props => {
    const {currentUser}= props;
    return(
        <Router>
        <div>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
                <Route exact path="/" render={props=>{
                    return(
                        <Login />
                    )
                }}/>
                <Route exact path="/homepage" render={props=>{
                    return(
                        <HomePage />
                    )
                }}/>
          </Switch>
        </div>
      </Router>
    )
};
export default ((Main));