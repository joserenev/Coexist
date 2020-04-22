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

function TasksList({ header, groupMembers }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="subtitle1">{header}</Typography>
            </div>
            <div className={classes.taskList}>
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
                <TaskRow groupMembers={groupMembers} />
            </div>
        </div>
    );
}

export default TasksList;
