// @flow
// @format

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getUser as getUserDetailsQuery } from "../../graphql/queries";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../Loading/LoadingPage";
import { updateUser } from "../../api/Api";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { isValidPhoneNumber } from "../../components/util/validation";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    fields: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    }
}));

function ProfileSettings({
    isDialogOpen,
    setDialogOpen,
    userData
}: Props): React.MixedElement {
    const classes = useStyles();
    const handleClose = () => {
        setDialogOpen(false);
    };

    const { id, username = "", email: userEmail = "", name = "", phone = "" } =
        userData ?? {};

    const [newName, setNewName] = useState(name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phone);
    const [isErrorOpen, setErrorOpen] = React.useState(false);

    const handleSubmit = async () => {
        if (newName === name && newPhoneNumber === phone) {
            handleClose();
            return;
        }

        if (!isValidPhoneNumber(newPhoneNumber)) {
            setErrorOpen(true);
            return;
        }

        setErrorOpen(false);
        await updateUser(id, newName, newPhoneNumber).then(data => {
            handleClose();
            window.location.replace("profile");
        });
    };

    return (
        <div>
            <Dialog
                fullWidth="md"
                open={isDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Edit Profile Settings</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1">Name</Typography>

                            <TextField
                                margin="dense"
                                id="name"
                                value={newName}
                                onChange={event =>
                                    setNewName(event.target.value)
                                }
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Username
                            </Typography>

                            <TextField
                                margin="dense"
                                id="username"
                                disabled
                                value={username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            @
                                        </InputAdornment>
                                    )
                                }}
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Email Address
                            </Typography>

                            <TextField
                                margin="dense"
                                disabled
                                value={userEmail}
                                id="email"
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Phone Number
                            </Typography>

                            <TextField
                                id="phone"
                                value={newPhoneNumber}
                                onChange={event =>
                                    setNewPhoneNumber(event.target.value)
                                }
                                style={{ width: 200 }}
                            />
                        </div>

                        <br />
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Personal Monthly Budget
                            </Typography>

                            <TextField
                                id="budget"
                                //NEED TO CHANGE THIS TO ADD budget field to user
                                defaultValue="1000.00"
                                style={{ width: 200 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="outlined"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="outlined"
                    >
                        SUBMIT
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        open={isErrorOpen}
                        onClose={() => {
                            setErrorOpen(false);
                        }}
                        autoHideDuration={6000}
                        action={
                            <React.Fragment>
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    >
                        <Alert
                            onClose={() => {
                                setErrorOpen(false);
                            }}
                            severity="error"
                        >
                            Error! Your phone number is invalid!
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProfileSettings;
