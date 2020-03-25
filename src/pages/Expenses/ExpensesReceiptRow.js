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
    }
}));

function ExpensesReceiptRow(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.headContainer}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Grid item>
                            <Typography
                                variant="h3"
                                align="center"
                                gutterBottom
                            >
                                Groceries{" "}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonBase>
                                <ReceiptIcon className={classes.largeIcons} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>OWNER</b>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Jose Valbuena: paid $15
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonBase>
                                    <AcceptIcon />
                                </ButtonBase>
                                <ButtonBase>
                                    <RejectIcon />
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">
                                <b>DEBTERS</b>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Paul Krivacka: $5 <br />
                                Dhriti Chawla: $5
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default ExpensesReceiptRow;
