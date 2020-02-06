import React, { useState } from "react";
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
//import classnames from "classnames";

// styles
//import useStyles from "./styles";

// logo
//import logo from "./logo.svg";
//import google from "../../images/google.svg";

// context
/*
TODO:
    import { useUserDispatch, loginUser } from "../../context/UserContext";

*/
function HomePage(props) {
   // var classes = useStyles();
  
    // global
    //var userDispatch = useUserDispatch();
    var userDispatch = true;
  
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
  
    return (
      <header>
          <div>
              THIS IS THE HOMEPAGE
              </div>
          </header>
    );
  }
  
  export default withRouter(HomePage);