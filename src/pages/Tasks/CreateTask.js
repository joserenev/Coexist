// @flow
// @format

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { createNewTask } from "../../api/Api";
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
import { TaskNotifEnum } from "../../components/util/TasksConstants";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

const { NOTIF_NOT_REQUIRED, NOTIF_REQUIRED } = TaskNotifEnum;
const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445"
});
var channels = []; ////change to group id

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
    notifyButton: {
        marginTop: 24
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CreateExpense({
    currentUserID,
    groupID,
    isDialogOpen,
    setDialogOpen,
    groupMembers
}: Props): React.MixedElement {
    const classes = useStyles();

    // Page Handling
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);

    //state values
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignedUser, setAssignedUser] = useState(null);
    const [isTaskImportant, setIsTaskImportant] = useState(false);
    const [taskNotifEnabled, setTaskNotifEnabled] = useState(false);

    //notification stuff
    var groupJSON = window.localStorage.getItem("CoexistGroups") || "{}";
    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var groups = JSON.parse(groupJSON);
    var userData = JSON.parse(userDataJSON);
    channels[0] = groupID;
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState("");
    const sendMessage = message => {
        var json = {};
        json.message = userData.username + " " + message;
        json.timeSent = new Date().getTime();
        json.uniqueId = Math.random();
        json.notificationClass = "Task";
        json.sender = userData.username;
        json.groupId = groupID;
        json.currentUserId = currentUserID;

        pubnub.publish(
            {
                channel: channels[0],
                message: json
            },
            () => setMessage("")
        );
    };

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
        setTaskNotifEnabled(false);
        setDialogOpen(false);
    }, [setDialogOpen]);

    const isEntryValid = useCallback(() => {
        if (name === "") {
            setErrorMessage("Task name is required");
            setErrorOpen(true);
        } else if (description === "") {
            setErrorMessage("Task description is required");
            setErrorOpen(true);
        } else if (dueDate === "" && taskNotifEnabled) {
            setErrorMessage(
                "Task due date is required if you would like to be notified."
            );
            setErrorOpen(true);
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [description, dueDate, name, taskNotifEnabled]);

    const handleSubmit = useCallback(async () => {
        if (!isEntryValid()) {
            return;
        }
        sendMessage("has created a new task: '" + name + "'");
        let inputInfo = {
            name,
            description,
            taskGroupId: groupID,
            taskOwnerId: currentUserID,
            isImportant: isTaskImportant,
            notifStatus: taskNotifEnabled ? NOTIF_REQUIRED : NOTIF_NOT_REQUIRED
        };
        if (dueDate !== "") {
            inputInfo = {
                ...inputInfo,
                dueDate: new Date(dueDate).toISOString()
            };
        }
        if (assignedUser !== null) {
            inputInfo = {
                ...inputInfo,
                taskAssignedToId: assignedUser.id
            };
        }
        await createNewTask(inputInfo)
            .then(res => {
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(err => {
                setErrorOpen(true);
                setErrorMessage("Failed to create new task");
            });
    }, [
        assignedUser,
        currentUserID,
        description,
        dueDate,
        groupID,
        handleClose,
        isEntryValid,
        isTaskImportant,
        name,
        sendMessage,
        taskNotifEnabled
    ]);

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
                        <div className={classes.notifyButton}>
                            <Typography variant="body3" gutterBottom>
                                Notify the assigned member an hour before the
                                task is due?
                            </Typography>
                            <Checkbox
                                color="primary"
                                checked={taskNotifEnabled}
                                onChange={event => {
                                    setTaskNotifEnabled(event.target.checked);
                                }}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="outlined"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="outlined"
                    >
                        SUBMIT
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

export default CreateExpense;
