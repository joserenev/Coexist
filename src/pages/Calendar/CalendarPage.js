// @flow

import React, { useState, useCallback } from "react";
import { Button,Grid } from "@material-ui/core";

import CreateCalendarEventDialog from "./CreateCalendarEventDialog";
import CalendarEventInfoDialog from "./CalendarEventInfoDialog";

import { makeStyles } from "@material-ui/core/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import style from "react-big-calendar/lib/css/react-big-calendar.css";
import ExampleControlSlot from "./ExampleControlSlot";
import IconButton from "@material-ui/core/IconButton";
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import SubdirectoryArrowLeftTwoToneIcon from '@material-ui/icons/SubdirectoryArrowLeftTwoTone';
import { Link, useHistory } from "react-router-dom";

import moment from "moment";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        textAlign: "center"
    },

    calendarContainer: {
        marginBottom: 40,
        minHeight: "400px"
    },
    createEventButton: {
        width: 200,
        display: "inline-block"
    }
}));

function getEventListFromRawItemList(items) {
    return items
        .filter(item => {
            return item !== null && item !== undefined;
        })
        .map(item => {
            return {
                id: item.id,
                end: new Date(item.endTimestamp),
                start: new Date(item.startTimestamp),
                description: item.description,
                title: item.name,
                status: item.status,
                memberResponses: item.memberResponses,
                location: item.location,
                owner: item.owner
            };
        });
}

const localizer = momentLocalizer(moment);

function CalendarPage({
    currentUserID,
    groupID,
    rawItemList,
    groupMembers
}): React.MixedElement {
    const classes = useStyles();

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
    const [eventDetailDialogOpen, setEventDetailDialogOpen] = useState(false);
    const eventList = useCallback(
        () => getEventListFromRawItemList(rawItemList),
        [rawItemList]
    );
    const [currentSelectedEvent, setCurrentSelectedEvent] = useState(null);
    const handleSelectEvent = event => {
        setCurrentSelectedEvent(event);
        setEventDetailDialogOpen(true);
    };

    return (
        <div>
            
            <Grid container alignItems="flex-start" justify="flex-end" direction="row" >
                <IconButton
                    component={Link}
                    to={`/groupHomePage/${groupID}`}
                    color="inherit"
                    aria-label="open drawer"
                    variant="contained"
                    style={{  padding: 10,
                        margin: 10, }}
                    >
                        <SubdirectoryArrowLeftTwoToneIcon />
                </IconButton>
            </Grid>

            <div className={classes.container}>
                <ExampleControlSlot.Entry waitForOutlet>
                    Click an event to see more info, or drag the mouse over the
                    calendar to select a date/time range.
                </ExampleControlSlot.Entry>
                <div className={classes.calendarContainer}>
                    <Calendar
                        selectable
                        localizer={localizer}
                        events={eventList()}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={handleSelectEvent}
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
                {eventDetailDialogOpen && (
                    <CalendarEventInfoDialog
                        isDialogOpen={eventDetailDialogOpen}
                        setIsDialogOpen={setEventDetailDialogOpen}
                        event={currentSelectedEvent}
                        currentUserID={currentUserID}
                        groupID={groupID}
                        groupMembers={groupMembers}
                    />
                )}
                {createEventDialogOpen && (
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
                )}
            </div>
        </div>
    );
}

export default CalendarPage;
