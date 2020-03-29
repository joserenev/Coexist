import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";

//images/icons
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

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
        minWidth: 300
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
    let userState = "OFFLINE";
    const { id = "", username = "", name = "" } = user ?? {};
    const handleDelete = useCallback(() => {
        deleteGroupMember(id);
    }, [deleteGroupMember, id]);
    return (
        <div>
            <div className={classes.root}>
                {userState === "ONLINE" && (
                    <OnlineBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        title="Online"
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src={<PersonIcon />} />
                    </OnlineBadge>
                )}
                {userState === "IDLE" && (
                    <IdleBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        title="Online"
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src={<PersonIcon />} />
                    </IdleBadge>
                )}
                {userState === "OFFLINE" && (
                    <OfflineBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        title="Online"
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src={<PersonIcon />} />
                    </OfflineBadge>
                )}
                    
                <div>
                    <Typography variant="h4" color="inherit">
                        {name}
                    </Typography>
                    <Typography variant="h6" color="inherit">
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
