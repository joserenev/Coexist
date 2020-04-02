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

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TransacTab from "./TransacTab"

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

function TransacHistory({
    isTDialogOpen,
    setTDialogOpen,
    userData
}: Props): React.MixedElement {
    const classes = useStyles();
    const handleClose = () => {
        setTDialogOpen(false);
    };

    const { id, username = "", email: userEmail = "", name = "", phone = "" } =
        userData ?? {};

    const [newName, setNewName] = useState(name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phone);

    const handleSubmit = async () => {
        if (newName === name && newPhoneNumber === phone) {
            handleClose();
            return;
        }
        await updateUser(id, newName, newPhoneNumber).then(data => {
            handleClose();
            window.location.replace("profile");
        });
    };

    return (
        <div>
            <Dialog
                fullWidth="md"
                open={isTDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Transaction History</b>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Your Total Expenses this Cycle:
                        </Typography>
                        <TransacTab/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="outlined"
                    >
                        CLOSE
                    </Button>
                   
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TransacHistory;
