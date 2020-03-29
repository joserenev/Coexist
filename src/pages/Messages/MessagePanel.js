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
    Fade
} from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ReceiptIcon from "@material-ui/icons/Receipt";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import AcceptIcon from "@material-ui/icons/CheckCircle";
import RejectIcon from "@material-ui/icons/Cancel";

// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Message from "./Message";

const useStyles = makeStyles(theme => ({
    headContainer: {
        margin: 10
    },

    largeIcons: {
        height: 180,
        width: 180
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        width: "100vh",
        minWidth: 500
    },
	pane: {
		width: "50vw",
		height: "80vh",
		background: "#A5D699",
		zindex: 10,
		left: "5%"
	}
}));

function MessagePanel(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.pane}>
            
        </div>
    );
}

export default MessagePanel;
