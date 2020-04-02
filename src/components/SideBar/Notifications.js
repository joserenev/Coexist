import React, { useState } from "react";
import ReactDOM from "react-dom";
import NotificationSystem from "react-notification-system";
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445"
});
var channels = []; ////change to group id
var lastId = 0;

function Notifications(): React.MixedElement {
    const [messages, addMessage] = useState([
        { message: "asdsa", sender: "person a" }
    ]);
    const [message, setMessage] = useState("");

    var groupJSON = window.localStorage.getItem("CoexistGroups") || "{}";
    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var groups = JSON.parse(groupJSON);
    var userData = JSON.parse(userDataJSON);
    for (var i = 0; i < groups.length; i++) {
        channels.push(groups[i].group.id);
    }
    // console.log(groupJSON);

    const notificationSystem = React.createRef();

    const addNotification = function(notificationData) {
        const notification = notificationSystem.current;
        notification.addNotification(notificationData);
    };

    return (
        <div>
            <NotificationSystem ref={notificationSystem} />
            <PubNubProvider client={pubnub}>
                <div className="App ${classes.noMargin}">
                    <header className="App-header ${classes.noMargin}">
                        <PubNubConsumer>
                            {client => {
                                client.addListener({
                                    message: messageEvent => {
                                        console.log(
                                            "Notification message: " +
                                                messageEvent.message.message
                                        );
                                        if (
                                            messageEvent.message.uniqueId !=
                                            lastId
                                        ) {
                                            lastId =
                                                messageEvent.message.uniqueId;
                                            if (
                                                (messageEvent.message.sender ==
                                                    userData.username &&
                                                    messageEvent.message
                                                        .notificationClass ==
                                                        "Message") ||
                                                window.location.href.indexOf(
                                                    messageEvent.message.groupId
                                                ) > -1
                                            ) {
                                                console.log(
                                                    "Sender is not the same guy"
                                                );
                                            } else {
                                                //window.alert("Received " + messageEvent.message.notificationClass + " notification: " + messageEvent.message.message);
                                                var notifJSON =
                                                    window.localStorage.getItem(
                                                        "CoexistGroupNotifications"
                                                    ) || "{}";
                                                var notifs = JSON.parse(
                                                    notifJSON
                                                );
                                                var groupId =
                                                    messageEvent.message
                                                        .groupId;
                                                if (
                                                    notifs[groupId] == undefined
                                                ) {
                                                    notifs[groupId] = 0;
                                                }
                                                notifs[groupId]++;
                                                window.localStorage.setItem(
                                                    "CoexistGroupNotifications",
                                                    JSON.stringify(notifs)
                                                );
                                                console.log(notifJSON);
                                                var ele = document.getElementById(
                                                    messageEvent.message
                                                        .groupId + "-notif"
                                                );
                                                if (ele == undefined) {
                                                    console.log(
                                                        "Could not find element notification."
                                                    );
                                                } else {
                                                    ele.children[1].innerHTML =
                                                        notifs[groupId];
                                                }

                                                var notif = {};
                                                for (
                                                    var i = 0;
                                                    i < groups.length;
                                                    i++
                                                ) {
                                                    if (
                                                        groups[i].group.id ==
                                                        groupId
                                                    ) {
                                                        notif["title"] =
                                                            "Group: " +
                                                            groups[i].group
                                                                .name;
                                                    }
                                                }
                                                notif["message"] =
                                                    messageEvent.message
                                                        .sender +
                                                    ": " +
                                                    messageEvent.message
                                                        .message;
                                                if (
                                                    messageEvent.message
                                                        .notificationClass ==
                                                    "Receipt Update"
                                                ) {
                                                    notif["level"] = "warning";
                                                } else {
                                                    notif["level"] = "info";
                                                }
                                                if (
                                                    messageEvent.message
                                                        .notificationClass ==
                                                    "Message"
                                                ) {
                                                    notif["autoDismiss"] = 5;
                                                } else {
                                                    notif["autoDismiss"] = 0;
                                                }
                                                notif["position"] = "br";
                                                addNotification(notif);
                                            }
                                        }
                                    }
                                });

                                client.subscribe({ channels });
                            }}
                        </PubNubConsumer>
                    </header>
                </div>
            </PubNubProvider>
        </div>
    );
}

export default Notifications;
