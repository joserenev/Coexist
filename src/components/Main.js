// @flow
// @format

import React from "react";
import { Route, Switch } from "react-router-dom";

import { BrowserRouter as Router, Redirect } from "react-router-dom";

//pages
import Login from "../pages/login/Login";
import HomePage from "../pages/homepage/HomePage";
import SideBar from "../components/SideBar/SideBar.js";
import ProfilePage from "../pages/Profile/ProfilePage.js";
import GroupHomePage from "../components/Groups/GroupHomePage";
import ErrorPage from "../pages/Error/ErrorPage";

import Authentication from "../authentication/Authentication";

import ComponentContainer from "../components/util/ComponentContainer.react";

import { useEffect, useState } from "react";

function Main(props): React.MixedElement {
    const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<object>(null);

    useEffect(() => {
        if (!currentUser) {
            getCurrentUser();
        }
    });

    const getCurrentUser = async (): Object => {
        await Authentication.getAuthenticatedUserObject()
            .then(user => {
                setCurrentUser(user);
            })
            .catch(error => {
                console.log(error);
                setCurrentUser(null);
            });
    };

    if (currentUser == null) {
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
                    <Redirect to="login" />
                </Switch>
            </Router>
        );
    }

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
                                <SideBar
                                    isSideBarOpen={isSideBarOpen}
                                    setSideBarOpen={setSideBarOpen}
                                />
                                <ComponentContainer
                                    isSideBarOpen={isSideBarOpen}
                                >
                                    <HomePage />
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
                                <SideBar
                                    isSideBarOpen={isSideBarOpen}
                                    setSideBarOpen={setSideBarOpen}
                                />
                                <ComponentContainer
                                    isSideBarOpen={isSideBarOpen}
                                >
                                    <ProfilePage />
                                </ComponentContainer>
                            </>
                        );
                    }}
                />
                <Route
                    exact
                    path="/groupHomePage"
                    render={props => {
                        return (
                            <>
                                <SideBar
                                    isSideBarOpen={isSideBarOpen}
                                    setSideBarOpen={setSideBarOpen}
                                />
                                <ComponentContainer
                                    isSideBarOpen={isSideBarOpen}
                                >
                                    <GroupHomePage />
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
