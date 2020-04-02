import React, { useState, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import SimpleUserProfileView from "../../components/User/SimpleUserProfileView";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import AcceptIcon from "@material-ui/icons/CheckCircle";
import RejectIcon from "@material-ui/icons/Cancel";
import UpdateExpense from "./UpdateExpense";
import { green, yellow, red } from "@material-ui/core/colors";
import {
    ApprovalStatus,
    ApprovalResponse
} from "../../components/util/ExpenseApprovalUtil";
import { getCurrentTimeStampString } from "../../components/util/DateUtil";

import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import { respondToReceipt } from "../../api/Api";

const { PENDING, APPROVED, REJECTED } = ApprovalStatus;

const { ACCEPT, REJECT } = ApprovalResponse;

const useStyles = makeStyles(theme => ({
    headContainer: {
        margin: 10
    },
    largeIcons: {
        height: 180,
        width: 180
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        width: "100vh",
        minWidth: 500
    },
    approvedTag: {
        fontSize: 14,
        backgroundColor: green[400],
        padding: 8,
        marginTop: 24
    },
    rejectedTag: {
        fontSize: 14,
        backgroundColor: red[400],
        padding: 8,
        marginTop: 24
    },
    pendingTag: {
        fontSize: 14,
        backgroundColor: yellow[400],
        padding: 8,
        marginTop: 24
    }
}));

function ImagePreivew(props) {
    const { onClose, selectedValue, open, imageUrl } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <img src={imageUrl} alt="Preview of receipt" />
        </Dialog>
    );
}

function ExpensesReceiptRow({
    receipt,
    setSelectedEditReceipt,
    currentUserID,
    groupID
}): React.MixedElement {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = value => {
        setOpen(false);
    };

    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const {
        id,
        name = "",
        owner = {},
        description = "No Description found",
        memberSplit: rawMemberSplit = "[]",
        totalAmount = "0",
        createdAt = "",
        group = {},
        receiptImageUrl = "",
        approvalStatus: rawApprovalStatus,
        approvedDate = "",
        approverList: rawApproverList = "[]"
    } = receipt ?? {};

    const approvalStatus = rawApprovalStatus ?? PENDING;

    const groupMembers = group?.users?.items ?? [];
    const memberSplitMap = new Map(JSON.parse(rawMemberSplit));
    const createdDate = new Date(createdAt).toDateString();

    const getOwedAmount = userID => {
        const userAmount = memberSplitMap.get(userID);
        return userAmount == undefined ? "0.00" : Number(userAmount).toFixed(2);
    };

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    // Approve/Deny Receipt
    const approvalMap = new Map(JSON.parse(rawApproverList));
    const receivedAllApprovals = useCallback(() => {
        let allApprovals = true;
        memberSplitMap.forEach((value, key) => {
            if (Number(value) !== 0 && approvalMap.get(key) !== APPROVED) {
                allApprovals = false;
            }
        });
        return allApprovals;
    }, [approvalMap, memberSplitMap]);

    const updateApprovalStatus = useCallback(
        async responseStatus => {
            // already responded

            if (approvalMap.get(currentUserID) !== undefined) {
                return;
            }
            approvalMap.set(currentUserID, responseStatus);

            let updateReceiptInfo = {
                id,
                approverList: JSON.stringify(Array.from(approvalMap.entries()))
            };

            if (responseStatus === REJECTED) {
                // if receipt has been rejected.
                updateReceiptInfo = {
                    ...updateReceiptInfo,
                    approvalStatus: REJECTED
                };
            }

            if (receivedAllApprovals()) {
                updateReceiptInfo = {
                    ...updateReceiptInfo,
                    approvalStatus: APPROVED,
                    approvedDate: getCurrentTimeStampString()
                };
            }

            await respondToReceipt(updateReceiptInfo)
                .then(response => {
                    window.location.reload(true);
                    // console.log("Receipt has been r", responseStatus);
                })
                .catch(err => {
                    // console.log("Receipt has been", responseStatus);
                });
        },
        [approvalMap, currentUserID, id, receivedAllApprovals]
    );

    const handleAccept = () => {
        updateApprovalStatus(APPROVED);
    };
    const handleReject = () => {
        updateApprovalStatus(REJECTED);
    };

    const showAcceptRejectAction = useCallback(() => {
        return (
            (approvalStatus == null || approvalStatus === PENDING) &&
            approvalMap.get(currentUserID) === undefined
        );
    }, [approvalMap, approvalStatus, currentUserID]);

    const getUserApprovalResoponse = useCallback(
        userID => {
            const response = approvalMap.get(userID);
            if (Number(memberSplitMap.get(userID)) === 0) {
                return null;
            }

            if (response === undefined || response === PENDING) {
                return (
                    <WatchLaterIcon
                        fontSize="large"
                        style={{ color: yellow[400] }}
                    />
                );
            } else if (response === APPROVED) {
                return (
                    <CheckCircleIcon
                        fontSize="large"
                        style={{ color: green[400] }}
                    />
                );
            } else {
                return (
                    <CancelIcon fontSize="large" style={{ color: red[400] }} />
                );
            }
        },
        [approvalMap, memberSplitMap]
    );

    return (
        <div className={classes.headContainer}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} item>
                    <Grid direction="column" item>
                        <Grid item>
                            <Typography
                                variant="h3"
                                align="center"
                                gutterBottom
                            >
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonBase onClick={handleClickOpen}>
                                {receiptImageUrl === "" ? (
                                    <ReceiptIcon
                                        className={classes.largeIcons}
                                    />
                                ) : (
                                    <img
                                        src={receiptImageUrl}
                                        alt="receipt preview"
                                        title="Receipt"
                                        className={classes.largeIcons}
                                    />
                                )}
                            </ButtonBase>
                            <ImagePreivew
                                imageUrl={receiptImageUrl}
                                open={open}
                                onClose={handleClose}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body3" color="textSecondary">
                                (Click on image to preview)
                            </Typography>
                        </Grid>
                        <Grid item>
                            {approvalStatus === APPROVED && (
                                <Typography
                                    className={classes.approvedTag}
                                    color="textPrimary"
                                    align="center"
                                >
                                    <b>Approved</b>
                                </Typography>
                            )}
                            {approvalStatus === PENDING && (
                                <Typography
                                    className={classes.pendingTag}
                                    color="textPrimary"
                                    align="center"
                                >
                                    <b>Pending</b>
                                </Typography>
                            )}
                            {approvalStatus === REJECTED && (
                                <Typography
                                    className={classes.rejectedTag}
                                    color="textPrimary"
                                    align="center"
                                >
                                    <b>Rejected</b>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    <b>Owner:</b>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {owner.name}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    <b>Receipt Amount:</b>
                                </Typography>
                                <Typography variant="h4" color="primary">
                                    {`$${totalAmount}`}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    <b>Description:</b>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {description}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    <b>Created on:</b>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {createdDate}
                                </Typography>
                            </Grid>
                            {showAcceptRejectAction() && (
                                <Grid item>
                                    <ButtonBase onClick={handleAccept}>
                                        <AcceptIcon
                                            style={{ color: green[500] }}
                                            fontSize="large"
                                        />
                                    </ButtonBase>
                                    <ButtonBase onClick={handleReject}>
                                        <RejectIcon
                                            fontSize="large"
                                            color="secondary"
                                        />
                                    </ButtonBase>
                                </Grid>
                            )}
                            {approvalMap.get(currentUserID) !== undefined && (
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        {`You have ${approvalMap.get(
                                            currentUserID
                                        )} this receipt`}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={1}
                            >
                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <b>DEBTERS:</b>
                                    </Typography>
                                </Grid>
                                {Array.from(memberSplitMap.keys()).map(
                                    (userID, index) => {
                                        return (
                                            <Grid item xs>
                                                <Grid
                                                    xs
                                                    container
                                                    direction="row"
                                                    spacing={0}
                                                    alignItems="center"
                                                >
                                                    <Grid item xs>
                                                        <SimpleUserProfileView
                                                            userID={userID}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography
                                                            variant="h5"
                                                            color="primary"
                                                        >
                                                            {`$${getOwedAmount(
                                                                userID
                                                            )}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs>
                                                        {getUserApprovalResoponse(
                                                            userID
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        );
                                    }
                                )}
                            </Grid>
                        </Grid>
                        {currentUserID === owner.id && (
                            <EditIcon
                                fontSize="small"
                                className={classes.addButton}
                                onClick={handleEdit}
                            />
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <UpdateExpense
                isDialogOpen={isEditDialogOpen}
                setDialogOpen={setEditDialogOpen}
                currentUserID={currentUserID}
                groupID={groupID}
                receipt={receipt}
            />
        </div>
    );
}

export default ExpensesReceiptRow;
