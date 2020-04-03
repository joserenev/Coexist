import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Connect } from "aws-amplify-react";
import {
    getTimeDifferenceInSeconds,
    getCurrentTimeDifferenceInSeconds
} from "../util/DateUtil";
import { getUser as getUserDetailsQuery } from "../../customGraphql/queries";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserStatusConstant } from "../util/UserOnlineUtil";
import { graphqlOperation } from "aws-amplify";

const { OFFLINE, ONLINE, IDLE } = UserStatusConstant;
const OnlineBadge = withStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.8s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(1)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge);

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1)
        },
        minWidth: 200,
        maxWidth: 300
    }
}));

const IdleBadge = withStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    badge: {
        backgroundColor: "#b7b700",
        color: "#b7b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 2.8s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(1.6)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge);

const OfflineBadge = withStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    badge: {
        backgroundColor: "#b74400",
        color: "#b74400",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
    }
}))(Badge);

export default function SimpleUserProfileView({ userID }: Props) {
    const classes = useStyles();

    const getUserStatus = (heartbeat, lastPageLoad): string => {
        const userTimeDiff = getTimeDifferenceInSeconds(
            heartbeat,
            lastPageLoad
        );
        const currentTimeDiff = getCurrentTimeDifferenceInSeconds(lastPageLoad);

        // Time difference less than 2 minutes -> ONLINE
        // Time difference less than 10 minutes and greater than 2 minutes -> IDLE
        // Time difference greater than 10 minutes, offline.
        // lastPageLoad time is more than 10 minutes in the past -> OFFLINE

        if (
            isNaN(currentTimeDiff) ||
            isNaN(userTimeDiff) ||
            currentTimeDiff >= 600
        ) {
            return [OFFLINE, currentTimeDiff];
        }
        if (userTimeDiff <= 120 && currentTimeDiff <= 120) {
            return [ONLINE, currentTimeDiff];
        }
        if (userTimeDiff <= 600) {
            return [IDLE, currentTimeDiff];
        }
        return [OFFLINE, currentTimeDiff];
    };

    return (
        <Connect
            query={graphqlOperation(getUserDetailsQuery, {
                id: userID
            })}
        >
            {({ data, loading, error }) => {
                if (error) {
                    //TODO: Add a dedicated ERROR Component with a message to show.
                    return <h3>Error...</h3>;
                }
                if (loading) {
                    return (
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            className={classes.placeHolder}
                            width={160}
                            height={40}
                        />
                    );
                }

                const {
                    username = "",
                    name = "",
                    heartbeat = "",
                    lastPageLoad = "",
                    pictureURL = ""
                } = data.getUser ?? {};

                const getUserBadge = () => {
                    const userStatusArray = getUserStatus(
                        heartbeat,
                        lastPageLoad
                    );
                    const userStatus = userStatusArray[0];
                    var timeAmount = userStatusArray[1];
                    var timeString = "";
                    if (timeAmount > 86400) {
                        timeString = Math.floor(timeAmount / 86400) + " days";
                    } else if (timeAmount > 3600) {
                        timeString = Math.floor(timeAmount / 3600) + " hours";
                    } else if (timeAmount > 60) {
                        timeString = Math.floor(timeAmount / 60) + " minutes";
                    } else {
                        timeString = timeAmount + " seconds";
                    }
                    const userAvatar =
                        pictureURL == null || pictureURL === "" ? (
                            <Avatar alt={name}>{name.charAt(0)}</Avatar>
                        ) : (
                            <Avatar alt={name} src={pictureURL}></Avatar>
                        );
                    if (userStatus === ONLINE) {
                        return (
                            <OnlineBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right"
                                }}
                                title="Online"
                                variant="dot"
                            >
                                {userAvatar}
                            </OnlineBadge>
                        );
                    } else if (userStatus === IDLE) {
                        return (
                            <IdleBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right"
                                }}
                                title={"Idle for " + timeString}
                                variant="dot"
                            >
                                {userAvatar}
                            </IdleBadge>
                        );
                    } else {
                        return (
                            <OfflineBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right"
                                }}
                                title={"Offline for " + timeString}
                                variant="dot"
                            >
                                {userAvatar}
                            </OfflineBadge>
                        );
                    }
                };

                return (
                    <div>
                        <div className={classes.root}>
                            {getUserBadge()}
                            <div>
                                <Typography variant="subtitle1" color="inherit">
                                    {name}
                                </Typography>
                                <Typography variant="subtitle2" color="inherit">
                                    {username}
                                </Typography>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Connect>
    );
}
