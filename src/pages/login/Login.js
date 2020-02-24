import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
//import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

import Authentication from "../../authentication/Authentication";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

function Login(props) {
    var classes = useStyles();

    // global
    //var userDispatch = useUserDispatch();
    var userDispatch = true;

    // local
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [activeTabId, setActiveTabId] = useState(0);
    //login and sign up fields
    const [nameValue, setNameValue] = useState("");
    const [loginValue, setLoginValue] = useState(""); // login value is "username"
    // + sign up only fields
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isUserValidatingCode, setUserValidatingCode] = useState(false);

    //helpful fields
    const [response, setResponse] = useState("");
    const [confirmationCodeValue, setConfirmationCodeValue] = useState("");

    //Verification fields
    const [confirmResponse, setConfirmResponse] = useState("");
    const [showConfirmResponse, setShowConfirmResponse] = useState(false);

    const handleLogin = async () => {
        console.log(loginValue);
        await Authentication.signIn(loginValue, passwordValue)

            .then(function(data) {
                // console.log(loginValue);
                // console.log(data);
                // console.log("Caching this ID at sign in: ", data.attributes);
                localStorage.setItem("id", data.attributes.sub);
                window.location.replace("/homepage"); //CHANGE BACK
            })
            .catch(function(err) {
                // that.setState({
                //     showResponse: true,
                //     response: "Invalid Username or Password"
                // })
                console.log("Something wrong in handle log in Function");
            });
    };

    const handleSignUp = async () => {
        //let that = this;

        // this.setState({
        //     error: false
        // });

        setError(false);
        console.log(error);

        if (loginValue.includes("@")) {
            // that.setState({
            //     showResponse: true,
            //     response: "Usernames can not include '@'",
            //     showVerification: false,
            //     error: true
            // });

            setResponse("Usernames can not include '@'");
            setError(true);

            return;
        }

        let existingEmail = false;

        await Authentication.signIn(emailValue, passwordValue)
            .then(function(data) {})
            .catch(function(err) {
                if (err.code !== "UserNotFoundException") {
                    console.log("Existing User Found!");

                    existingEmail = true;
                    // that.setState({
                    //     showResponse: true,
                    //     response: "Email already in use",
                    //     showVerification: false,
                    //     error: true
                    // });
                    setResponse("Email already in use");
                    setError(true);
                }
            });

        if (existingEmail === true) {
            return;
        }

        //can add more fields top signUp later
        let response = await Authentication.signUp(
            loginValue,
            passwordValue,
            emailValue
        ).catch(function(err) {
            // that.setState({
            //     showResponse: true,
            //     response: "Error signing up. Please try again",
            //     showVerification: false,
            //     error: true
            // })
            setResponse("Error signing up. Please try again");
            setError(true);
        });

        if (error === true) {
            return;
        }

        // this.setState({
        //     showResponse: true
        // });

        if (typeof response.userSub !== "undefined") {
            console.log("Sign Up Confirmed");
            // this.setState({
            //     response: "Sign Up Confirmed. Please confirm code.",
            //     showVerification: true
            // });
            setResponse("Sign Up Confirmed. Please confirm code.");
            setUserValidatingCode(true);

            return;
        }

        return;
    };

    const handleConfirmCode = async () => {
        // let that = this;

        await Auth.confirmSignUp(loginValue, confirmationCodeValue)
            .then(async function(signUpData) {
                // Shows confirmation
                // that.setState({
                //     confirmResponse: "Confirmed",
                //     showConfirmResponse: true
                // });

                setConfirmResponse("Confirmed");
                setShowConfirmResponse(true);

                await Authentication.logout();

                // Signs in for the user who just signed up
                await Auth.signIn(loginValue, passwordValue)
                    .catch(function(err) {
                        console.log(err);
                    })
                    .then(data => {
                        // Uploads image to S3
                        // if (that.state.file !== null) {
                        //     S3AvatarInterface.upload(data.attributes.sub, that.state.file);
                        // }

                        console.log("SignUpID: ", signUpData);
                        console.log("Attributes", data.attributes.sub);
                        //add public user info to DynamoDB
                        const user = {
                            id: data.attributes.sub,
                            email: data.attributes.email,
                            username: data.username,
                            name: nameValue,
                            phone: phoneNumberValue
                        };

                        // Creates the user into the DB
                        API.graphql(
                            graphqlOperation(mutations.createUser, {
                                input: user
                            })
                        )
                            .then(through => {
                                console.log(through);
                            })
                            .catch(function(err) {
                                console.log(err);
                            });

                        //Redirects user to home page
                        setTimeout(function() {
                            window.location.replace("/homepage");
                        }, 1500);
                    });
            })
            .catch(function(result) {
                console.log(result);

                if (result.code === "CodeMismatchException") {
                    // that.setState({
                    //     confirmResponse: "Incorrect Code",
                    //     showConfirmResponse: true
                    // })
                    setConfirmResponse("Incorrect Code");
                    setShowConfirmResponse(true);
                }
            });
    };

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage} />
                <Typography className={classes.logotypeText}>
                    Coexist
                </Typography>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                        <Tab label="New User" classes={{ root: classes.tab }} />
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment>
                            <Typography
                                variant="h1"
                                className={classes.greeting}
                            >
                                Good Morning, User
                            </Typography>
                            <Button
                                size="large"
                                className={classes.googleButton}
                            >
                                <img
                                    src={google}
                                    alt="google"
                                    className={classes.googleIcon}
                                />
                                &nbsp;Sign in with Google
                            </Button>
                            <div className={classes.formDividerContainer}>
                                <div className={classes.formDivider} />
                                <Typography className={classes.formDividerWord}>
                                    or
                                </Typography>
                                <div className={classes.formDivider} />
                            </div>
                            <Fade in={error}>
                                <Typography
                                    color="secondary"
                                    className={classes.errorMessage}
                                >
                                    Something is wrong with your login or
                                    password :(
                                </Typography>
                            </Fade>
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={loginValue}
                                onChange={e => setLoginValue(e.target.value)}
                                margin="normal"
                                placeholder="Email Adress or Username"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={passwordValue}
                                onChange={e => setPasswordValue(e.target.value)}
                                margin="normal"
                                placeholder="Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.formButtons}>
                                {isLoading ? (
                                    <CircularProgress
                                        size={26}
                                        className={classes.loginLoader}
                                    />
                                ) : (
                                    //<Link to= "/homepage">
                                    <Button
                                        disabled={
                                            loginValue.length === 0 ||
                                            passwordValue.length === 0
                                        }
                                        onClick={handleLogin} //Log in the user with its credentials entered
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                    //</Link>
                                )}
                                <Button
                                    color="primary"
                                    size="large"
                                    className={classes.forgetButton}
                                >
                                    Forget Password
                                </Button>
                            </div>
                        </React.Fragment>
                    )}

                    {activeTabId === 1 && (
                        <div>
                            {!isUserValidatingCode ? (
                                <React.Fragment>
                                    <Typography
                                        variant="h1"
                                        className={classes.greeting}
                                    >
                                        Welcome!
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        className={classes.subGreeting}
                                    >
                                        Create your account
                                    </Typography>
                                    <Fade in={error}>
                                        <Typography
                                            color="secondary"
                                            className={classes.errorMessage}
                                        >
                                            Something is wrong with your login
                                            or password :(
                                        </Typography>
                                    </Fade>
                                    <TextField
                                        id="name"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={nameValue}
                                        onChange={e =>
                                            setNameValue(e.target.value)
                                        }
                                        margin="normal"
                                        placeholder="Full Name"
                                        type="email"
                                        fullWidth
                                    />
                                    <TextField
                                        id="email"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={emailValue}
                                        onChange={e =>
                                            setEmailValue(e.target.value)
                                        }
                                        margin="normal"
                                        placeholder="Email Adress"
                                        type="email"
                                        fullWidth
                                    />
                                    <TextField
                                        id="userName"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={loginValue}
                                        onChange={e =>
                                            setLoginValue(e.target.value)
                                        }
                                        margin="normal"
                                        placeholder="User Name"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        id="password"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={passwordValue}
                                        onChange={e =>
                                            setPasswordValue(e.target.value)
                                        }
                                        margin="normal"
                                        placeholder="Password"
                                        type="password"
                                        fullWidth
                                    />
                                    <TextField
                                        id="phoneNumber"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={phoneNumberValue}
                                        onChange={e =>
                                            setPhoneNumberValue(e.target.value)
                                        }
                                        margin="normal"
                                        placeholder="Phone Number"
                                        type="tel"
                                        fullWidth
                                    />

                                    <div
                                        className={
                                            classes.creatingButtonContainer
                                        }
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={26} />
                                        ) : (
                                            <Button
                                                onClick={handleSignUp} // Create new User Account
                                                disabled={
                                                    loginValue.length === 0 ||
                                                    passwordValue.length ===
                                                        0 ||
                                                    nameValue.length === 0 ||
                                                    phoneNumberValue.length ==
                                                        0 ||
                                                    emailValue.length == 0
                                                }
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                className={
                                                    classes.createAccountButton
                                                }
                                            >
                                                Create your account
                                            </Button>
                                        )}
                                    </div>

                                    <div
                                        className={classes.formDividerContainer}
                                    >
                                        <div className={classes.formDivider} />
                                        <Typography
                                            className={classes.formDividerWord}
                                        >
                                            or
                                        </Typography>
                                        <div className={classes.formDivider} />
                                    </div>
                                    <Button
                                        size="large"
                                        /*
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
                */
                                    >
                                        <img
                                            src={google}
                                            alt="google"
                                            className={classes.googleIcon}
                                        />
                                        &nbsp;Sign in with Google
                                    </Button>
                                </React.Fragment>
                            ) : (
                                //else verify account with code
                                <React.Fragment>
                                    <Typography
                                        variant="h6"
                                        className={classes.subGreeting}
                                    >
                                        Verification Code Sent!
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        className={classes.subGreeting}
                                    >
                                        Please enter you Coexist OTP to verify
                                    </Typography>
                                    <Fade in={error}>
                                        <Typography
                                            color="secondary"
                                            className={classes.errorMessage}
                                        >
                                            Something is wrong with your login
                                            or password :(
                                        </Typography>
                                    </Fade>
                                    <TextField
                                        id="name"
                                        InputProps={{
                                            classes: {
                                                underline:
                                                    classes.textFieldUnderline,
                                                input: classes.textField
                                            }
                                        }}
                                        value={confirmationCodeValue}
                                        onChange={e =>
                                            setConfirmationCodeValue(
                                                e.target.value
                                            )
                                        }
                                        margin="normal"
                                        placeholder="Confirmation Code"
                                        type="text"
                                        fullWidth
                                    />

                                    <div
                                        className={
                                            classes.creatingButtonContainer
                                        }
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={26} />
                                        ) : (
                                            <Button
                                                onClick={handleConfirmCode} // confirm account
                                                disabled={
                                                    confirmationCodeValue.length ===
                                                    0
                                                }
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                className={
                                                    classes.createAccountButton
                                                }
                                            >
                                                Confirm your account
                                            </Button>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Grid>
    );
}

export default withRouter(Login);
