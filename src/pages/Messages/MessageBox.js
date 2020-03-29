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
// import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
	box: {
		width: "75vw",
		background: "#B2D8A3",
		zindex: 10,
		left: "5%",
		padding: "5px",
		margin: "0px"
	},
	buttonClass: {
		width: "15%",
		height: "100%",
		float: "right",
		backgroundColor: "#33B5E1"
	},
	input: {
		width: "85%",
		height: "100%",
		float: "left"		
	}
}));

function MessageBox(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
	const [value, setValue] = React.useState('Controlled');
	
	const handleChange = event => {
		setValue(event.target.value);
	  };
	  
    return (
        <div className={classes.box}>
            <Button className={classes.buttonClass}>
			Send
			</Button>
			<div>
			<TextField
			  id="filled-multiline-flexible"
			  label="Message"
			  style={{ }}
			  placeholder="Enter your message here."
			  helperText=""
			  multiline
			  fullWidth
			  rows="4"
			  rowsMax="4"
			  className={classes.input}
			  InputLabelProps={{
				shrink: true,
			  }}
			  variant="filled"
			/>
			</div>
        </div>
    );
}

export default MessageBox;
