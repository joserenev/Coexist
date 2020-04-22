import React, { useState, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import UncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import UncheckedImportantIcon from "@material-ui/icons/StarBorder";
import CheckedImportantIcon from "@material-ui/icons/Star";
import { yellow } from "@material-ui/core/colors";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    rowContainer: {
        padding: 4,
        margin: 2,
        minWidth: "80vw"
    },
    userSelectItem: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center"
    }
}));

function TaskRow({ groupMembers }) {
    const classes = useStyles();

    const [isCompleted, setIsCompleted] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [assignedUser, setSelectedUser] = useState(null);

    const handleAssignedUserChange = useCallback(event => {
        setSelectedUser(event.target.value);
    }, []);

    console.log({ groupMembers });

    return (
        <Paper className={classes.rowContainer}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={1} sm={1}>
                    <Checkbox
                        checked={isCompleted}
                        checkedIcon={
                            <CheckedIcon
                                color="primary"
                                style={{ fontSize: 28 }}
                            />
                        }
                        icon={
                            <UncheckedIcon
                                color="disabled"
                                style={{ fontSize: 28 }}
                            />
                        }
                        onChange={event => {
                            setIsCompleted(event.target.checked);
                        }}
                    />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography>Name</Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Typography>Description</Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Select
                        value={assignedUser}
                        displayEmpty
                        onChange={handleAssignedUserChange}
                    >
                        <MenuItem value={null} disabled>
                            Not Assigned
                        </MenuItem>
                        {groupMembers.map(item => {
                            const { user = {} } = item ?? {};
                            const { name = "", pictureURL = "" } = user ?? {};
                            return (
                                <MenuItem key={user.id} value={user}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        <Grid item xs={4} sm={4}>
                                            {pictureURL == null ||
                                            pictureURL === "" ? (
                                                <Avatar alt={name}>
                                                    {name.charAt(0)}
                                                </Avatar>
                                            ) : (
                                                <Avatar
                                                    alt={name}
                                                    src={pictureURL}
                                                ></Avatar>
                                            )}
                                        </Grid>
                                        <Grid item xs={8} sm={8}>
                                            <Typography
                                                variant="subtitle1"
                                                color="inherit"
                                            >
                                                {user?.name ?? ""}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography>{new Date().toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={1} sm={1}>
                    <Checkbox
                        checked={isImportant}
                        checkedIcon={
                            <CheckedImportantIcon
                                style={{ fontSize: 28, color: yellow[500] }}
                            />
                        }
                        icon={
                            <UncheckedImportantIcon
                                color="disabled"
                                style={{ fontSize: 28 }}
                            />
                        }
                        onChange={event => {
                            setIsImportant(event.target.checked);
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TaskRow;
