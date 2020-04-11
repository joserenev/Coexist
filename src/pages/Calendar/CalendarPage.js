// @flow

import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";
import type QueryStatusEnum from "../../components/util/QueryUtil";

import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import events from "./events";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import style from "react-big-calendar/lib/css/react-big-calendar.css";
import ExampleControlSlot from "./ExampleControlSlot";

import moment from "moment";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20
    },

    calendarContainer: {
        // backgroundColor: "#000000",
        minHeight: "400px"
    }
}));

const localizer = momentLocalizer(moment);

function CalendarPage(props): React.MixedElement {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
    const [eventTitle, setEventTitle] = React.useState("");
    const [eventDescription, setEventDescription] = React.useState("");

    const groupID = props.match?.params?.groupID ?? "";
    const dummyEvents = [
        {
            allDay: false,
            end: new Date("April 09, 2020 13:15:00"),
            start: new Date("April 09, 2020 11:15:00"),
            description:
                "This is a Miami retreat that will take place for a couple of days.",
            title: "Miami retreat"
        },
        {
            allDay: true,
            end: new Date("April 04, 2020 11:15:00"),
            start: new Date("April 04, 2020 11:15:00"),
            description:
                "This is an all day event created by the people of the group",
            title: "All Day Event"
        }
    ];
    const MyCalendar = props => (
        <div className={classes.calendarContainer}>
            <Calendar
                selectable
                localizer={localizer}
                events={dummyEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event =>
                    handleEventOpen(event.title, event.description)
                }
                onSelectSlot={handleClickOpen}
                style={{ height: 500 }}
            />
        </div>
    );

    const { currentUserID = "" } = props;
    const handleClickClose = () => {
        setOpen(false);
        setEventOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEventOpen = (title, description) => {
        setEventTitle(title);
        setEventDescription(description);
        setEventOpen(true);
    };

    return (
        <div>
            <div className={classes.container}>
                <ExampleControlSlot.Entry waitForOutlet>
                    Click an event to see more info, or drag the mouse over the
                    calendar to select a date/time range.
                </ExampleControlSlot.Entry>
                <MyCalendar />
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create new event
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the following details to create an
                            event.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Event Name"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Event Description"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClickClose} color="primary">
                            Create Event
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={eventOpen}
                    onClose={handleClickClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {eventTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {eventDescription}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default CalendarPage;
