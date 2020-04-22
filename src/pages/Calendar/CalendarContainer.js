import React from "react";
import CalendarPage from "./CalendarPage.js";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../../pages/Loading/LoadingPage";
import { getGroupCalendarEvents } from "../../customGraphql/queries";

function CalendarContainer(props): React.MixedElement {
    const groupID = props.match?.params?.groupID ?? "";
    const { currentUserID = "" } = props;

    return (
        <Connect
            query={graphqlOperation(getGroupCalendarEvents, {
                id: groupID
            })}
        >
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error</h3>;
                }

                if (loading) {
                    return <LoadingPage />;
                }
                const eventList = data?.getGroup?.events?.items ?? [];
                const groupMembers = data?.getGroup?.users?.items ?? [];
                return (
                    <CalendarPage
                        rawItemList={eventList}
                        currentUserID={currentUserID}
                        groupID={groupID}
                        groupMembers={groupMembers}
                    />
                );
            }}
        </Connect>
    );
}

export default CalendarContainer;
