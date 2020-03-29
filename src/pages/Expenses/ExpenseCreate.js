

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getUser as getUserDetailsQuery } from "../../graphql/queries";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../../pages/Loading/LoadingPage";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
    getUserByUserName,
    deleteUserFromGroup,
    updateGroup,
    addUsersToGroup,
    deleteUsersFromGroup
} from "../../api/Api";
import AddIcon from "@material-ui/icons/Add";
import { QueryStatus } from "../../components/util/QueryUtil";

const { IDLE, PENDING, SUCCESS, ERROR } = QueryStatus;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles(theme => ({
    fields: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function ExpenseCreate({
    isDialogOpen,
    setDialogOpen,
    /*
    groupData,
    currentUserID
    */
}: Props): React.MixedElement {
    const classes = useStyles();

    /*

    // Group Info
    const [groupName, setGroupName] = useState(groupData?.name ?? "");
    const groupID = groupData.id;
    const [groupDescription, setGroupDescription] = useState(
        groupData?.description ?? ""
    );
    const items = groupData?.users?.items ?? [];
    const initialGroupMembers = items.map(groupItem => {
        return groupItem.user;
    });
    const [groupMembers, setGroupMembers] = useState(initialGroupMembers);
    const [addMemberUserName, setAddMemberUserName] = useState("");

    // Page render components
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);
    const [mutationStatus, setMutationStatus] = useState<QueryStatusEnum>(IDLE);

    // Stores the UserGroupID
    const [deletedGroupMembers, setDeletedGroupMembers] = useState([]);
    */

    const handleClose = useCallback(() => {
        /*
        setGroupName(groupData?.name ?? "");
        setGroupDescription(groupData?.description ?? "");
        setGroupMembers(initialGroupMembers);
        setAddMemberUserName("");
        setDeletedGroupMembers([]);
        */
        setDialogOpen(false);
    }, [setDialogOpen]);




    return (
        <div>
            <Dialog
                fullWidth="md"
                open={isDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Add new receipt</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1">Name</Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                //value
                                //onChange
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Description
                            </Typography>
                            <TextField
                                margin="dense"
                                id="description"
                                //value
                                //onChange
                                style={{ width: 200 }}
                            />
                        </div>
                        <br />
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Amount
                            </Typography>
                            <TextField
                                id="budget"
                                defaultValue="0.00"
                                style={{ width: 200 }}
                                //disabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                       

                        <Button
                            variant="contained"
                            component="label"
                            >
                            Upload Picture
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
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
                        onClick
                        color="primary"
                        variant="outlined"
                        //disabled
                    >
                        SUBMIT
                    </Button>
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExpenseCreate;
