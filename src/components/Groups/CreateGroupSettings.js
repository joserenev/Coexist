// @flow

import type { GroupTypeEnum } from "../util/GroupConstants";
import type { MutationStatusEnum } from "../util/GroupConstants";

import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import GroupIcon from "@material-ui/icons/Group";
import GroupPicIcon from "@material-ui/icons/Wallpaper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { createGroupAPI } from "../../api/Api";
import { GroupTypeConstants } from "../util/GroupConstants";
import { MutationStatus } from "../util/QueryUtil";
import LoadingPage from "../../pages/Loading/LoadingPage";

const { HOUSEMATES, WORK, SOCIAL, OTHER } = GroupTypeConstants;
const { IDLE, PENDING, SUCCESS, ERROR } = MutationStatus;

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

function CreateGroupSettings({ userID }: Props): React.MixedElement {
    const classes = useStyles();

    const [groupName, setGroupName] = useState<string>("");
    const [groupNameError, setGroupNameError] = useState<boolean>(false);
    const [groupDescription, setGroupDescription] = useState<string>("");
    const [groupType, setGroupType] = useState<GroupTypeEnum>(HOUSEMATES);
    const [mutationStatus, setMutationStatus] = useState<MutationStatusEnum>(
        IDLE
    );
    const handleOnSubmit = async () => {
        console.log(groupName);
        console.log(groupDescription);
        console.log(groupType);
        if (groupName.trim() === "") {
            setGroupNameError(true);
            return;
        } else {
            setGroupNameError(false);
        }
        setMutationStatus(PENDING);
        await createGroupAPI(groupName, groupDescription, groupType, userID)
            .then(response => {
                console.log("group Created");
                console.log(response);
                window.location.replace(
                    `/groupHomePage/${response.data.createUserGroups.group.id}`
                );
                setMutationStatus(SUCCESS);
            })
            .catch(err => {
                setMutationStatus(ERROR);
                console.log({ err });
            });
    };

    if (mutationStatus === PENDING) {
        return <LoadingPage />;
    }

    return (
        <div>
            <div className={classes.container}>
                {mutationStatus === ERROR && (
                    <Alert variant="outlined" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        An error occured while creating the group. Please try
                        again!
                    </Alert>
                )}
                <div className={classes.info}>
                    <GroupIcon className={classes.mediumIcon} />
                    <Typography variant="h6">
                        <i>
                            {" "}
                            Groups are great for keeping payments in check and
                            having all receipts in order. You can also plan
                            events, assign tasks and have conversations with
                            group members.{" "}
                        </i>
                    </Typography>
                </div>
                <div>
                    <div className={classes.pictureContainer}>
                        <GroupPicIcon
                            fontSize="large"
                            className={classes.avatar}
                        />
                        <Button variant="contained" align="center">
                            EDIT
                        </Button>
                    </div>
                    <br />
                    <div className={classes.input}>
                        <Typography variant="h6">Group name</Typography>
                        <form>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={groupName}
                                onChange={event =>
                                    setGroupName(event.target.value)
                                }
                                error={groupNameError}
                            />
                        </form>
                    </div>
                    <br />
                    <div className={classes.input}>
                        <Typography variant="h6">Group description</Typography>
                        <form>
                            <TextField
                                label="Description (Optional)"
                                multiline
                                rows="4"
                                variant="outlined"
                                value={groupDescription}
                                onChange={event =>
                                    setGroupDescription(event.target.value)
                                }
                            />
                        </form>
                    </div>
                    <br />
                    <div className={classes.input}>
                        <Typography variant="h6">Select Group type</Typography>
                        <FormControl variant="outlined">
                            <InputLabel>Group type</InputLabel>
                            <Select
                                label="GroupType"
                                native
                                value={groupType}
                                onChange={event =>
                                    setGroupType(event.target.value)
                                }
                            >
                                <option value={HOUSEMATES}>Housemates</option>
                                <option value={WORK}>Work</option>
                                <option value={SOCIAL}>Social</option>
                                <option value={OTHER}>Other</option>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <br />
                <Button
                    variant="contained"
                    id="createGroupButton"
                    onClick={handleOnSubmit}
                >
                    Create Group
                </Button>
            </div>
        </div>
    );
}

export default CreateGroupSettings;
