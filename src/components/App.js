import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";




//pages
import Login from "../pages/login/Login";
import HomePage from "../pages/homepage/HomePage";

//component
import Layout from "../components/Layout/Layout";


//context TODO

export default function App() {
    // global
    //var { isAuthenticated } = useUserState();
    var {isAuthenticated} = false;
  
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/homepage" component={HomePage} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  
    // #######################################################################
  
    function PrivateRoute({ component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              React.createElement(component, props)
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
          }
        />
      );
    }
  
    function PublicRoute({ component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            ) : (
              React.createElement(component, props)
            )
          }
        />
      );
    }
}
  