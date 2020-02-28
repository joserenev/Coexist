// @flow

import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";
import type QueryStatusEnum from "../../components/util/QueryUtil";

import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
    ReferralTypeConstants,
    ReferralMedium
} from "../../components/util/ReferralTypeConstants";
import { inviteNotificationApi } from "../../api/Api.js";
import { QueryStatus } from "../../components/util/QueryUtil";
import LoadingPage from "../Loading/LoadingPage";

import {
    isValidEmail,
    isValidPhoneNumber
} from "../../components/util/validation";

const { EMAIL, TEXT } = ReferralMedium;
const { PHONE_NUM, EMAIL_ADDRESS } = ReferralTypeConstants;
const { IDLE, PENDING, SUCCESS, ERROR } = QueryStatus;

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#ecf0f1",
        padding: 40,
        margin: 20,
        flexDirection: "column",
        flex: 1,
        display: "flex"
    },

    info: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        displayContent: "center"
    },

    input: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    mediumIcon: {
        marginRight: 20,
        height: 80,
        width: 80
    },

    pictureContainer: {
        margin: 20,
        float: "left",
        backgroundColor: "white",
        align: "center",
        justifyContent: "center",
        padding: 20,
        display: "flex",
        flexDirection: "column"
    },

    avatar: {
        height: 180,
        width: 180
    }
}));

type Props = {|
    userID: string
|};

function ReferralPage({ userID }: Props): React.MixedElement {
    const classes = useStyles();
    const [medium, setMedium] = React.useState(TEXT);
    const [referralName, setReferralName] = React.useState("");
    const [referralContact, setReferralContact] = React.useState("");
    const handleChange = event => {
        setMedium(event.target.value);
    };

    const [invalidInput, setInvalidInput] = useState(false);
    const [queryStatus, setQueryStatus] = useState<QueryStatusEnum>(IDLE);
    const [isSuccessOpen, setSuccessOpen] = useState(false);

    const handleSubmit = async () => {
        if (medium === TEXT && !isValidPhoneNumber(referralContact)) {
            setInvalidInput(true);
            return;
        }
        if (medium === EMAIL && !isValidEmail(referralContact)) {
            setInvalidInput(true);
            return;
        }

        setInvalidInput(false);
        setQueryStatus(PENDING);
        await inviteNotificationApi(medium, referralContact)
            .then(() => {
                console.log("successfully referred");
                setQueryStatus(SUCCESS);
                setSuccessOpen(true);
                setReferralContact("");
                setReferralName("");
            })
            .catch(err => {
                console.log({ err });
                setQueryStatus(ERROR);
            });
    };

    if (queryStatus === PENDING) {
        return <LoadingPage />;
    }
    return (
        <div>
            <div className={classes.container}>
                <div className={classes.info}>
                    <EmojiPeopleIcon className={classes.mediumIcon} />
                    <Typography variant="h6">
                        <i>
                            {" "}
                            Refer your friends to join <b>Coexist</b> so you can
                            add them to your groups!{" "}
                        </i>
                    </Typography>
                </div>
                <div>
                    <div className={classes.input}>
                        <Typography variant="h6">Input the name:</Typography>
                        <form>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={referralName}
                                onChange={event =>
                                    setReferralName(event.target.value)
                                }
                            />
                        </form>
                    </div>
                    <br />
                    <br />
                    <div className={classes.input}>
                        <Typography variant="h6">
                            Select referral type:
                        </Typography>

                        <FormControl variant="outlined">
                            <InputLabel> Referral Type </InputLabel>
                            <Select
                                native
                                defaultValue={PHONE_NUM}
                                onChange={handleChange}
                                value={medium}
                                label="Referral Type"
                            >
                                <option value={TEXT}>Phone number</option>
                                <option value={EMAIL}>Email Address</option>
                            </Select>
                        </FormControl>
                    </div>
                    <form align="right">
                        <TextField
                            placeholder={
                                medium == TEXT ? PHONE_NUM : EMAIL_ADDRESS
                            }
                            variant="outlined"
                            value={referralContact}
                            onChange={event =>
                                setReferralContact(event.target.value)
                            }
                            error={invalidInput}
                        />
                    </form>
                </div>
                <br /> <br />
                <Button
                    variant="contained"
                    id="submitFriendReferral"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                {queryStatus === SUCCESS && (
                    <Snackbar
                        open={isSuccessOpen && queryStatus === SUCCESS}
                        autoHideDuration={2000}
                        onClose={() => {
                            setSuccessOpen(false);
                        }}
                    >
                        <Alert
                            onClose={() => {
                                setSuccessOpen(false);
                            }}
                            severity="success"
                        >
                            Thank you for your referral! We have sent your
                            friend an email/text.
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </div>
    );
}

export default ReferralPage;
