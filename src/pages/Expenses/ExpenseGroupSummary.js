import React from "react";
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
        margin: 4
    }
}));

function ExpenseGroupSummary({ groupID, expenseItem }): React.MixedElement {
    const classes = useStyles();
    const {
        cycleEndDate,
        totalExpenditure,
        expenseDivision: rawExpenseDivision
    } = expenseItem;

    const expenseDivision = JSON.parse(rawExpenseDivision);
    const formattedEndDate = new Date(cycleEndDate).toDateString();

    const getFormattedAmount = userID => {
        const amount = expenseDivision[userID];
        return Math.abs(amount).toFixed(2);
    };

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
                                    {expenseDivision[userID] < 0 ? (
                                        <Typography
                                            variant="h5"
                                            color="secondary"
                                        >
                                            Charged: $
                                            {getFormattedAmount(userID)}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            color="primary"
                                        >
                                            Received: $
                                            {getFormattedAmount(userID)}
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
