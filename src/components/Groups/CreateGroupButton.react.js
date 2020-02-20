// @flow
// @format

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    group: {
        "&:hover": {
            background: "#dddddd"
        },
        cursor: "pointer"
    }
}));

function CreateGroupButton(): React.MixedElement {
    const classes = useStyles();

    return (
        <ListItem
            alignItems="center"
            className={classes.group}
            component={Link}
            to="createGroup"
        >
            <AddIcon color="action" />
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography component="span" color="textPrimary">
                            Create a new Group
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default CreateGroupButton;
