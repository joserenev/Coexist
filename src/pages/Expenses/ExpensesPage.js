import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../../pages/Loading/LoadingPage";
import { listReceipts } from "../../customGraphql/queries";

import ExpensesReceiptRow from "./ExpensesReceiptRow";
import CreateExpense from "./CreateExpense";

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
    const groupID = props.match?.params?.groupID ?? "";
    const { currentUserID = "" } = props;
    const [isDialogOpen, setDialogOpen] = useState(false);
    return (
        <Connect
            query={graphqlOperation(listReceipts, {
                limit: 10000
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

                const allReceipts = data?.listReceipts?.items ?? [];
                const filteredReceipts = allReceipts.filter(receipt => {
                    return receipt.group?.id === groupID;
                });
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
                                {filteredReceipts.map((receipt, index) => {
                                    return (
                                        <div key={index}>
                                            <ExpensesReceiptRow
                                                receipt={receipt}
                                                currentUserID={currentUserID}
                                                groupID={groupID}
                                            />
                                        </div>
                                    );
                                })}
                                {(filteredReceipts == null ||
                                    filteredReceipts.length === 0) && (
                                    <Typography variant="h3" gutterBottom>
                                        No receipts found for this group. Create
                                        one.
                                    </Typography>
                                )}
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
            }}
        </Connect>
    );
}

export default ExpensesPage;
