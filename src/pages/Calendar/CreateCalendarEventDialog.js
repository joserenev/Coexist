import React, { useState, useCallback, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import { createNewCalendarEvent } from "../../api/Api";
import { convertToDateTimeLocalString } from "../../components/util/DateUtil";
import { CalendarEventStatusEnum } from "../../components/util/CalendarEventConstants";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";
const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445"
});
var channels = []; ////change to group id

const { NOTIF_REQUIRED, NOTIF_NOT_REQUIRED } = CalendarEventStatusEnum;

function CreateCalendarEventDialog({
    open,
    setOpen,
    pickedEventStart,
    pickedEventEnd,
    currentUserID,
    groupID
}) {
    // Event State Variables

    const [newEventName, setNewEventName] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [newEventStart, setNewEventStart] = useState("");
    const [newEventEnd, setNewEventEnd] = useState("");
    const [newEventLocation, setNewEventLocation] = useState("");
    const [newEventNotifEnabled, setNewEventNotifEnabled] = useState(true);

    // UI State Variables
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);
    const handleSnackBarClose = () => {
        setErrorOpen(false);
        setErrorMessage("");
    };
	
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
        json.notificationClass = "Calendar";
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

    useEffect(() => {
        if (!open) {
            return;
        }
        if (pickedEventStart !== null && newEventStart === "") {
            setNewEventStart(convertToDateTimeLocalString(pickedEventStart));
        }
        if (pickedEventEnd !== null && newEventEnd === "") {
            setNewEventEnd(convertToDateTimeLocalString(pickedEventEnd));
        }
        return () => {};
    }, [newEventEnd, newEventStart, open, pickedEventEnd, pickedEventStart]);

    const handleClose = useCallback(() => {
        setNewEventName("");
        setNewEventDescription("");
        setNewEventStart("");
        setNewEventEnd("");
        setNewEventLocation("");
        setOpen(false);
    }, [setOpen]);

    const isEntryValid = useCallback(() => {
        if (newEventName === "") {
            setErrorMessage("Name is required");
            setErrorOpen(true);
        } else if (newEventStart === "") {
            setErrorMessage("Event start time is required");
            setErrorOpen(true);
        } else if (newEventEnd === "") {
            setErrorMessage("Event end time is required");
            setErrorOpen(true);
        } else if (newEventStart.localeCompare(newEventEnd) > 0) {
            setErrorMessage("Event start time cannot be after the end time.");
            setErrorOpen(true);
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [newEventEnd, newEventName, newEventStart]);

    const handleSubmit = useCallback(async () => {
        if (!isEntryValid()) {
            return;
        }
		sendMessage("created a new event: '" + newEventName + "' at time " + new Date(newEventStart));
        await createNewCalendarEvent({
            name: newEventName,
            description: newEventDescription,
            location: newEventLocation,
            startTimestamp: new Date(newEventStart).toISOString(),
            endTimestamp: new Date(newEventEnd).toISOString(),
            calendarEventOwnerId: currentUserID,
            calendarEventGroupId: groupID,
            status: newEventNotifEnabled ? NOTIF_REQUIRED : NOTIF_NOT_REQUIRED
        })
            .then(res => {
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(err => {
                setErrorOpen(true);
                setErrorMessage(
                    "Failed to create new calendar event. Please try again."
                );
            });
    }, [
        currentUserID,
        groupID,
        handleClose,
        isEntryValid,
        newEventDescription,
        newEventEnd,
        newEventLocation,
        newEventName,
        newEventNotifEnabled,
        newEventStart
    ]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">Create new event</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the following details to create an event.
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        value={newEventName}
                        onChange={event => setNewEventName(event.target.value)}
                        type="text"
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={newEventDescription}
                        onChange={event =>
                            setNewEventDescription(event.target.value)
                        }
                        type="text"
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Location"
                        fullWidth
                        value={newEventLocation}
                        onChange={event =>
                            setNewEventLocation(event.target.value)
                        }
                        type="text"
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Start Time"
                        type="datetime-local"
                        value={newEventStart}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={event => setNewEventStart(event.target.value)}
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="End Time"
                        type="datetime-local"
                        value={newEventEnd}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={event => setNewEventEnd(event.target.value)}
                        error={newEventStart.localeCompare(newEventEnd) > 0}
                    />
                </DialogContentText>
                <DialogContentText>
                    <Typography variant="body3" gutterBottom>
                        Notify group members an hour before the event?
                    </Typography>
                    <Checkbox
                        color="primary"
                        checked={newEventNotifEnabled}
                        onChange={event => {
                            setNewEventNotifEnabled(event.target.checked);
                        }}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Create Event
                </Button>
            </DialogActions>
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
                            onClick={handleSnackBarClose}
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
        </Dialog>
    );
}

export default CreateCalendarEventDialog;
