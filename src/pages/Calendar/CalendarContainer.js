import React from "react";
import CalendarPage from "./CalendarPage.js";

function CalendarContainer(props): React.MixedElement {
    return <CalendarPage {...props} />;
}

export default CalendarContainer;
