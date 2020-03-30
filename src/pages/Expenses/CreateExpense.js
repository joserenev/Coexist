// @flow
// @format

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import LoadingPage from "../../pages/Loading/LoadingPage";
import { createNewReceipt } from "../../api/Api";
import SimpleUserProfileView from "../../components/User/SimpleUserProfileView";

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
import { getGroup } from "../../customGraphql/queries";
import Checkbox from "@material-ui/core/Checkbox";

import { uploadCloudinaryImage } from "../../api/Api";
import { QueryStatus } from "../../components/util/QueryUtil";

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

function CreateExpense({
    currentUserID,
    groupID,
    isDialogOpen,
    setDialogOpen
}: Props): React.MixedElement {
    const classes = useStyles();

    const handleClose = useCallback(() => {
        setName("");
        setDescription("");
        setAmount(0);
        setSelectedImage(null);
        setImageURL("");
        setIsEqualSplit(true);
        setGroupMembers([]);
        setDialogOpen(false);
        setSplitMap(new Map());
    }, [setDialogOpen]);

    // Page Handling
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setErrorOpen] = useState(false);
    const [mutationStatus, setMutationStatus] = useState<QueryStatusEnum>(IDLE);

    //state values
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [selectedImage, setSelectedImage] = useState<>(null);
    const [imageURL, setImageURL] = useState<>("");
    const [isEqualSplit, setIsEqualSplit] = useState(true);
    const [groupMembers, setGroupMembers] = useState([]);
    const [splitMap, setSplitMap] = useState<>(new Map());

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

    const checkEvenSplit = useCallback(
        evenSplitAmount => {
            let isEvenSplit = true;
            splitMap.forEach(value => {
                if (Math.abs(Number(value) - evenSplitAmount) >= tolerance) {
                    isEvenSplit = false;
                }
            });
            return isEvenSplit;
        },
        [splitMap]
    );
    const handleEqualSplit = useCallback(
        newAmount => {
            const evenSplit = newAmount / groupMembers.length;
            if (checkEvenSplit(evenSplit) && splitMap.size !== 0) {
                return;
            }
            const newSplitMap = new Map();
            groupMembers.forEach(user => {
                newSplitMap.set(user.id, evenSplit.toString());
            });
            setSplitMap(newSplitMap);
        },
        [checkEvenSplit, splitMap, groupMembers]
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
        } else if (imageURL === "") {
            setErrorOpen(true);
            setErrorMessage("Upload image of Receipt");
        } else {
            setErrorOpen(false);
            setErrorMessage("");
            return true;
        }
        return false;
    }, [amount, getBalanceAmount, imageURL, isNonNegativeSplit, name]);

    const handleSubmit = async () => {
        if (!checkValidInput()) {
            return;
        }
        setMutationStatus(PENDING);

        // Stringify map to split.
        const stringifiedSplit = JSON.stringify(Array.from(splitMap.entries()));
        // to reverse -> map = new Map(JSON.parse(jsonText));

        await createNewReceipt(
            name,
            description,
            stringifiedSplit,
            amount,
            imageURL,
            currentUserID,
            groupID
        )
            .then(res => {
                setMutationStatus(SUCCESS);
                setErrorOpen(false);
                setErrorMessage("");
                handleClose();
                window.location.reload(true);
            })
            .catch(error => {
                console.error("Create Receipt  unsucessful", error);
                setMutationStatus(ERROR);
                setErrorOpen(true);
                setErrorMessage(
                    "Failed to create new expense. Please try again."
                );
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
                    <b>Create Expense</b>
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
                                Upload Receipt
                            </Typography>
                            <TextField
                                id="image"
                                margin="dense"
                                onChange={handleImageChange}
                                style={{ width: 200 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    )
                                }}
                                type="file"
                            ></TextField>
                        </div>
                        {!isNullOrEmpty(imageURL) && (
                            <div className={classes.imagePreviewContainer}>
                                <Typography variant="body1">
                                    Image Preview
                                </Typography>
                                <img
                                    className={classes.imagePreview}
                                    src={imageURL}
                                    title="Receipt"
                                    alt="Receipt Preview"
                                />
                            </div>
                        )}

                        <Connect
                            query={graphqlOperation(getGroup, { id: groupID })}
                        >
                            {({ data, loading, error }) => {
                                if (error) {
                                    //TODO: Add a dedicated ERROR Component with a message to show.
                                    return <h3>Error</h3>;
                                }

                                if (loading) {
                                    return <LoadingPage />;
                                }

                                const items =
                                    data?.getGroup?.users?.items ?? [];

                                if (groupMembers.length === 0) {
                                    setGroupMembers(
                                        items.map(groupItem => {
                                            return groupItem.user;
                                        })
                                    );
                                }

                                return (
                                    <>
                                        <Typography variant="h5">
                                            Member Split
                                        </Typography>
                                        <div className={classes.fields}>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                Split Evenly Among all group
                                                members
                                            </Typography>
                                            <Checkbox
                                                color="primary"
                                                checked={isEqualSplit}
                                                onChange={event => {
                                                    setIsEqualSplit(
                                                        event.target.checked
                                                    );
                                                    if (event.target.checked) {
                                                        handleEqualSplit(
                                                            amount
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>

                                        {groupMembers.map((user, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={classes.fields}
                                                >
                                                    <SimpleUserProfileView
                                                        user={user}
                                                    />
                                                    <TextField
                                                        id={user.id}
                                                        margin="dense"
                                                        onChange={event => {
                                                            handleSplitChange(
                                                                event.target.id,
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        value={getSplitValue(
                                                            user.id
                                                        )}
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
                                );
                            }}
                        </Connect>
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

export default CreateExpense;
