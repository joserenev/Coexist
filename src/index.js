import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from "./components/App";

//for mdl layouts
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import Themes from "./themes";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";


import * as serviceWorker from './serviceWorker';

import Amplify from 'aws-amplify'
import config from './aws-exports'

import firebase from 'firebase';
import firebaseConfig from './firebase-config';

//Initialize AWS
Amplify.configure(config)

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <ThemeProvider theme={Themes.default}>
     <CssBaseline />
        <App />
    </ThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
