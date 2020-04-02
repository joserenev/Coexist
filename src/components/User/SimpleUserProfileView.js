import React from "react";

import CardHeader from "@material-ui/core/CardHeader";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

function SimpleUserProfileView({ user }): React.MixedElement {
    const { username = "", name = "", pictureURL = "" } = user ?? {};

    return (
        <CardHeader
            avatar={
                pictureURL == null || pictureURL === "" ? (
                    <Avatar alt={name}>{name.charAt(0)}</Avatar>
                ) : (
                    <Avatar alt={name} src={pictureURL}></Avatar>
                )
            }
            title={name}
            subheader={username}
            action={
                <IconButton aria-label="delete">
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
            }
        ></CardHeader>
    );
}

export default SimpleUserProfileView;
