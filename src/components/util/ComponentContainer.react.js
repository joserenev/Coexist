// @format
// @flow
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(marginLeft => ({
    container: {
        top: 64,
        width: "auto",
        height: "100vh",
        boxSizing: "content-box",
        marginLeft: marginLeft => marginLeft,
        position: "relative",
        overflowX: "hidden"
    }
}));

type Props = {|
    children: React.Node,
    isSideBarOpen: boolean
|};

function ComponentContainer({
    children,
    isSideBarOpen
}: Props): React.Element<"div"> {
    // Add transitions to closing and opening.
    const classes = useStyles(isSideBarOpen ? 240 : 0);
    return <div className={classes.container}>{children}</div>;
}

export default ComponentContainer;
