import React, { useState } from "react";
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
        name = "",
        owner = {},
        description = "No Description found",
        memberSplit: rawMemberSplit = "[]",
        totalAmount = "0",
        createdAt = "",
        group = {},
        receiptImageUrl = ""
    } = receipt;

    const groupMembers = group?.users?.items ?? [];
    const memberSplitMap = new Map(JSON.parse(rawMemberSplit));
    const createdDate = new Date(createdAt).toDateString();

    const getOwedAmount = userID => {
        const userAmount = memberSplitMap.get(userID);
        return userAmount == undefined
            ? "0".toFixed(2)
            : Number(userAmount).toFixed(2);
    };

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    return (
        <div className={classes.headContainer}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
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
                            <Grid item>
                                <ButtonBase>
                                    <AcceptIcon />
                                </ButtonBase>
                                <ButtonBase>
                                    <RejectIcon />
                                </ButtonBase>
                            </Grid>
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
                                {groupMembers.map((memberItem, index) => {
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
                                                        user={memberItem.user}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography
                                                        variant="h5"
                                                        color="primary"
                                                    >
                                                        {`$${getOwedAmount(
                                                            memberItem.user.id
                                                        )}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
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
