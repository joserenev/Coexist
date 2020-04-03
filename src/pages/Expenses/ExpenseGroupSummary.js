import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import User from "../../components/User/User";
import LoadingPage from "../../pages/Loading/LoadingPage";

import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getGroup } from "../../customGraphql/queries";

const useStyles = makeStyles(theme => ({
    headContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#EDF7E1",
        justifyContent: "space-between",
        margin: 4,
        alignItems: "center",
        border: "1px solid black" // it is not work.
    },
    fields: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        margin: 4
    }
}));

function ExpenseGroupSummary({ groupID }): React.MixedElement {
    const classes = useStyles();
    const [groupMembers, setGroupMembers] = useState([]);

    // const memberSplitMap = new Map(JSON.parse(rawMemberSplit));

    return (
        <Connect query={graphqlOperation(getGroup, { id: groupID })}>
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error</h3>;
                }

                if (loading) {
                    return <LoadingPage />;
                }

                const items = data?.getGroup?.users?.items ?? [];

                if (groupMembers.length === 0) {
                    setGroupMembers(
                        items.map(groupItem => {
                            return groupItem.user;
                        })
                    );
                }

                return (
                    <>
                        <br />

                        <div>
                            <Typography variant="h5">
                                Mar 15 - Mar 30
                            </Typography>
                            <div className={classes.headContainer}>
                                {groupMembers.map((user, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.fields}
                                        >
                                            <User
                                                user={user}
                                                isDeleteDisabled={true}
                                            />
                                            <Typography>
                                                <i>Total spent:</i> $1000
                                            </Typography>
                                            <br />
                                            <Typography>
                                                <i>Paid members:</i> $800
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                );
            }}
        </Connect>
    );
}

export default ExpenseGroupSummary;
