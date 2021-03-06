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

import AddButton from "@material-ui/icons/AddCircle";
import Avatar from "@material-ui/core/Avatar";
// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        flexDirection: "column",
        // minWidth: 540,
        height: "75vh",
        flex: 1,
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },

    errorContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        fontSize: "20vh"
    },

    addButton: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },

    largeIcons: {
        marginTop: 40,
        height: 180,
        width: 180
    }
}));

function NoGroupFoundPage(): React.MixedElement {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>
            <div className={classes.headContainer}>
                <div className={classes.errorContainer}>
                    <GroupAddIcon
                        fontSize="large"
                        className={classes.largeIcons}
                    />
                </div>
                <div className={classes.addButton}>
                    <Typography variant="h6" gutterBottom>
                        Seems like you're not added to any groups.
                        <br />
                        Create a new group now!
                    </Typography>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<AddButton />}
                        href="/createGroup"
                    ></Button>
                </div>
            </div>
        </div>
    );
}

export default NoGroupFoundPage;
