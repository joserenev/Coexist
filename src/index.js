import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from "./components/App";

import Themes from "./themes";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";


import * as serviceWorker from './serviceWorker';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

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
