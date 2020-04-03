import React, { useRef, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Group from "../../Groups/Group";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListItemText from "@material-ui/core/ListItemText";
//import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import { Wrapper } from "./Menu.style";
import Typography from "@material-ui/core/Typography";
import Member from "../Member";
import User from "../../User/User";
import SimpleUserProfileView from "../../User/SimpleUserProfileView";
import ErrorPage from "../../../pages/Error/ErrorPage";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { getGroup } from "../../../customGraphql/queries";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    headContainer: {
        backgroundColor: "#ecf0f1",
        padding: 20,
        marginTop: 20,
        marginLeft: 20
    }
}));

function Menu(props): React.MixedElement {
    const classes = useStyles();
    const groupID = window.location.href.substr(
        window.location.href.indexOf("/messages/") + 10
    );
    const { currentUserID = "" } = props;

    const [groupMembers, setGroupMembers] = useState([]);

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
                        <div>
                            <div className={classes.headContainer}>
                                {groupMembers.map((user, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.fields}
                                        >
                                            <User
                                            button
                                            component={Link}
                                            to="/profile"
                                            user={user}
                                            isDeleteDisabled={true}
                                            />
                                            <Divider/>
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

export { Menu };
