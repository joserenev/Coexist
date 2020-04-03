// @flow
// @format

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { updateReceipt } from "../../api/Api";
import User from "../../components/User/User";

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

import Checkbox from "@material-ui/core/Checkbox";

import { uploadCloudinaryImage } from "../../api/Api";
import { QueryStatus } from "../../components/util/QueryUtil";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445"
});
var channels = []; ////change to group id

const { IDLE, PENDING, SUCCESS, ERROR } = QueryStatus;

const tolerance = 0.0005;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function isNullOrEmpty(str) {
    return str == null || str.trim() === "";
}

const useStyles = makeStyles(theme => ({
    fields: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        margin: 4
    },
    imagePreviewContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        align: "center"
    },
    imagePreview: {
        height: 400,
        width: 540,
        padding: 20
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function getGroupMembers(receipt) {
    const items = receipt.group.users.items;
    return items.map(groupItem => {
        return groupItem.user;
    });
}

function checkEvenSplit(evenSplitAmount, splitMap) {
    let isEvenSplit = true;
    splitMap.forEach(value => {
        if (Math.abs(Number(value) - evenSplitAmount) >= tolerance) {
            isEvenSplit = false;
        }
    });
    return isEvenSplit;
}

function UpdateExpense({
    currentUserID,
    groupID,
    isDialogOpen,
    setDialogOpen,
    receipt: editReceipt
}: Props): React.MixedElement {
    const classes = useStyles();
    const {
        name: originalName,
        description: originalDescription,
        totalAmount: originalAmount,
        receiptImageUrl: originalImageURL
    } = editReceipt;

    // Page Handling
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);
    const [mutationStatus, setMutationStatus] = useState<QueryStatusEnum>(IDLE);

    //state values
    const [name, setName] = useState(originalName ?? "");
    const [description, setDescription] = useState(originalDescription ?? "");
    const [amount, setAmount] = useState(originalAmount ?? 0);
    const [selectedImage, setSelectedImage] = useState<>(null);
    const [imageURL, setImageURL] = useState<>(originalImageURL ?? "");

    const [groupMembers, setGroupMembers] = useState(
        getGroupMembers(editReceipt)
    );
    const [splitMap, setSplitMap] = useState<>(
        new Map(JSON.parse(editReceipt.memberSplit))
    );

    ///Notification stuff
    var groupJSON = window.localStorage.getItem("CoexistGroups") || "{}";
    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var groups = JSON.parse(groupJSON);
    var userData = JSON.parse(userDataJSON);
    channels[0] = groupID;
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState("");
    const sendMessage = message => {
        var json = {};
		json.message = userData.username + " " + message;
        json.timeSent = new Date().getTime();
        json.uniqueId = Math.random();
        json.notificationClass = "Receipt Update";
        json.sender = userData.username;
        json.groupId = groupID;
        json.currentUserId = currentUserID;

        pubnub.publish(
            {
                channel: channels[0],
                message: json
            },
            () => setMessage("")
        );
    };

    const handleImageChange = async event => {
        setSelectedImage(event.target.files[0]);
        await uploadCloudinaryImage(event.target.files[0])
            .then(newImageURL => {
                setImageURL(newImageURL);
            })
            .catch(err => {
                console.error("an error occured while uploading receipt image");
            });
    };

    const [isEqualSplit, setIsEqualSplit] = useState(
        checkEvenSplit(amount / groupMembers.length, splitMap)
    );

    const handleClose = useCallback(() => {
        const oldSplitMap = new Map(JSON.parse(editReceipt.memberSplit));
        setName(originalName);
        setDescription(originalDescription);
        setAmount(originalAmount);
        setSelectedImage(null);
        setImageURL(originalImageURL);
        setIsEqualSplit(
            checkEvenSplit(originalAmount / groupMembers.length, oldSplitMap)
        );
        setGroupMembers(getGroupMembers(editReceipt));
        setSplitMap(oldSplitMap);
        setDialogOpen(false);
    }, [
        editReceipt,
        groupMembers.length,
        originalAmount,
        originalDescription,
        originalImageURL,
        originalName,
        setDialogOpen
    ]);

    const handleEqualSplit = useCallback(
        newAmount => {
            const evenSplit = newAmount / groupMembers.length;
            if (checkEvenSplit(evenSplit, splitMap) && splitMap.size !== 0) {
                return;
            }
            const newSplitMap = new Map();
            groupMembers.forEach(user => {
                newSplitMap.set(user.id, evenSplit.toString());
            });
            setSplitMap(newSplitMap);
        },
        [splitMap, groupMembers]
    );

    const getSplitValue = useCallback(
        userID => {
            return splitMap.get(userID) ?? "0";
        },
        [splitMap]
    );

    const handleSplitChange = useCallback(
        (userID, newAmount) => {
            const newSplitMap = new Map(splitMap);
            newSplitMap.set(userID, newAmount);
            setSplitMap(newSplitMap);
        },
        [splitMap]
    );

    const handleAmountChange = useCallback(
        newAmount => {
            setAmount(newAmount);
            if (isEqualSplit) {
                handleEqualSplit(newAmount);
            }
        },
        [handleEqualSplit, isEqualSplit]
    );

    const getBalanceAmount = useCallback(() => {
        let sum = 0;
        splitMap.forEach(value => {
            sum = sum + Number(value);
        });
        return amount - sum;
    }, [amount, splitMap]);

    const isNonNegativeSplit = useCallback(() => {
        let isNonNegative = true;
        splitMap.forEach(value => {
            if (Number(value) < 0) {
                isNonNegative = false;
            }
        });
        return isNonNegative;
    }, [splitMap]);

    const checkValidInput = useCallback((): boolean => {
        if (name.trim() === "") {
            setErrorOpen(true);
            setErrorMessage("Name is required");
        } else if (Number(amount) === 0) {
            setErrorOpen(true);
            setErrorMessage("Total Amount cannot be zero");
        } else if (Number(amount) < 0) {
            setErrorOpen(true);
            setErrorMessage("Total Amount cannot be negative");
        } else if (Number(getBalanceAmount()) !== 0) {
            setErrorOpen(true);
            setErrorMessage("Balance amount for receipt should be zero");
        } else if (!isNonNegativeSplit()) {
            setErrorOpen(true);
            setErrorMessage("Split amounts cannot be negative");
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [amount, getBalanceAmount, isNonNegativeSplit, name]);

    const handleSubmit = async () => {
        if (!checkValidInput()) {
            return;
        }
        setMutationStatus(PENDING);
        let receiptInfo = {
            id: editReceipt.id
        };

        if (name !== originalName) {
            receiptInfo = {
                ...receiptInfo,
                name
            };
        }
        if (description !== originalDescription) {
            receiptInfo = {
                ...receiptInfo,
                description
            };
        }
        const newMemberSplit = JSON.stringify(Array.from(splitMap.entries()));
        if (newMemberSplit !== editReceipt.memberSplit) {
            receiptInfo = {
                ...receiptInfo,
                memberSplit: newMemberSplit
            };
        }
        if (amount !== originalAmount) {
            receiptInfo = {
                ...receiptInfo,
                totalAmount: amount
            };
        }

        if (originalImageURL !== imageURL) {
            receiptInfo = {
                ...receiptInfo,
                receiptImageUrl: imageURL
            };
        }

        sendMessage("updated receipt: " + name + ".");

        await updateReceipt(receiptInfo)
            .then(res => {
                setMutationStatus(SUCCESS);
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(error => {
                console.error("Update Receipt  unsucessful", error);
                setMutationStatus(ERROR);
                setErrorOpen(true);
                setErrorMessage("Failed to update expense. Please try again.");
            });
    };

    return (
        <div>
            <Dialog
                fullWidth
                open={isDialogOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <b>Edit Expense</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.fields}>
                            <Typography variant="body1">
                                Expense Name
                            </Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
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
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                                style={{ width: 200 }}
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Amount
                            </Typography>
                            <TextField
                                id="amount"
                                margin="dense"
                                onChange={event => {
                                    handleAmountChange(event.target.value);
                                }}
                                value={amount}
                                style={{ width: 200 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                                type="number"
                            />
                        </div>
                        <div className={classes.fields}>
                            <Typography variant="body1">
                                Upload New Receipt
                            </Typography>
                            <TextField
                                id="image"
                                margin="dense"
                                onChange={handleImageChange}
                                style={{ width: 200 }}
                                inputProps={{
                                    accept:
                                        "image/x-png,image/gif,image/jpeg,image/jpg"
                                }}
                                type="file"
                            ></TextField>
                        </div>
                        {!isNullOrEmpty(imageURL) && (
                            <div className={classes.imagePreviewContainer}>
                                <Typography variant="body1">
                                    Current Receipt Preview
                                </Typography>
                                <img
                                    className={classes.imagePreview}
                                    src={imageURL}
                                    title="Receipt"
                                    alt="Receipt Preview"
                                />
                            </div>
                        )}

                        <>
                            <Typography variant="h5">Member Split</Typography>
                            <div className={classes.fields}>
                                <Typography variant="body1" gutterBottom>
                                    Split Evenly Among all group members
                                </Typography>
                                <Checkbox
                                    color="primary"
                                    checked={isEqualSplit}
                                    onChange={event => {
                                        setIsEqualSplit(event.target.checked);
                                        if (event.target.checked) {
                                            handleEqualSplit(amount);
                                        }
                                    }}
                                />
                            </div>

                            {groupMembers.map((user, index) => {
                                return (
                                    <div key={index} className={classes.fields}>
                                        <User
                                            user={user}
                                            isDeleteDisabled={true}
                                        />
                                        <TextField
                                            id={user.id}
                                            margin="dense"
                                            onChange={event => {
                                                handleSplitChange(
                                                    event.target.id,
                                                    event.target.value
                                                );
                                            }}
                                            value={getSplitValue(user.id)}
                                            style={{
                                                width: 200
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        $
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled={isEqualSplit}
                                            type="number"
                                        />
                                    </div>
                                );
                            })}
                        </>
                        <div className={classes.fields}>
                            <Typography variant="body1" gutterBottom>
                                Balance Amount
                            </Typography>
                            <Typography
                                variant="h3"
                                color={
                                    Number(getBalanceAmount()) === 0
                                        ? "primary"
                                        : "error"
                                }
                            >
                                {`$${getBalanceAmount()}`}
                            </Typography>
                        </div>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="secondary"
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
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdateExpense;
