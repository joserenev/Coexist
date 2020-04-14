import React, { useState, useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import AttendingIcon from "@material-ui/icons/CheckCircle";
import MaybeIcon from "@material-ui/icons/Help";
import NotAttendingIcon from "@material-ui/icons/Cancel";
import AwaitingResponseIcon from "@material-ui/icons/WatchLater";

import ButtonBase from "@material-ui/core/ButtonBase";
import { green, yellow, red, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import {
    updateCalendarEvent,
    registerCalendarEventResponse
} from "../../api/Api";
import { convertToDateTimeLocalString } from "../../components/util/DateUtil";
import SimpleUserProfileView from "../../components/User/SimpleUserProfileView";
import {
    CalendarEventStatusEnum,
    CalendarEventResponseEnum
} from "../../components/util/CalendarEventConstants";

const { NOTIF_REQUIRED, NOTIF_NOT_REQUIRED } = CalendarEventStatusEnum;

const { ATTENDING, NOT_ATTENDING, MAYBE } = CalendarEventResponseEnum;

const useStyles = makeStyles(theme => ({
    responseButtonContainer: {
        left: 24,
        position: "absolute"
    },
    groupMemberRow: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center"
    }
}));

function CalendarEventInfoDialog({
    isDialogOpen,
    setIsDialogOpen,
    event,
    currentUserID,
    groupID,
    groupMembers
}) {
    //getting event info
    const {
        id: eventID,
        title = "",
        description = "",
        start = "",
        end = "",
        status = "",
        location = "",
        memberResponses: rawMemberResponses = "[]",
        owner = {}
    } = event ?? {};
    const classes = useStyles();

    const isNotOwner = owner?.id !== currentUserID;

    // state variables to update
    const [updatedEventName, setUpdatedEventName] = useState(title ?? "");
    const [updatedEventDescription, setUpdatedEventDescription] = useState(
        description ?? ""
    );
    const [updatedEventStart, setUpdatedEventStart] = useState(
        convertToDateTimeLocalString(new Date(start ?? ""))
    );
    const [updatedEventEnd, setUpdatedEventEnd] = useState(
        convertToDateTimeLocalString(new Date(end ?? ""))
    );
    const [updatedEventLocation, setUpdatedEventLocation] = useState(location);
    const [updatedEventNotifEnabled, setUpdatedEventNotifEnabled] = useState(
        status === NOTIF_REQUIRED
    );
    const memberResponses = new Map(JSON.parse(rawMemberResponses ?? "[]"));

    // Dialog functions
    const closeEventDetailDialog = useCallback(() => {
        setUpdatedEventName("");
        setUpdatedEventDescription("");
        setUpdatedEventStart("");
        setUpdatedEventEnd("");
        setUpdatedEventLocation("");
        setUpdatedEventNotifEnabled(true);
        setIsDialogOpen(false);
    }, [setIsDialogOpen]);

    // Update Functionality
    const isEntryValid = useCallback(() => {
        if (updatedEventName === "") {
            setErrorMessage("Name is required");
            setErrorOpen(true);
        } else if (updatedEventStart === "") {
            setErrorMessage("Event start time is required");
            setErrorOpen(true);
        } else if (updatedEventEnd === "") {
            setErrorMessage("Event end time is required");
            setErrorOpen(true);
        } else if (updatedEventStart.localeCompare(updatedEventEnd) > 0) {
            setErrorMessage("Event start time cannot be after the end time.");
            setErrorOpen(true);
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [updatedEventEnd, updatedEventName, updatedEventStart]);

    const handleUpdateEvent = useCallback(async () => {
        if (!isEntryValid()) {
            return;
        }
        let updateEventInfo = {
            id: eventID
        };

        let hasAnythingUpdated = false;

        if (updatedEventName !== title) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                name: updatedEventName
            };
        }
        if (updatedEventDescription !== description) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                description: updatedEventDescription
            };
        }
        if (
            updatedEventStart !==
            convertToDateTimeLocalString(new Date(start ?? ""))
        ) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                startTimestamp: new Date(updatedEventStart).toISOString()
            };
        }

        if (
            updatedEventEnd !==
            convertToDateTimeLocalString(new Date(end ?? ""))
        ) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                endTimestamp: new Date(updatedEventEnd).toISOString()
            };
        }

        if (updatedEventLocation !== location) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                location: updatedEventLocation
            };
        }

        if (
            (status === NOTIF_REQUIRED && !updatedEventNotifEnabled) ||
            (status === NOTIF_NOT_REQUIRED && updatedEventNotifEnabled)
        ) {
            hasAnythingUpdated = true;
            updateEventInfo = {
                ...updateEventInfo,
                status: updatedEventNotifEnabled
                    ? NOTIF_REQUIRED
                    : NOTIF_NOT_REQUIRED
            };
        }

        if (!hasAnythingUpdated) {
            setErrorOpen(false);
            setErrorMessage("");
            closeEventDetailDialog();
            return;
        }

        await updateCalendarEvent(updateEventInfo)
            .then(res => {
                setErrorOpen(false);
                setErrorMessage("");
                closeEventDetailDialog();
                window.location.reload(true);
            })
            .catch(err => {
                setErrorOpen(true);
                setErrorMessage(
                    "Failed to update calendar event. Please try again."
                );
            });
    }, [
        closeEventDetailDialog,
        description,
        end,
        eventID,
        isEntryValid,
        location,
        start,
        status,
        title,
        updatedEventDescription,
        updatedEventEnd,
        updatedEventLocation,
        updatedEventName,
        updatedEventNotifEnabled,
        updatedEventStart
    ]);

    // UI State Variables
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);
    const handleSnackBarClose = () => {
        setErrorOpen(false);
        setErrorMessage("");
    };

    // Member response handling

    const getGroupMemberResponseIcon = useCallback(
        memberID => {
            const memberResponse = memberResponses.get(memberID);

            if (memberResponse === null || memberResponse === undefined) {
                return (
                    <AwaitingResponseIcon
                        fontSize="large"
                        style={{ color: yellow[500], marginLeft: 24 }}
                    />
                );
            }
            if (memberResponse === MAYBE) {
                return (
                    <MaybeIcon
                        fontSize="large"
                        style={{ color: orange[400], marginLeft: 24 }}
                    />
                );
            }
            if (memberResponse === ATTENDING) {
                return (
                    <AttendingIcon
                        fontSize="large"
                        style={{ color: green[400], marginLeft: 24 }}
                    />
                );
            }
            if (memberResponse === NOT_ATTENDING) {
                return (
                    <NotAttendingIcon
                        fontSize="large"
                        style={{ color: red[400], marginLeft: 24 }}
                    />
                );
            }
            return null;
        },
        [memberResponses]
    );

    const handleCalendarEventResponse = useCallback(
        async responseEnum => {
            await registerCalendarEventResponse(
                eventID,
                currentUserID,
                responseEnum
            )
                .then(res => {
                    setErrorOpen(false);
                    setErrorMessage("");
                    closeEventDetailDialog();
                    window.location.reload(true);
                })
                .catch(err => {
                    setErrorOpen(true);
                    setErrorMessage(
                        "Failed to register response. Please try again."
                    );
                });
        },
        [closeEventDetailDialog, currentUserID, eventID]
    );

    const handleMarkAsAttending = () => {
        handleCalendarEventResponse(ATTENDING);
    };
    const handleMarkAsMaybe = () => {
        handleCalendarEventResponse(MAYBE);
    };
    const handleMarkAsNotAttending = () => {
        handleCalendarEventResponse(NOT_ATTENDING);
    };

    return (
        <Dialog
            open={isDialogOpen}
            onClose={closeEventDetailDialog}
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
                        value={updatedEventName}
                        onChange={event =>
                            setUpdatedEventName(event.target.value)
                        }
                        type="text"
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={updatedEventDescription}
                        onChange={event =>
                            setUpdatedEventDescription(event.target.value)
                        }
                        type="text"
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Location"
                        fullWidth
                        value={updatedEventLocation}
                        onChange={event =>
                            setUpdatedEventLocation(event.target.value)
                        }
                        type="text"
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="Start Time"
                        type="datetime-local"
                        value={updatedEventStart}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={event =>
                            setUpdatedEventStart(event.target.value)
                        }
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        label="End Time"
                        type="datetime-local"
                        value={updatedEventEnd}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={event =>
                            setUpdatedEventEnd(event.target.value)
                        }
                        error={
                            updatedEventStart.localeCompare(updatedEventEnd) > 0
                        }
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <Typography variant="body3" gutterBottom>
                        Notify group members an hour before the event?
                    </Typography>
                    <Checkbox
                        color="primary"
                        checked={updatedEventNotifEnabled}
                        onChange={event => {
                            setUpdatedEventNotifEnabled(event.target.checked);
                        }}
                        disabled={isNotOwner}
                    />
                </DialogContentText>
                <DialogContentText>
                    <Typography variant="body3" gutterBottom>
                        Owner:
                    </Typography>
                    <SimpleUserProfileView userID={owner?.id ?? ""} />
                </DialogContentText>
                <DialogContentText>
                    <Typography variant="body3" gutterBottom>
                        Group member responses:
                    </Typography>
                    {groupMembers.map(member => {
                        return (
                            <div className={classes.groupMemberRow}>
                                <SimpleUserProfileView
                                    userID={member?.user.id ?? ""}
                                />
                                {getGroupMemberResponseIcon(
                                    member?.user.id ?? ""
                                )}
                            </div>
                        );
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div
                    id="responseButtonContainer"
                    className={classes.responseButtonContainer}
                >
                    <ButtonBase onClick={handleMarkAsAttending}>
                        <AttendingIcon
                            style={{ color: green[500] }}
                            fontSize="large"
                        />
                    </ButtonBase>
                    <ButtonBase onClick={handleMarkAsMaybe}>
                        <MaybeIcon
                            fontSize="large"
                            style={{ color: orange[400] }}
                        />
                    </ButtonBase>
                    <ButtonBase onClick={handleMarkAsNotAttending}>
                        <NotAttendingIcon fontSize="large" color="secondary" />
                    </ButtonBase>
                </div>
                {!isNotOwner && (
                    <Button onClick={handleUpdateEvent} color="primary">
                        Update Event
                    </Button>
                )}
                <Button onClick={closeEventDetailDialog} color="primary">
                    OK
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
                <Alert onClose={handleSnackBarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}

export default CalendarEventInfoDialog;
