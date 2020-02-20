// @flow

import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { BrowserRouter as Router, Link } from "react-router-dom";

//pages
import Login from "../pages/login/Login";
import HomePage from "../pages/homepage/HomePage";
import SideBar from "../components/SideBar/SideBar.js";
import ProfilePage from "../pages/Profile/ProfilePage.js";
import GroupHomePage from "../components/Groups/GroupHomePage";

//component
import Layout from "../components/Layout/Layout";

import Authentication from "../authentication/Authentication";
import { Athena } from "aws-sdk/clients/all";

import ComponentContainer from "../components/util/ComponentContainer.react";

import { useState } from "react";
//context TODO

const Main = props => {
    const { currentUser } = props;
    const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);

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
            </Switch>
        </Router>
    );
};
export default Main;
