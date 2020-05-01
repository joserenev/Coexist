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
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import { red } from "@material-ui/core/colors";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import { TaskStatusEnum } from "../../components/util/TasksConstants";
import {
    updateTaskCompletion,
    updateTaskImportance,
    updateTaskAssignedUser
} from "../../api/Api";

import UpdateTask from "./UpdateTask";

const { INCOMPLETE, COMPLETE } = TaskStatusEnum;

const useStyles = makeStyles(theme => ({
    rowContainer: {
        padding: 4,
        margin: 2,
        width: "100%"
    },
    userSelectItem: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center"
    },
    selectDropDown: {
        width: "80%"
    }
}));

function TaskRow({ groupID, groupMembers, task, currentUserID }) {
    const classes = useStyles();

    // Page Handling
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);

    // State variables
    const {
        id = "",
        name = "",
        description = "",
        isImportant = false,
        dueDate = "",
        status = INCOMPLETE,
        assignedTo = {}
    } = task;
    const [isCompleted, setIsCompleted] = useState(status === COMPLETE);
    const [isTaskImportant, setIsTaskImportant] = useState(
        isImportant ?? false
    );

    const getAssignedGroupMember = useCallback(() => {
        if (assignedTo === null) {
            return null;
        }
        return groupMembers.find(groupMember => {
            return groupMember.id === assignedTo.id;
        });
    }, [assignedTo, groupMembers]);
    const [assignedUser, setSelectedUser] = useState(getAssignedGroupMember());

    const isCurrentUserAssigned = useCallback(() => {
        if (assignedUser === null) {
            return true;
        }
        return assignedUser.id === currentUserID;
    }, [assignedUser, currentUserID]);

    // Update Task Dialog
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    // Event handlers
    const handleAssignedUserChange = useCallback(
        async event => {
            setSelectedUser(event.target.value);
            if (
                assignedTo !== null &&
                event.target.value.id === assignedTo.id
            ) {
                return;
            }
            await updateTaskAssignedUser(
                id,
                event.target.value.id,
                name,
                currentUserID,
                groupID
            )
                .then(res => {
                    setErrorOpen(false);
                    setErrorMessage("");
                    window.location.reload(true);
                })
                .catch(err => {
                    setErrorOpen(true);
                    setErrorMessage(
                        "Error occured while udpating assigned user. Please try again."
                    );
                });
        },
        [assignedTo, currentUserID, groupID, id, name]
    );

    const handleSetIsTaskImportant = useCallback(
        async event => {
            setIsTaskImportant(event.target.checked);
            await updateTaskImportance(id, event.target.checked)
                .then(res => {
                    setErrorOpen(false);
                    setErrorMessage("");
                    window.location.reload(true);
                })
                .catch(err => {
                    setErrorOpen(true);
                    setErrorMessage(
                        "Error occured while setting task importance. Please try again."
                    );
                });
        },
        [id]
    );

    const handleSetIsTaskCompleted = useCallback(
        async event => {
            setIsCompleted(event.target.checked);
            await updateTaskCompletion(id, event.target.checked)
                .then(res => {
                    setErrorOpen(false);
                    setErrorMessage("");
                    window.location.reload(false);
                })
                .catch(err => {
                    setErrorOpen(true);
                    setErrorMessage(
                        "Error occured while updating task completion. Please try again."
                    );
                });
        },
        [id]
    );

    return (
        <>
            <Paper className={classes.rowContainer}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
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
                            onChange={handleSetIsTaskCompleted}
                            disabled={!isCurrentUserAssigned()}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Typography noWrap>{name}</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Typography noWrap>{description}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Select
                            value={assignedUser}
                            displayEmpty
                            onChange={handleAssignedUserChange}
                            className={classes.selectDropDown}
                        >
                            <MenuItem value={null} disabled>
                                Not Assigned
                            </MenuItem>
                            {groupMembers.map(user => {
                                const { name = "", pictureURL = "" } =
                                    user ?? {};
                                return (
                                    <MenuItem key={user.id} value={user}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="center"
                                            spacing={2}
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
                        <Typography>
                            {dueDate !== null &&
                                new Date(dueDate).toLocaleString()}
                            {(dueDate === null || dueDate === "") &&
                                "No due date"}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Checkbox
                            checked={isTaskImportant}
                            checkedIcon={
                                <PriorityHighIcon
                                    style={{ fontSize: 28, color: red[500] }}
                                />
                            }
                            icon={
                                <PriorityHighIcon
                                    color="disabled"
                                    style={{ fontSize: 28 }}
                                />
                            }
                            onChange={handleSetIsTaskImportant}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <EditIcon
                            color="primary"
                            style={{ fontSize: 24 }}
                            onClick={() => {
                                setIsUpdateDialogOpen(true);
                            }}
                            task={task}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={isErrorOpen}
                onClose={() => {
                    setErrorOpen(false);
                }}
                autoHideDuration={6000}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setErrorOpen(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            >
                <Alert
                    onClose={() => {
                        setErrorOpen(false);
                    }}
                    severity="error"
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
            {isUpdateDialogOpen && (
                <UpdateTask
                    isDialogOpen={isUpdateDialogOpen}
                    setDialogOpen={setIsUpdateDialogOpen}
                    groupMembers={groupMembers}
                    groupID={groupID}
                    task={task}
                />
            )}
        </>
    );
}

export default TaskRow;
