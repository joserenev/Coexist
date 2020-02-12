import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import {BrowserRouter as Router} from "react-router-dom";
import Main from "../components/Main"


//pages
import Login from "../pages/login/Login";
import HomePage from "../pages/homepage/HomePage";

//component
import Layout from "../components/Layout/Layout";

import Authentication from "../authentication/Authentication"
import { Athena } from "aws-sdk/clients/all";
//context TODO

const App = props => (
  <Router>
      <div >
          <Main/>
      </div>
  </Router>
);

export default App;