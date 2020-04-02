import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";

//images/icons
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
    getTimeDifferenceInSeconds,
    getCurrentTimeDifferenceInSeconds
} from "../util/DateUtil";

import { UserStatusConstant } from "../util/UserOnlineUtil";

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

type Props = {|
    user: Object
|};

export default function User({
    user,
    deleteGroupMember,
    isDeleteDisabled = false
}: Props) {
    const classes = useStyles();
    const {
        id = "",
        username = "",
        name = "",
        heartbeat = "",
        lastPageLoad = "",
        pictureURL = ""
    } = user ?? {};
    const handleDelete = useCallback(() => {
        deleteGroupMember(id);
    }, [deleteGroupMember, id]);

    const getUserStatus = (): string => {
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
            return OFFLINE;
        }
        if (userTimeDiff <= 120 && currentTimeDiff <= 120) {
            return ONLINE;
        }
        if (userTimeDiff <= 600) {
            return IDLE;
        }
        return OFFLINE;
    };

    const getUserBadge = () => {
        const userStatus = getUserStatus();
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
                    title="Online"
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
                    title="Online"
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
                {!isDeleteDisabled && (
                    <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={handleDelete}
                    >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                )}
                  
            </div>
        </div>
    );
}
