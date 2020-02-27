import React from "react";
import { graphqlOperation } from "aws-amplify";

import { Typography, Button, Switch, FormGroup, FormControlLabel, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import ComponentContainer from "../../components/util/ComponentContainer.react"
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';

import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    referralPage: {
        backgroundColor: "#c8dbfa",
        fontSize: "32vh",
        height: "100%",
        position: "absolute",
        width: "100%",
        padding: "30px",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(60),
          height: theme.spacing(30),

        },
        padding: "80px",
        overflow: 'hidden',
    },
    paper: {
        width: 700,
        maxWidth: 700,
        margin: `${theme.spacing(1)}px auto`,
        top: '30px'
      },
}));




const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

function ReferralPage(): React.MixedElement {
    const classes = useStyles();
    return (
        <div className={classes.root}>
         <Paper className={classes.paper}>
        <Grid container  spacing={2}>
          <Grid item>
            
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container  spacing={2}>
          <Grid item>
           
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
        </div>
      );
}

export default ReferralPage;