import React, { useCallback } from "react";
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import SimpleUserProfileView from "../../components/User/SimpleUserProfileView";

const useStyles = makeStyles(theme => ({
    headContainer: {
        padding: 12,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#EDF7E1",
        margin: 4,
        alignItems: "center",
        border: "1px solid black"
    },
    expenseSummaryContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        margin: 12,
        marginBottom: 24,
        alignItems: "center"
    },
    fields: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        margin: 4,
        alignItems: "center"
    },
    marginBottom: {
        marginBottom: 12
    }
}));

function ExpenseGroupSummary({ groupID, expenseItem }): React.MixedElement {
    const classes = useStyles();
    const {
        cycleEndDate,
        totalExpenditure,
        expenseDivision: rawExpenseDivision,
        totalOwed: rawSummary
    } = expenseItem;

    const expenseDivision = JSON.parse(rawExpenseDivision);
    const formattedEndDate = new Date(cycleEndDate).toDateString();
    const summary = JSON.parse(rawSummary);

    const { userDebt = {}, userExpense = {} } = summary ?? {};

    const getDebtAmount = useCallback(
        userID => {
            const amount = userDebt[userID] ?? 0;
            return Math.abs(amount).toFixed(2);
        },
        [userDebt]
    );
    const getExpenseAmount = useCallback(
        userID => {
            const amount = userExpense[userID] ?? 0;
            return Math.abs(amount).toFixed(2);
        },
        [userExpense]
    );

    const getBalanceAmount = useCallback(
        userID => {
            const amount = expenseDivision[userID];
            return Math.abs(amount).toFixed(2);
        },
        [expenseDivision]
    );

    return (
        <>
            <div>
                <Typography variant="h5">
                    Cycle End Date: {formattedEndDate}
                </Typography>
                <div className={classes.headContainer}>
                    <div className={classes.expenseSummaryContainer}>
                        {Object.keys(expenseDivision).map((userID, index) => {
                            return (
                                <div key={index} className={classes.fields}>
                                    <SimpleUserProfileView
                                        userID={userID}
                                        isDeleteDisabled={true}
                                    />
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                        className={classes.marginBottom}
                                    >
                                        Spent: ${getExpenseAmount(userID)}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                        className={classes.marginBottom}
                                    >
                                        Owed: ${getDebtAmount(userID)}
                                    </Typography>
                                    {expenseDivision[userID] < 0 ? (
                                        <Typography
                                            variant="h5"
                                            color="secondary"
                                        >
                                            Charged: ${getBalanceAmount(userID)}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            color="primary"
                                        >
                                            Received: $
                                            {getBalanceAmount(userID)}
                                        </Typography>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <Typography variant="h3">
                        Total Group Expenditure: $
                        {Number(totalExpenditure).toFixed(2)}
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default ExpenseGroupSummary;
