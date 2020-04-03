// @flow
// @format

import React from "react";
import { Route, Switch } from "react-router-dom";
import type QueryStatusEnum from "../components/util/QueryUtil";

import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { QueryStatus } from "../components/util/QueryUtil";
import { graphqlOperation } from "aws-amplify";
import { getUser as getUserDetailsQuery } from "../customGraphql/queries";
import { Connect } from "aws-amplify-react";
//pages
import Login from "../pages/login/Login";
import ProfilePage from "../pages/Profile/ProfilePage.js";
import GroupHomePage from "../components/Groups/GroupHomePage";
import ErrorPage from "../pages/Error/ErrorPage";
import LoadingPage from "../pages/Loading/LoadingPage";
import NoGroupFoundPage from "../pages/homepage/NoGroupFoundPage";
import CreateGroupSettings from "../components/Groups/CreateGroupSettings";
import ReferralPage from "../pages/Referral/ReferralPage.js";
import ForgetPass from "../pages/ForgetPass/ForgetPass.js";
import ExpensesPage from "../pages/Expenses/ExpensesPage.js";
import MessagesPage from "../pages/Messages/MessagesPage.js";
import Chat from "../pages/Chat/Chat.js";

import Authentication from "../authentication/Authentication";

import ComponentContainer from "../components/util/ComponentContainer.react";

import { updateUserHeartBeatTime } from "../components/util/UserOnlineUtil";

import { useEffect, useState } from "react";
const { IDLE, PENDING, SUCCESS, ERROR } = QueryStatus;

function Main(props): React.MixedElement {
    const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<Object>(null);
    const [queryStatus, setQueryStatus] = useState<QueryStatusEnum>(IDLE);

    useEffect(() => {
        if (!currentUser && queryStatus === IDLE) {
            getCurrentUser();
        }
    });

    const getCurrentUser = async (): Object => {
        setQueryStatus(PENDING);
        await Authentication.getAuthenticatedUserObject()
            .then(user => {
                setQueryStatus(SUCCESS);
                setCurrentUser(user);
            })
            .catch(error => {
                console.log(error);
                setQueryStatus(ERROR);
                setCurrentUser(null);
            });
    };

    if (queryStatus === PENDING || queryStatus === IDLE) {
        // Query request to check if user is logged in is being made
        return <LoadingPage />;
    }

    if (currentUser == null && queryStatus === ERROR) {
        // The user is not logged in
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => {
                            return <Login />;
                        }}
                    />
                    <Route
                        path="/login"
                        render={props => {
                            return <Login />;
                        }}
                    />
                    <Route
                        path="/resetPass"
                        render={props => {
                            return <ForgetPass />;
                        }}
                    />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        );
    }

    if (currentUser == null) {
        // The request still hasn't completed yet.
        return <LoadingPage />;
    }
    const userID = currentUser.attributes.sub;

    // User Online time update
    let updateUserHearbeatTimeInterval = setInterval(() => {
        updateUserHeartBeatTime(userID);
    }, 15000);

    return (
        <Connect query={graphqlOperation(getUserDetailsQuery, { id: userID })}>
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error</h3>;
                }

                if (loading) {
                    return <LoadingPage />;
                }
                const userData = data?.getUser ?? null;
                const { groups = {} } = userData ?? {};
                const { items = [] } = groups ?? [];
                const groupItems = items.filter(groupItem => {
                    return groupItem != null && groupItem.group != null;
                });
                return (
                    <Router>
                        <Switch>
                            <Redirect exact path="/" to="/homepage" />
                            <Redirect path="/login" to="/homepage" />
                            <Route
                                exact
                                path="/homepage"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                {groupItems == null ||
                                                groupItems.length === 0 ? (
                                                    <NoGroupFoundPage />
                                                ) : (
                                                    <Redirect
                                                        to={`/groupHomePage/${groupItems[0].group.id}`}
                                                    />
                                                )}
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/profile"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <ProfilePage userID={userID} />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/groupHomePage/:groupID"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <GroupHomePage
                                                    {...props}
                                                    currentUserID={userID}
                                                />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/createGroup"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <CreateGroupSettings
                                                    userID={userID}
                                                />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/referralPage"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <ReferralPage />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/expenses/:groupID"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <ExpensesPage
                                                    {...props}
                                                    currentUserID={userID}
                                                />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path="/messages/:groupID"
                                render={props => {
                                    return (
                                        <>
                                            <ComponentContainer
                                                isSideBarOpen={isSideBarOpen}
                                                setSideBarOpen={setSideBarOpen}
                                                userID={userID}
                                            >
                                                <Chat
                                                    {...props}
                                                    currentUserID={userID}
                                                />
                                            </ComponentContainer>
                                        </>
                                    );
                                }}
                            />
                            <Route
                                path="*"
                                render={props => {
                                    return <ErrorPage />;
                                }}
                            />
                        </Switch>
                    </Router>
                );
            }}
        </Connect>
    );
}

export default Main;
