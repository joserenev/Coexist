// @flow

import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";
import type QueryStatusEnum from "../../components/util/QueryUtil";

import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        flexDirection: "column",
        flex: 1,
        display: "flex"
    },

    info: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        displayContent: "center"
    }
}));

function CalendarPage(props): React.MixedElement {
    const classes = useStyles();
    const groupID = props.match?.params?.groupID ?? "";

    const { currentUserID = "" } = props;

    return (
        <div>
            <div className={classes.container}>CALENDAR SHOULD APPEAR HERE</div>
        </div>
    );
}

export default CalendarPage;
