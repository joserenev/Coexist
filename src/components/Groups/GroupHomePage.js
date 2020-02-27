import React, { useCallback, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import ExpensesIcon from "@material-ui/icons/AttachMoney";
import ChatIcon from "@material-ui/icons/Forum";
import CalendarIcon from "@material-ui/icons/Event";
import TasksIcon from "@material-ui/icons/Assignment";

import EditGroupSettings from "./EditGroupSettings";

const useStyles = makeStyles(theme => ({
    homePageContainer: {
        margin: 20,
        backgroundColor: "#ecf0f1",
        align: "center",
        justifyContent: "space-between",
        padding: "20",
        display: "flex",
        flexDirection: "row",
        minWidth: 540
    },

    buttonContainer: {
        margin: 40,
        flex: 0.25,
        background: "linear-gradient(45deg, #c0d6b9 30%, #d6ebd7 90%)",
        borderRadius: 5,
        boxShadow: "0 3px 5px 2px rgba(55, 63, 82, .3)",

        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },

    buttonImage: {
        align: "center",
        justifyContent: "center"
    },

    largeIcons: {
        height: 240,
        width: 240
    }
}));

function GroupHomePage(props): React.MixedElement {
    const classes = useStyles();
    const history = useHistory();
    const navigateToExpenses = useCallback(() => {
        history.push("/expenses");
    });
    // console.log(props.match?.params?.groupID ?? "");
    return (
        <>
            <div className={classes.homePageContainer}>
                <div
                    className={classes.buttonContainer}
                    onClick={navigateToExpenses}
                >
                    <ExpensesIcon
                        fontSize="large"
                        className={classes.largeIcons}
                    />
                    <div></div>
                </div>

                <div className={classes.buttonContainer}>
                    <TasksIcon
                        fontSize="large"
                        className={classes.largeIcons}
                    />
                </div>
            </div>
            <div className={classes.homePageContainer}>
                <div className={classes.buttonContainer}>
                    <ChatIcon fontSize="large" className={classes.largeIcons} />
                </div>
                <div className={classes.buttonContainer}>
                    <CalendarIcon
                        fontSize="large"
                        className={classes.largeIcons}
                    />
                </div>
            </div>
            <EditGroupSettings />
        </>
    );
}
export default GroupHomePage;
