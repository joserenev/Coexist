// @flow

import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    backdrop: {
        backgroundColor: "#DAE9D9",
        color: "black",
        zIndex: theme.zIndex.drawer + 1
    }
}));

function LoadingPage(): React.Element<"div"> {
    const classes = useStyles();
    return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default LoadingPage;
