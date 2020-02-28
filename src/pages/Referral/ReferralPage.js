// @flow

import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";

import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { ReferralTypeConstants } from "../../components/util/ReferralTypeConstants";

const { PHONE_NUM, EMAIL_ADDRESS } = ReferralTypeConstants;

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
    const [type, setType] = React.useState("");
    const [referralContact, setReferralContact] = React.useState("");
    const handleChange = event => {
        setType(event.target.value);
    };

    console.log({ referralContact });
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
                                // value={name}
                                // onChange={event =>
                                //     setName(event.target.value)
                                // }
                                // error={nameError}
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
                                value={type}
                                label="Referral Type"
                            >
                                <option value={PHONE_NUM}>Phone number</option>
                                <option value={EMAIL_ADDRESS}>
                                    Email Address
                                </option>
                            </Select>
                        </FormControl>
                    </div>
                    <form align="right">
                        <TextField
                            placeholder={type}
                            variant="outlined"
                            onChange={event =>
                                setReferralContact(event.target.value)
                            }
                        />
                    </form>
                </div>
                <br /> <br />
                <Button
                    variant="contained"
                    id="submitFriendReferral"
                    // onClick={handleOnSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default ReferralPage;
