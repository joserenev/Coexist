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
import Input from '@material-ui/core/Input';

// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Message from "./Message";

const useStyles = makeStyles(theme => ({
	box: {
		width: "75vw",
		height: "15vh",
		background: "#B2D8A3",
		zindex: 10,
		left: "5%"
	},
	buttonClass: {
		width: "15vh",
		height: "15vh",
		float: "right",
		backgroundColor: "#33B5E1"
	},
	input: {
		width: "calc(75vw-15vh)",
		height: "15vh"
	}
}));

function MessageBox(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.box}>
            <Button className={classes.buttonClass}>
			Send
			</Button>
			<Input className={classes.input}>
			Enter text here
			</Input>
        </div>
    );
}

export default MessageBox;
