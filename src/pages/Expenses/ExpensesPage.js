import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import ExpensesReceiptRow from "./ExpensesReceiptRow";
import CreateExpense from "./CreateExpense";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20
    },
    addButton: {
        float: "right"
    },
    expenseList: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: "745px",
        padding: "15px"
    }
}));

function ExpensesPage(props): React.MixedElement {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const groupID = props.match?.params?.groupID ?? "";
    const { currentUserID = "" } = props;
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <div className={classes.headContainer}>
                <AddIcon
                    fontSize="large"
                    className={classes.addButton}
                    onClick={() => {
                        setDialogOpen(true);
                    }}
                />
                <Typography variant="h2" gutterBottom>
                    Recent Expenses
                </Typography>
                <div className={classes.expenseList}>
                    <ExpensesReceiptRow />
                    <ExpensesReceiptRow />
                    <ExpensesReceiptRow />
                </div>
            </div>
            <CreateExpense
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
                currentUserID={currentUserID}
                groupID={groupID}
            />
        </>
    );
}

export default ExpensesPage;
