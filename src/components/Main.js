// @flow
// @format

import React from "react";
import { Route, Switch } from "react-router-dom";
import type QueryStatusEnum from "../components/util/QueryUtil";

import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { QueryStatus } from "../components/util/QueryUtil";

//pages
import Login from "../pages/login/Login";
import ProfilePage from "../pages/Profile/ProfilePage.js";
import GroupHomePage from "../components/Groups/GroupHomePage";
import ErrorPage from "../pages/Error/ErrorPage";
import LoadingPage from "../pages/Loading/LoadingPage";
import NoGroupFoundPage from "../pages/homepage/NoGroupFoundPage";
import CreateGroupSettings from "../components/Groups/CreateGroupSettings";

import Authentication from "../authentication/Authentication";

import ComponentContainer from "../components/util/ComponentContainer.react";

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
                                    <GroupHomePage {...props} />
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
                                    <GroupHomePage {...props} />
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
                                    <CreateGroupSettings />
                                </ComponentContainer>
                            </>
                        );
                    }}
                />
                <Route
                    exact
                    path="/noGroupFound"
                    render={props => {
                        return (
                            <>
                                <ComponentContainer
                                    isSideBarOpen={isSideBarOpen}
                                    setSideBarOpen={setSideBarOpen}
                                    userID={userID}
                                >
                                    <NoGroupFoundPage />
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
}

export default Main;
