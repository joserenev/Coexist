import React, { useState } from "react";
import ReactDOM from "react-dom";
import NotificationSystem from "react-notification-system";
// <img src={logo} alt="logo" className={classes.logotypeImage} />
import { Grid, CircularProgress, Typography, Button, Tabs, Tab, TextField, Fade } from "@material-ui/core";

import { withRouter } from "react-router-dom";

import PubNub from "pubnub";
import { PubNubProvider, PubNubConsumer } from "pubnub-react";

const pubnub = new PubNub({
    publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
    subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
    uuid: "12445",
});
var channels = []; ////change to group id
var lastId = 0;

function Notifications(): React.MixedElement {
    const [messages, addMessage] = useState([{ message: "asdsa", sender: "person a" }]);
    const [message, setMessage] = useState("");

    var groupJSON = window.localStorage.getItem("CoexistGroups") || "{}";
    var userDataJSON = window.localStorage.getItem("CoexistUserData") || "{}";
    var groups = JSON.parse(groupJSON);
    var userData = JSON.parse(userDataJSON);
	channels.push(userData.id);
    for (var i = 0; i < groups.length; i++) {
        channels.push(groups[i].group.id);
    }
    //console.log(groupJSON);
	
	console.log("Notifications.js loaded at: " + new Date().getTime());

    const notificationSystem = React.createRef();

    const addNotification = function (notificationData) {
        const notification = notificationSystem.current;
		if (notification == null || notification == undefined) { return; }
        notification.addNotification(notificationData);
    };

    return (
        <div>
            <NotificationSystem ref={notificationSystem} />
            <PubNubProvider client={pubnub}>
                <div className="App ${classes.noMargin}">
                    <header className="App-header ${classes.noMargin}">
                        <PubNubConsumer>
                            {(client) => {
                                client.addListener({
                                    message: (messageEvent) => {
                                        console.log("Notification message: " + messageEvent.message.message);
                                        if (messageEvent.message.uniqueId != lastId) {
                                            lastId = messageEvent.message.uniqueId;
											if (messageEvent.message.sender != userData.username) {
												var notifLevels = {
													"Message":"info",
													"Receipt":"info",
													"Receipt Update":"warning",
													"Calendar":"info",
													"Calendar Update":"warning",
													"Task":"info",
													"Task Update":"warning",
													"GroupAdd":"success",
													"GroupRemove":"error"
												}
												var notifDismiss = {
													"Message":5
												}
                                                var notifJSON = window.localStorage.getItem("CoexistGroupNotifications") || "{}";
                                                var notifs = JSON.parse(notifJSON);
                                                var groupId = messageEvent.message.groupId;
                                                if (notifs[groupId] == undefined) {
                                                    notifs[groupId] = 0;
                                                }
                                                notifs[groupId]++;
                                                window.localStorage.setItem("CoexistGroupNotifications", JSON.stringify(notifs));
                                                console.log(notifJSON);
                                                var ele = document.getElementById(messageEvent.message.groupId + "-notif");
                                                if (ele != undefined) {
                                                    ele.children[1].innerHTML = notifs[groupId];
                                                }

                                                var notif = {};
												notif["title"] = messageEvent.message.groupName;
                                                for (var i = 0; i < groups.length; i++) {
                                                    if (groups[i].group.id == groupId) {
                                                        notif["title"] = "Group: " + groups[i].group.name;
                                                    }
                                                }
												if (messageEvent.message.notificationClass == "Message")
												{
													var tempMes = messageEvent.message.message;
													var loc = tempMes.indexOf(": ") + 2;
													if (tempMes.substring(loc, loc + 5) == "link/" && tempMes.split("<>/").length == 2)
													{
														messageEvent.message.message = "Attached a link!";
													}
													else if (tempMes.substring(loc, loc + 8) == "picture/" && tempMes.split("<>/").length == 2)
													{
														messageEvent.message.message = "Attached a picture!";
													}
												}
                                                notif["message"] = messageEvent.message.message;
												notif["level"] = notifLevels[messageEvent.message.notificationClass] || "info";
                                                notif["autoDismiss"] = notifDismiss[messageEvent.message.notificationClass] || 0;
                                                notif["position"] = "br";
                                                addNotification(notif);
                                            }
											
                                        }
                                    },
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