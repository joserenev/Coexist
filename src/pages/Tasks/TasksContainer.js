import React, { useState } from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LoadingPage from "../../pages/Loading/LoadingPage";
import { getGroupTasks } from "../../customGraphql/queries";
import TasksList from "./TasksList";
import CreateTask from "./CreateTask";

import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import AddIcon from "@material-ui/icons/Add";
import { TaskStatusEnum } from "../../components/util/TasksConstants";
const { COMPLETE } = TaskStatusEnum;

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20
    },
    addButton: {
        float: "right"
    }
}));

function TasksContainer(props): React.MixedElement {
    const classes = useStyles();
    const groupID = props.match?.params?.groupID ?? "";
    const { currentUserID = "" } = props;
    const [isDialogOpen, setDialogOpen] = useState(false);

    // Action handlers
    const handleCreateTask = () => {
        setDialogOpen(true);
    };

    return (
        <Connect
            query={graphqlOperation(getGroupTasks, {
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
                const rawGroupMembers = data?.getGroup?.users?.items ?? [];
                const groupMembers = rawGroupMembers.map(item => {
                    return item.user;
                });

                const tasks = data?.getGroup?.tasks?.items ?? [];
                const incompleteTasks = tasks.filter(task => {
                    return task.status !== COMPLETE;
                });
                const completeTasks = tasks.filter(task => {
                    return task.status === COMPLETE;
                });

                return (
                    <>
                        <div className={classes.headContainer}>
                            <IconButton
                                component={Link}
                                to={`/groupHomePage/${groupID}`}
                                color="inherit"
                                aria-label="open drawer"
                                variant="contained"
                                style={{ marginLeft: -40, marginTop: -40 }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <div>
                                <AddIcon
                                    fontSize="large"
                                    className={classes.addButton}
                                    onClick={handleCreateTask}
                                />
                                <Typography variant="h2" gutterBottom>
                                    Group Tasks
                                </Typography>
                            </div>
                            <TasksList
                                groupID={groupID}
                                groupMembers={groupMembers}
                                header="Incomplete Tasks:"
                                tasks={incompleteTasks}
                                currentUserID={currentUserID}
                            />
                            <TasksList
                                groupID={groupID}
                                groupMembers={groupMembers}
                                header="Completed Tasks:"
                                tasks={completeTasks}
                                currentUserID={currentUserID}
                            />
                        </div>
                        <CreateTask
                            currentUserID={currentUserID}
                            groupID={groupID}
                            isDialogOpen={isDialogOpen}
                            setDialogOpen={setDialogOpen}
                            groupMembers={groupMembers}
                        />
                    </>
                );
            }}
        </Connect>
    );
}

export default TasksContainer;
