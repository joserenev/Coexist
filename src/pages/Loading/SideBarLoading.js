// @flow

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 280,
        height: "92vh"
    },
    placeHolder: {
        height: "40vh",
        marginLeft: 12,
        marginRight: 12
    }
}));

function SideBarLoading(): React.Element<"div"> {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Skeleton
                        animation="wave"
                        variant="circle"
                        width={80}
                        height={80}
                    />
                }
                action={null}
                title={
                    <Skeleton
                        animation="wave"
                        height={40}
                        width="80%"
                        style={{ marginBottom: 12 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={20} width="40%" />
                }
            />
            <Skeleton
                animation="wave"
                variant="rect"
                className={classes.placeHolder}
            />
            <CardContent>
                <React.Fragment>
                    <Skeleton
                        animation="wave"
                        height={80}
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={20} width="80%" />
                </React.Fragment>
            </CardContent>
        </Card>
    );
}
export default SideBarLoading;
