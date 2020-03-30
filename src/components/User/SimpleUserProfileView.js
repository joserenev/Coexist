import React from "react";

import CardHeader from "@material-ui/core/CardHeader";

import Avatar from "@material-ui/core/Avatar";

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
        />
    );
}

export default SimpleUserProfileView;
