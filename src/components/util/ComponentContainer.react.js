// @format
// @flow
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import SideBar from "../../components/SideBar/SideBar.js";

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
    isSideBarOpen: boolean,
    setSideBarOpen: boolean => void,
    userID: string
|};

function ComponentContainer({
    children,
    isSideBarOpen,
    setSideBarOpen,
    userID
}: Props): React.Element<"div"> {
    // Add transitions to closing and opening.
    const classes = useStyles(isSideBarOpen ? 280 : 0);

    return (
        <>
            <SideBar
                isSideBarOpen={isSideBarOpen}
                setSideBarOpen={setSideBarOpen}
                userID={userID}
            />
            <div className={classes.container}>{children}</div>
        </>
    );
}

export default ComponentContainer;
