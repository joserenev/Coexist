// @flow

import React, { useState } from "react";
import { Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateCalendarEventDialog from "./CreateCalendarEventDialog";

import { makeStyles } from "@material-ui/core/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import style from "react-big-calendar/lib/css/react-big-calendar.css";
import ExampleControlSlot from "./ExampleControlSlot";

import moment from "moment";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        textAlign: "center"
    },

    calendarContainer: {
        // backgroundColor: "#000000",
        marginBottom: 40,
        minHeight: "400px"
    },
    createEventButton: {
        width: 200,
        display: "inline-block"
    }
}));

const localizer = momentLocalizer(moment);

function CalendarPage(props): React.MixedElement {
    const classes = useStyles();

    const { currentUserID = "" } = props;
    const groupID = props.match?.params?.groupID ?? "";

    // Create New Event States
    const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
    const [pickedEventStart, setPickedEventStart] = useState(null);
    const [pickedEventEnd, setPickedEventEnd] = useState(null);
    const handleCreateNewEventFromCalendar = ({ start, end }) => {
        setPickedEventStart(start);
        setPickedEventEnd(end);
        setCreateEventDialogOpen(true);
    };
    const handleCreateNewEventFromButton = () => {
        setPickedEventStart(null);
        setPickedEventEnd(null);
        setCreateEventDialogOpen(true);
    };

    // View Existing Event Detail States
    const [eventDetailDialogOpen, setEventDialogOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [dummyEvents, setDummyEvents] = useState([
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
    ]);
    const handleEventDetailClose = () => {
        setEventDialogOpen(false);
    };
    const handleEventDetailOpen = (title, description) => {
        setEventTitle(title);
        setEventDescription(description);
        setEventDialogOpen(true);
    };

    return (
        <div>
            <div className={classes.container}>
                <ExampleControlSlot.Entry waitForOutlet>
                    Click an event to see more info, or drag the mouse over the
                    calendar to select a date/time range.
                </ExampleControlSlot.Entry>
                <div className={classes.calendarContainer}>
                    <Calendar
                        selectable
                        localizer={localizer}
                        events={dummyEvents}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={event =>
                            handleEventDetailOpen(
                                event.title,
                                event.description
                            )
                        }
                        onSelectSlot={event => {
                            handleCreateNewEventFromCalendar(event);
                        }}
                        style={{ height: 500 }}
                    />
                </div>
                <Button
                    className={classes.createEventButton}
                    variant="contained"
                    color="primary"
                    onClick={handleCreateNewEventFromButton}
                >
                    Create New Event
                </Button>
                <Dialog
                    open={eventDetailDialogOpen}
                    onClose={handleEventDetailClose}
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
                        <Button
                            onClick={handleEventDetailClose}
                            color="primary"
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <CreateCalendarEventDialog
                    open={createEventDialogOpen}
                    setOpen={setCreateEventDialogOpen}
                    pickedEventStart={
                        pickedEventStart === "" ? null : pickedEventStart
                    }
                    pickedEventEnd={
                        pickedEventEnd === "" ? null : pickedEventEnd
                    }
                    currentUserID={currentUserID}
                    groupID={groupID}
                />
            </div>
        </div>
    );
}

export default CalendarPage;
