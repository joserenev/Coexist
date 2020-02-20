import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import SideBar from "../../components/SideBar/SideBar";

const useStyles = makeStyles(theme => ({
    homePage: {
        backgroundColor: "#c8dbfa",
        fontSize: "32vh",
        height: "100%",
        position: "absolute",
        width: "100%"
    }
}));

function HomePage(): React.MixedElement {
    const classes = useStyles();
    return <div className={classes.homePage}>Hello World!</div>;
}
//export default connect(MatchStateToProps, {getUserConnect, getLoaded})(Homepage)
export default HomePage;
