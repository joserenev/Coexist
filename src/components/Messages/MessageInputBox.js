import React, { useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getGroup } from "../../customGraphql/queries";
import LoadingPage from "../../pages/Loading/LoadingPage";

import ExpensesIcon from "@material-ui/icons/AttachMoney";
import ChatIcon from "@material-ui/icons/Forum";
import CalendarIcon from "@material-ui/icons/Event";
import TasksIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
import ErrorPage from "../../pages/Error/ErrorPage";
import GroupInfoPage from "./GroupInfoPage";

const useStyles = makeStyles(theme => ({
    homePageContainer: {
        margin: "0px 50px",
        backgroundColor: "#ecf0f1",
        align: "center",
        justifyContent: "center",
        padding: "20",
        display: "flex",
        flexDirection: "row",
        minWidth: 540
    },

    groupInfoContainer: {
        margin: "30px 50px",
        backgroundColor: "#ecf0f1",
        padding: "5px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        align: "center",
        minWidth: 540
    },

    buttonContainer: {
        margin: 40,
        flex: 1,
        background: "linear-gradient(45deg, #c0d6b9 30%, #d6ebd7 90%)",
        borderRadius: 5,
        boxShadow: "0 3px 5px 2px rgba(55, 63, 82, .3)",

        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },
    settingsButton: {
        marginleft: 20,
        backgroundColor: "#ecf0f1",
        float: "right",
        "&:hover": {
            background: "#ecf0f1",
            color: "black",
            cursor: "pointer"
        },
        height: 40,
        width: 40
    },

    buttonImage: {
        align: "center",
        justifyContent: "center"
    },

    largeIcons: {
        height: 240,
        width: 240
    }
}));

function MessageInputBox(props): React.MixedElement {
    const classes = useStyles();
    const history = useHistory();
    const navigateToExpenses = () => {
        history.push("/expenses");
    };
    const groupID = props.match?.params?.groupID ?? "";
    const { currentUserID = "" } = props;
    const [isDialogOpen, setDialogOpen] = useState(false);

    const isCurrentUserInGroup = useCallback(
        groupData => {
            const items = groupData?.users?.items ?? [];
            return items.some(groupItem => {
                return groupItem.user.id === currentUserID;
            });
        },
        [currentUserID]
    );

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

                if (!isCurrentUserInGroup(data?.getGroup)) {
                    return <ErrorPage />;
                }

                return (
                    <>
                        <div className={classes.groupInfoContainer}>
                            <Typography variant="h1">
                                {data?.getGroup?.name ?? "Group Name"}
                            </Typography>
                            <SettingsIcon
                                className={classes.settingsButton}
                                onClick={() => {
                                    setDialogOpen(true);
                                }}
                            />
                        </div>
                        <div className={classes.homePageContainer}>
                            <div
                                className={classes.buttonContainer}
                                onClick={navigateToExpenses}
                            >
                                <ExpensesIcon
                                    fontSize="large"
                                    className={classes.largeIcons}
                                />
                                <div></div>
                            </div>

                            <div className={classes.buttonContainer}>
                                <TasksIcon
                                    fontSize="large"
                                    className={classes.largeIcons}
                                />
                            </div>
                        </div>
                        <div className={classes.homePageContainer}>
                            <div className={classes.buttonContainer}>
                                <ChatIcon
                                    fontSize="large"
                                    className={classes.largeIcons}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <CalendarIcon
                                    fontSize="large"
                                    className={classes.largeIcons}
                                />
                            </div>
                        </div>
                        <GroupInfoPage
                            isDialogOpen={isDialogOpen}
                            setDialogOpen={setDialogOpen}
                            groupData={data?.getGroup}
                            currentUserID={currentUserID}
                        />
                    </>
                );
            }}
        </Connect>
    );
}
export default MessageInputBox;