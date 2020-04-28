// @flow
// @format

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { updateTask, deleteTask } from "../../api/Api";
import Avatar from "@material-ui/core/Avatar";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { convertToDateTimeLocalString } from "../../components/util/DateUtil";

const useStyles = makeStyles(theme => ({
    fields: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        margin: 8
    },
    imagePreviewContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        align: "center"
    },
    imagePreview: {
        height: 400,
        width: 540,
        padding: 20
    },
    button: {
        margin: theme.spacing(1)
    },
    assignRandomlyButton: {
        float: "right"
    },
    deleteButton: {
        margin: "0  40%",
        width: 120
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateTask({
    isDialogOpen,
    setDialogOpen,
    groupMembers,
    task
}): React.MixedElement {
    const classes = useStyles();

    // Page Handling
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);

    //state values
    const {
        id = "",
        name: prevName = "",
        description: prevDescription = "",
        isImportant = false,
        dueDate: prevDueDate = "",
        assignedTo = {}
    } = task ?? {};
    const [name, setName] = useState(prevName ?? "");
    const [description, setDescription] = useState(prevDescription ?? "");
    const [dueDate, setDueDate] = useState(
        prevDueDate === null
            ? ""
            : convertToDateTimeLocalString(new Date(prevDueDate))
    );

    const getAssignedGroupMember = useCallback(() => {
        if (assignedTo === null) {
            return null;
        }
        return groupMembers.find(groupMember => {
            return groupMember.id === assignedTo.id;
        });
    }, [assignedTo, groupMembers]);
    const [assignedUser, setAssignedUser] = useState(getAssignedGroupMember());
    const [isTaskImportant, setIsTaskImportant] = useState(
        isImportant ?? false
    );

    //Event handlers
    const handleAssignedUserChange = useCallback(event => {
        setAssignedUser(event.target.value);
    }, []);

    const handleRandomAssignment = useCallback(() => {
        // set selected user randomly
        setAssignedUser(
            groupMembers[Math.floor(Math.random() * groupMembers.length)]
        );
    }, [groupMembers]);

    const handleClose = useCallback(() => {
        setName("");
        setDescription("");
        setDueDate("");
        setAssignedUser(null);
        setDialogOpen(false);
    }, [setDialogOpen]);

    const isEntryValid = useCallback(() => {
        if (name === "") {
            setErrorMessage("Task name is required");
            setErrorOpen(true);
        } else if (description === "") {
            setErrorMessage("Task description is required");
            setErrorOpen(true);
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [description, name]);

    const hasAnythingChanged = useCallback(() => {
        if (
            name !== prevName ||
            description !== prevDescription ||
            ((assignedUser !== null && assignedTo === null) ||
                (assignedUser !== null &&
                    assignedTo !== null &&
                    assignedUser.id !== assignedTo.id)) ||
            isImportant !== isTaskImportant ||
            (dueDate !== "" &&
                prevDueDate !== new Date(dueDate).toISOString()) ||
            (dueDate === "" && prevDueDate !== null)
        ) {
            return true;
        }
        return false;
    }, [
        assignedTo,
        assignedUser,
        description,
        dueDate,
        isImportant,
        isTaskImportant,
        name,
        prevDescription,
        prevDueDate,
        prevName
    ]);

    const handleSubmit = useCallback(async () => {
        if (!isEntryValid()) {
            return;
        }
        let inputInfo = {
            id
        };
        if (name !== prevName) {
            inputInfo = {
                ...inputInfo,
                name
            };
        }
        if (description !== prevDescription) {
            inputInfo = {
                ...inputInfo,
                description
            };
        }

        if (prevDueDate !== dueDate) {
            inputInfo = {
                ...inputInfo,
                dueDate: dueDate === "" ? null : new Date(dueDate).toISOString()
            };
        }
        if (
            (assignedUser !== null && assignedTo === null) ||
            (assignedUser !== null &&
                assignedTo !== null &&
                assignedUser.id !== assignedTo.id)
        ) {
            inputInfo = {
                ...inputInfo,
                taskAssignedToId: assignedUser.id
            };
        }
        if (isImportant !== isTaskImportant) {
            inputInfo = {
                ...inputInfo,
                isImportant: isTaskImportant
            };
        }
        await updateTask(inputInfo)
            .then(res => {
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(err => {
                setErrorOpen(true);
                setErrorMessage("Failed to update task");
            });
    }, [
        assignedTo,
        assignedUser,
        description,
        dueDate,
        handleClose,
        id,
        isEntryValid,
        isImportant,
        isTaskImportant,
        name,
        prevDescription,
        prevDueDate,
        prevName
    ]);

    const handleDeleteTask = useCallback(async () => {
        await deleteTask(id)
            .then(res => {
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(err => {
                setErrorOpen(true);
                setErrorMessage("Failed to delete task");
            });
    }, [handleClose, id]);

    return (
        <div>
            <Dialog
                fullWidth
                open={isDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Create Task</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1">Task Name</Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                style={{ width: 240 }}
                            />
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Task Description
                            </Typography>
                            <TextField
                                margin="dense"
                                id="description"
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                                style={{ width: 240 }}
                            />
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Due Date
                            </Typography>
                            <TextField
                                margin="dense"
                                type="datetime-local"
                                value={dueDate}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={event =>
                                    setDueDate(event.target.value)
                                }
                                style={{ width: 240 }}
                                helperText="(Optional)"
                            />
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Mark as important
                            </Typography>
                            <Checkbox
                                color="primary"
                                checked={isTaskImportant}
                                onChange={event => {
                                    setIsTaskImportant(event.target.checked);
                                }}
                            />
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Assigned To
                            </Typography>
                            <Select
                                value={assignedUser}
                                displayEmpty
                                onChange={handleAssignedUserChange}
                                style={{ width: 240 }}
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
                        </div>
                        <div className={classes.assignRandomlyButton}>
                            <Link
                                onClick={event => {
                                    event.preventDefault();
                                    handleRandomAssignment();
                                }}
                                component="button"
                                variant="body2"
                            >
                                Assign Randomly
                            </Link>
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <Button
                            className={classes.deleteButton}
                            onClick={handleDeleteTask}
                            color="secondary"
                        >
                            DELETE TASK
                        </Button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="outlined"
                        disabled={!hasAnythingChanged()}
                    >
                        UPDATE TASK
                    </Button>
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdateTask;
