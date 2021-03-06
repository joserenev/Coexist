// @flow

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    },
    avatar: {
        borderRadius: "5px"
    },
    member: {
        "&:hover": {
            background: "#dddddd",
            "& $groupText": {
                textShadow: "0px 1px #aaa"
            }
        },
        cursor: "pointer"
    },
    groupName: {},
    groupText: {}
}));

type Props = {|
    group: Object
|};

function MemberListItem({ group }: Props) {
    const classes = useStyles();
    const { id = "", name, username } = group;
    return (
        <ListItem
            alignItems="flex-start"
            className={classes.member}
            component={Link}
           // to={`/groupHomePage/${id}`}
        >
			<Badge badgeContent={1} color="primary" overlap="circle">
				<ListItemAvatar>
					<Avatar
						variant="rounded"
						alt="Group Avatar"
						src="/static/images/avatar/1.jpg"
					/>
				</ListItemAvatar>
			</Badge>
            <ListItemText
                className={classes.groupText}
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            className={classes.groupName}
                            color="textPrimary"
                        >
                            {name ?? "Group Name Not Specified"}
                        </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {username ?? "Group description not specified"}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}
export default MemberListItem;
