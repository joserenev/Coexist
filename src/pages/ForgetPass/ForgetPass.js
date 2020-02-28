import React from "react";


import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    homePage: {
        backgroundColor: "#c8dbfa",
        fontSize: "32vh",
        height: "100%",
        position: "absolute",
        width: "100%"
    }
}));

function ForgotPassowrd(): React.MixedElement {
    const classes = useStyles();
    return <div className={classes.homePage}>
            ForgotPassowrdpage
        </div>;
}

export default ForgotPassowrd;
