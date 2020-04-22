import React from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LoadingPage from "../../pages/Loading/LoadingPage";
import { getGroupCalendarEvents } from "../../customGraphql/queries";
import TasksList from "./TasksList";

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20
    }
}));

function TasksContainer(props): React.MixedElement {
    const classes = useStyles();
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
                const groupMembers = data?.getGroup?.users?.items ?? [];
                return (
                    <>
                        <div className={classes.headContainer}>
                            <Typography variant="h2" gutterBottom>
                                Group Tasks
                            </Typography>
                            <TasksList
                                groupMembers={groupMembers}
                                header="Completed Tasks:"
                            />
                            <TasksList
                                groupMembers={groupMembers}
                                header="Incomplete Tasks:"
                            />
                        </div>
                    </>
                );
            }}
        </Connect>
    );
}

export default TasksContainer;
