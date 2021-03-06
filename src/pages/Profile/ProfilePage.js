// @flow
// @format

import React, { useCallback, useState } from "react";
import { graphqlOperation } from "aws-amplify";

import { Typography, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { getUser as getUserDetailsQuery } from "../../customGraphql/queries";

import { Connect } from "aws-amplify-react";
import LoadingPage from "../Loading/LoadingPage";

import Chip from "@material-ui/core/Chip";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";

import ProfileSettingsPage from "./ProfileSettings";
import TransacHistoryPage from "./TransacHistory";
import { updateUserProfilePicture, uploadCloudinaryImage } from "../../api/Api";

const useStyles = makeStyles(() => ({
    groupChip: {
        marginBottom: 8
    },
    headContainer: {
        margin: 20,
        backgroundColor: "#ecf0f1",
        align: "center",
        justifyContent: "center",
        padding: "20",
        display: "flex",
        flexDirection: "column",
        minWidth: 540
    },

    mainInfoContainer: {
        margin: 20,
        backgroundColor: "#ecf0f1",
        align: "center",
        justifyContent: "center",
        padding: 20
    },

    secondaryInfoContainer: {
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 60,
        backgroundColor: "white",
        align: "center",
        justifyContent: "center",
        padding: 20,
        display: "flex",
        flexDirection: "column"
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
    },

    nameContainer: {
        margin: 20,
        marginLeft: 322,
        backgroundColor: "#ecf0f1",
        align: "center",
        justifyContent: "center",
        padding: 20
    },

    settingsButton: {
        marginleft: 20,
        backgroundColor: "#ecf0f1",
        float: "right",
        "&:hover": {
            background: "#ecf0f1",
            color: "black",
            cursor: "pointer"
        },
        height: 40,
        width: 40
    },

    budgetContainers: {
        float: "left",
        justifyContent: "space-between",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flex: 1
    },
    groupNamesContainer: {
        float: "right",
        marginRight: "0"
    }
}));

type Props = {|
    userID: string
|};

function ProfilePage({ userID }: Props): React.MixedElement {
    const classes = useStyles();
    const navigateToSettings = useCallback(() => {
        setDialogOpen(true);
    });
    const navigateToTransacHistory = useCallback(() => {
        setTDialogOpen(true);
    });
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [isTDialogOpen, setTDialogOpen] = React.useState(false);

    // profile Picture
    const [selectedImage, setSelectedImage] = useState<>(null);
    const [imageURL, setImageURL] = useState<>("");

    const handleImageChange = async event => {
        setSelectedImage(event.target.files[0]);
        await uploadCloudinaryImage(event.target.files[0])
            .then(async newImageURL => {
                setImageURL(newImageURL);
                await updateUserProfilePicture(userID, newImageURL).then(
                    data => {}
                );
            })
            .catch(err => {
                console.error("an error occured while uploading receipt image");
            });
    };

    return (
        <Connect query={graphqlOperation(getUserDetailsQuery, { id: userID })}>
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error</h3>;
                }

                if (loading) {
                    return <LoadingPage />;
                }
                const userData = data?.getUser ?? null;
                const {
                    username = "",
                    email = "",
                    name = "",
                    phone = "",
                    groups = {},
                    pictureURL = ""
                } = userData ?? {};

                if (
                    imageURL === "" &&
                    pictureURL !== "" &&
                    pictureURL != null
                ) {
                    setImageURL(pictureURL);
                }

                const { items = [] } = groups;
                const groupItems = items.filter(groupItem => {
                    return groupItem != null && groupItem.group != null;
                });
                return (
                    <>
                        <div>
                            <div className={classes.headContainer}>
                                <div className={classes.mainInfoContainer}>
                                    <div className={classes.pictureContainer}>
                                        {imageURL === "" ? (
                                            <PersonIcon
                                                fontSize="large"
                                                className={classes.avatar}
                                            />
                                        ) : (
                                            <img
                                                src={imageURL}
                                                alt={name}
                                                height="180"
                                                width="180"
                                            />
                                        )}
                                        <TextField
                                            id="image"
                                            margin="dense"
                                            onChange={handleImageChange}
                                            style={{ width: 200 }}
                                            type="file"
                                            inputProps={{
                                                accept:
                                                    "image/x-png,image/gif,image/jpeg,image/jpg"
                                            }}
                                        ></TextField>
                                    </div>
                                    <div className={classes.nameContainer}>
                                        <Typography variant="h1" gutterBottom>
                                            {name}
                                            <SettingsIcon
                                                className={
                                                    classes.settingsButton
                                                }
                                                onClick={navigateToSettings}
                                            />
                                        </Typography>
                                        <Typography variant="h4" gutterBottom>
                                            {`@${username}`}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {email}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {phone}
                                        </Typography>
                                    </div>
                                </div>
                                <div className={classes.secondaryInfoContainer}>
                                    <div className={classes.budgetContainers}>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Personal Budget
                                        </Typography>
                                        <Chip label="$1,000.00" align="right" />
                                    </div>
                                    <div className={classes.budgetContainers}>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Total Spent
                                        </Typography>
                                        <Chip label="$430.30" align="right" />
                                    </div>
                                    <div className={classes.budgetContainers}>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Remaining Balance
                                        </Typography>
                                        <Chip label="$569.70" align="right" />
                                    </div>

                                    <br />
                                    <div className={classes.budgetContainers}>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Groups I'm a part of
                                        </Typography>
                                        <div
                                            className={
                                                classes.groupNamesContainer
                                            }
                                        >
                                            {groupItems.map(
                                                (groupItem, index) => {
                                                    const { group } = groupItem;
                                                    return (
                                                        <div key={index}>
                                                            <Chip
                                                                className={
                                                                    classes.groupChip
                                                                }
                                                                label={
                                                                    group.name
                                                                }
                                                                variant="outlined"
                                                                clickable
                                                                onClick={() => {
                                                                    window.location.replace(
                                                                        `/groupHomePage/${group.id}`
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={navigateToTransacHistory}
                                            variant="contained"
                                            align="left"
                                        >
                                            Veiw Transaction History
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isDialogOpen && (
                            <ProfileSettingsPage
                                isDialogOpen={isDialogOpen}
                                setDialogOpen={setDialogOpen}
                                userData={userData}
                            />
                        )}
                        {isTDialogOpen && (
                            <TransacHistoryPage
                                isTDialogOpen={isTDialogOpen}
                                setTDialogOpen={setTDialogOpen}
                                userData={userData}
                            />
                        )}
                    </>
                );
            }}
        </Connect>
    );
}

export default ProfilePage;
