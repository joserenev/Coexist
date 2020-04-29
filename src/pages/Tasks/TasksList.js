import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import TaskRow from "./TaskRow";

const useStyles = makeStyles(theme => ({
    taskList: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },
    container: {
        backgroundColor: grey[100],
        margin: 16,
        padding: 12,
        maxHeight: "40vh",
        overflowY: "auto"
    },
    header: {
        marginBottom: 12
    }
}));

function taskSortFunction(task1, task2) {
    if (task1.isImportant && !task2.isImportant) {
        return -1;
    }
    if (!task1.isImportant && task2.isImportant) {
        return 1;
    }
    if (task1.dueDate !== null && task2.dueDate === null) {
        return -1;
    }
    if (task1.dueDate === null && task2.dueDate !== null) {
        return 1;
    }
    if (task1.dueDate !== null && task2.dueDate !== null) {
        return task1.dueDate.localeCompare(task2.dueDate);
    }
    return task1.name.localeCompare(task2.name);
}

function TasksList({ groupID, header, groupMembers, tasks, currentUserID }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="subtitle1">{header}</Typography>
            </div>
            <div className={classes.taskList}>
                {tasks.length === 0 && (
                    <Typography variant="subtitle1">No tasks found.</Typography>
                )}
                {tasks.sort(taskSortFunction).map(task => {
                    return (
                        <TaskRow
                            task={task}
                            groupMembers={groupMembers}
                            currentUserID={currentUserID}
							groupID={groupID}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TasksList;
