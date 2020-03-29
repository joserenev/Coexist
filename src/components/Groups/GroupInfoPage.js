// @flow
// @format

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getUser as getUserDetailsQuery } from "../../graphql/queries";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../../pages/Loading/LoadingPage";
import { updateUser } from "../../api/Api";
import User from "../User/User";

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

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
            return false;
        }
    }

    return true;
}

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

function GroupInfoPage({
    isDialogOpen,
    setDialogOpen,
    groupData,
    currentUserID
}: Props): React.MixedElement {
    const classes = useStyles();

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

    const handleClose = useCallback(() => {
        setGroupName(groupData?.name ?? "");
        setGroupDescription(groupData?.description ?? "");
        setGroupMembers(initialGroupMembers);
        setAddMemberUserName("");
        setDeletedGroupMembers([]);
        setDialogOpen(false);
    }, [groupData, initialGroupMembers, setDialogOpen]);

    const deleteGroupMember = useCallback(
        deleteUserID => {
            const deleteGroupItemElement = items.find(groupItem => {
                return groupItem.user.id === deleteUserID;
            });

            if (deleteGroupItemElement != null) {
                setDeletedGroupMembers([
                    ...deletedGroupMembers,
                    deleteGroupItemElement.id
                ]);
            }

            setGroupMembers(
                groupMembers.filter(member => member.id !== deleteUserID)
            );
        },
        [deletedGroupMembers, groupMembers, items]
    );

    const addGroupMember = useCallback(
        newMember => {
            const memberAlreadyExists = groupMembers.some(member => {
                return newMember.id === member.id;
            });
            if (memberAlreadyExists) {
                setErrorMessage("Member already exists");
                setErrorOpen(true);
                return;
            }
            setGroupMembers([...groupMembers, newMember]);
            setAddMemberUserName("");
        },
        [groupMembers]
    );

    const hasAnythingChanged = useCallback(() => {
        if (
            groupName === groupData?.name &&
            groupDescription === groupData?.description &&
            areArraysEqual(groupMembers, initialGroupMembers) &&
            deletedGroupMembers.length === 0
        ) {
            return false;
        }
        return true;
    }, [
        deletedGroupMembers,
        groupData,
        groupDescription,
        groupMembers,
        groupName,
        initialGroupMembers
    ]);
    const addNewMember = async () => {
        if (addMemberUserName == null || addMemberUserName.trim() === "") {
            return;
        }
        await getUserByUserName(addMemberUserName)
            .then(response => {
                const { data = {} } = response ?? {};
                const { items = [] } = data?.listUsers ?? {};
                if (items.length === 0) {
                    setErrorMessage("Username wasn't found");
                    setErrorOpen(true);
                    return;
                }
                addGroupMember(items[0]);
            })
            .catch(err => {
                console.error(
                    "an error occured while fetching user by username"
                );
            });
    };

    const handleSubmit = async () => {
        if (!hasAnythingChanged()) {
            handleClose();
            return;
        }

        // change group settings
        // add users to group if they are not already present
        // remove users from group if they are present

        setMutationStatus(PENDING);
        const promises = [];
        if (
            groupName !== groupData?.name ||
            groupDescription !== groupData?.description
        ) {
            const updateGroupInput = {
                name: groupName,
                description: groupDescription
            };
            promises.push(updateGroup(groupID, updateGroupInput));
        }

        if (!areArraysEqual(groupMembers, initialGroupMembers)) {
            const newMembersIDList = groupMembers
                .filter(groupMember => {
                    return initialGroupMembers.every(initialMember => {
                        return groupMember.id !== initialMember.id;
                    });
                })
                .map(user => user.id);
            const newMembersEmailList = groupMembers
                .filter(groupMember => {
                    return initialGroupMembers.every(initialMember => {
                        return groupMember.id !== initialMember.id;
                    });
                })
                .map(user => user.email);
            promises.push(
                addUsersToGroup(groupID, newMembersIDList, newMembersEmailList)
            );
        }

        if (deletedGroupMembers.length !== 0) {
            promises.push(deleteUsersFromGroup(deletedGroupMembers));
        }

        await Promise.all(promises)
            .then(data => {
                console.log("Group Settings Update Complete", { data });
                setMutationStatus(SUCCESS);
                handleClose();
                window.location.reload(true);
            })
            .catch(error => {
                console.error("Group Settings update unsucessful", error);
                setMutationStatus(ERROR);
            });
    };

    const handleLeaveGroup = async () => {
        const currentUserUserGroup = items.find(groupItem => {
            return groupItem.user.id === currentUserID;
        });
        if (currentUserUserGroup == null || currentUserUserGroup.id == null) {
            return;
        }
        setMutationStatus(PENDING);
        await deleteUserFromGroup(currentUserUserGroup.id)
            .then(response => {
                console.log("leave group successful");
                window.location.replace("/homepage");
            })
            .error(err => {
                console.error("Leave group unsucessful", err);
                setMutationStatus(ERROR);
            });
    };

    if (mutationStatus === PENDING) {
        return <LoadingPage />;
    }

    return (
        <div>
            <Dialog
                fullWidth
                open={isDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Settings for {groupData.name}</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1">Group Name</Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                value={groupName}
                                onChange={event =>
                                    setGroupName(event.target.value)
                                }
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
                                value={groupDescription}
                                onChange={event =>
                                    setGroupDescription(event.target.value)
                                }
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Owner
                            </Typography>

                            <TextField
                                margin="dense"
                                disabled
                                value={groupData?.owner?.name ?? ""}
                                id="owner"
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Group Type
                            </Typography>
                            <TextField
                                id="type"
                                value={groupData?.type ?? ""}
                                disabled
                                style={{ width: 200 }}
                            />
                        </div>
                        <br />

                        <Typography variant="h5">Statistics</Typography>
                        <br />

                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Money Spent
                            </Typography>

                            <TextField
                                id="amountSpent"
                                defaultValue="800.00"
                                style={{ width: 200 }}
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Budget
                            </Typography>
                            <TextField
                                id="budget"
                                defaultValue="1000.00"
                                style={{ width: 200 }}
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Typography variant="h5" gutterBottom>
                                Group Members:
                            </Typography>
                            <List>
                                {groupMembers.map((user, index) => {
                                    return (
                                        <div key={index}>
                                            <ListItem>
                                                <User
                                                    OnlineType="OfflineBadge"
                                                    user={user}
                                                    deleteGroupMember={
                                                        deleteGroupMember
                                                    }
                                                />
                                            </ListItem>
                                        </div>
                                    );
                                })}
                            </List>
                        </div>
                        <div className={classes.fields}>
                            <TextField
                                id="addMemberUsername"
                                placeholder="Enter username to add to group"
                                style={{ width: 320 }}
                                value={addMemberUserName}
                                variant="outlined"
                                onChange={event =>
                                    setAddMemberUserName(event.target.value)
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            @
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <Button
                            variant="outlined"
                            color="default"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            onClick={addNewMember}
                            disabled={addMemberUserName.trim() === ""}
                        >
                            Add new user
                        </Button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleLeaveGroup}
                        color="secondary"
                        variant="outlined"
                    >
                        Leave Group
                    </Button>
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
                        disabled={!hasAnythingChanged()}
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
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GroupInfoPage;
