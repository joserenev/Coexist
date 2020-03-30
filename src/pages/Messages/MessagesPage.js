import React, { useState, useCallback } from "react";
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
    Icon
} from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { makeStyles, useTheme, MuiThemeProvider,createMuiTheme} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';

import MessagePanel from "./MessagePanel";
import MessageBox from "./MessageBox";

// import axios from 'axios';

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: '745px',
        padding: '15px',
        
        
    },
}));

const greenTheme = createMuiTheme({ palette: {     primary: green,
    secondary: {
      main: '#c8e6c9',
    }, } })

function MessagesPage(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    const [isDialogOpen, setDialogOpen] = useState(false);
	
    return (
        <div className={classes.headContainer}>
            <MessagePanel />
			<MessageBox />
        </div>
    );
}

export default MessagesPage;
