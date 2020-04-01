import React, { useState } from "react";
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

import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';

const pubnub = new PubNub({
  publishKey: "pub-c-fcfbbd7d-d4d4-4dc2-9979-2339f3202a81",
  subscribeKey: "sub-c-7df07fca-72de-11ea-88bf-72bc4223cbd9",
  uuid: "12445"
});
var channels = []; ////change to group id
var lastId = 0;


function Notifications(): React.MixedElement {
    const [messages, addMessage] = useState([{"message":"asdsa", "sender":"person a"}]);
	  const [message, setMessage] = useState('');
	  
	  var groupJSON = window.localStorage.getItem("CoexistGroups") || "{}";
	  var groups = JSON.parse(groupJSON);
	  for (var i = 0; i < groups.length; i++)
	  {
		  channels.push(groups[i].group.id);
	  }
	  console.log(groupJSON);
	  
    return (
        <div>
		 <PubNubProvider client={pubnub}>
		  <div className="App ${classes.noMargin}">
			<header className="App-header ${classes.noMargin}">
			  <PubNubConsumer>
				{client => {
				  client.addListener({
					message: messageEvent => {
					  console.log("Notification message: " + messageEvent.message.message);
					  if (messageEvent.message.uniqueId != lastId)
					  {
						  lastId = messageEvent.message.uniqueId;
						  if (messageEvent.message.notificationClass != "Message" || window.location.href.indexOf(messageEvent.message.groupId) < 0)
						  {
							  //window.alert("Received " + messageEvent.message.notificationClass + " notification: " + messageEvent.message.message);
							  var notifJSON = window.localStorage.getItem("CoexistGroupNotifications") || "{}";
								var notifs = JSON.parse(notifJSON);
								var groupId = messageEvent.message.groupId;
							  if (notifs[groupId] == undefined) { notifs[groupId] = 0; }
							  notifs[groupId]++;
							  window.localStorage.setItem("CoexistGroupNotifications", JSON.stringify(notifs));
							  console.log(notifJSON);
							  var ele = document.getElementById(messageEvent.message.groupId + "-notif");
							  if (ele == undefined) { console.log("Could not find element notification."); }
							  else
							  {
								  ele.children[1].innerHTML = notifs[groupId];
							  }
						  }
						  else
						  {
							  console.log("Received message notification, user is on page already");
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
